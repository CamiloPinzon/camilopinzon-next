/**
 * Publishes an approved bilingual blog post (en/es) to Firestore `posts`, then shares it on LinkedIn.
 *
 * Usage:
 *   npm run blog:publish -- content/blog/<slug>            # dry run
 *   npm run blog:publish -- content/blog/<slug> --commit   # publish to the blog + LinkedIn
 *
 * Post folder layout (see .claude/skills/blog-pipeline/SKILL.md):
 *   post.json          metadata + per-language title, excerpt, coverImageAlt, faqs + LinkedIn text
 *   content.en.html    article body in English (HTML)
 *   content.es.html    article body in Spanish (HTML)
 *   cover.(png|jpg|webp)         approved cover image, 1600x900 (16:9)
 *   cover-mobile.(png|jpg|webp)  approved mobile cover image, 1080x1350 (4:5)
 *
 * Flags:
 *   --commit         upload the cover, write the Firestore document and share on LinkedIn
 *   --overwrite      allow replacing an existing post with the same slug
 *   --skip-linkedin  publish to the blog only
 *   --linkedin-only  retry the LinkedIn share for a post already on the blog
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, type DocumentReference } from "firebase-admin/firestore";
import { v2 as cloudinary } from "cloudinary";

const LANGS = ["en", "es"] as const;
const SITE_URL = "https://camilopinzon.dev";

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const localizedSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1).max(300),
  coverImageAlt: z.string().min(1).max(160),
  faqs: z.array(faqSchema).default([]),
});

const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  tag: z.string().min(1),
  readTime: z.string().min(1),
  publishedAt: z.iso.date(),
  source: z.object({ name: z.string().min(1), url: z.url() }),
  linkedin: z.object({
    lang: z.enum(LANGS).default("es"),
    text: z.string().min(1).max(2800),
  }),
  translations: z.object({ en: localizedSchema, es: localizedSchema }),
});

type PostMeta = z.infer<typeof postSchema>;

async function findCover(dir: string, name: "cover" | "cover-mobile"): Promise<string> {
  const files = await readdir(dir);
  const cover = files.find((f) => new RegExp(`^${name}\\.(png|jpe?g|webp)$`, "i").test(f));
  if (!cover) throw new Error(`No ${name}.(png|jpg|webp) found in ${dir}`);
  return path.join(dir, cover);
}

async function loadPost(dir: string) {
  const raw = JSON.parse(await readFile(path.join(dir, "post.json"), "utf8")) as unknown;
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`post.json is invalid:\n${details}`);
  }

  const content: Record<string, string> = {};
  for (const lang of LANGS) {
    const html = (await readFile(path.join(dir, `content.${lang}.html`), "utf8")).trim();
    if (!html) throw new Error(`content.${lang}.html is empty`);
    if (!html.includes(parsed.data.source.url)) {
      throw new Error(`content.${lang}.html must link to the source (${parsed.data.source.url})`);
    }
    content[lang] = html;
  }

  return {
    meta: parsed.data,
    content,
    coverPath: await findCover(dir, "cover"),
    mobileCoverPath: await findCover(dir, "cover-mobile"),
  };
}

function buildDocument(
  meta: PostMeta,
  content: Record<string, string>,
  coverImage: string,
  coverImageMobile: string,
) {
  const translations: Record<string, Record<string, unknown>> = {};
  for (const lang of LANGS) {
    translations[lang] = { ...meta.translations[lang], content: content[lang] };
  }
  return {
    slug: meta.slug,
    coverImage,
    coverImageMobile,
    tag: meta.tag,
    readTime: meta.readTime,
    publishedAt: new Date(`${meta.publishedAt}T12:00:00Z`).toISOString(),
    isPublished: true,
    author: { name: "Camilo Pinzón" },
    source: meta.source,
    translations,
  };
}

function postUrl(meta: PostMeta): string {
  return `${SITE_URL}/${meta.linkedin.lang}/blog/${meta.slug}`;
}

function linkedinText(meta: PostMeta): string {
  return `${meta.linkedin.text}\n\n${postUrl(meta)}`;
}

// Same ugcPosts payload the CMS sends from app/actions/linkedin.ts.
async function shareOnLinkedIn(meta: PostMeta, coverImage: string): Promise<string> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const authorUrn = process.env.LINKEDIN_AUTHOR_URN;
  if (!accessToken || !authorUrn) throw new Error("LINKEDIN_ACCESS_TOKEN or LINKEDIN_AUTHOR_URN is not set");

  const localized = meta.translations[meta.linkedin.lang];
  const payload = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: linkedinText(meta) },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            description: { text: localized.excerpt },
            originalUrl: postUrl(meta),
            thumbnails: [{ url: coverImage }],
            title: { text: localized.title },
          },
        ],
      },
    },
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
  };

  const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`LinkedIn API returned ${response.status}: ${await response.text()}`);
  }
  const data = (await response.json()) as { id?: string };
  return data.id ?? "";
}

async function shareAndRecord(ref: DocumentReference, meta: PostMeta, coverImage: string) {
  const existing = (await ref.get()).data();
  if (existing?.linkedinPostId) {
    console.log(`LinkedIn: already shared (${existing.linkedinPostId}), skipping.`);
    return;
  }
  const linkedinPostId = await shareOnLinkedIn(meta, coverImage);
  await ref.update({ linkedinPostId, linkedinSharedAt: new Date().toISOString() });
  console.log(`LinkedIn: shared (${linkedinPostId}).`);
}

function getServiceAccount(): Record<string, string> {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key || key === "{}") throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not set");
  return JSON.parse(key) as Record<string, string>;
}

async function main() {
  const args = process.argv.slice(2);
  const dir = args.find((a) => !a.startsWith("--"));
  const commit = args.includes("--commit");
  const overwrite = args.includes("--overwrite");
  const skipLinkedIn = args.includes("--skip-linkedin");
  const linkedinOnly = args.includes("--linkedin-only");
  if (!dir) throw new Error("Usage: scripts/publish-post.mts <post-folder> [--commit] [--overwrite] [--skip-linkedin | --linkedin-only]");

  const { meta, content, coverPath, mobileCoverPath } = await loadPost(path.resolve(dir));
  console.log(`Post "${meta.slug}" is valid.`);
  for (const lang of LANGS) {
    console.log(`  [${lang}] ${meta.translations[lang].title}`);
    console.log(`       alt: ${meta.translations[lang].coverImageAlt}`);
  }
  console.log(`  cover: ${coverPath}`);
  console.log(`  mobile cover: ${mobileCoverPath}`);
  console.log(skipLinkedIn ? "  LinkedIn: skipped" : `  LinkedIn post:\n${linkedinText(meta).replace(/^/gm, "    | ")}`);

  if (!commit) {
    console.log("\nDry run: nothing uploaded or written. Re-run with --commit to publish.");
    return;
  }

  const db = getFirestore(initializeApp({ credential: cert(getServiceAccount()) }));
  const ref = db.collection("posts").doc(meta.slug);

  if (linkedinOnly) {
    const coverImage = (await ref.get()).data()?.coverImage as string | undefined;
    if (!coverImage) throw new Error(`Post "${meta.slug}" is not on the blog yet. Publish it first.`);
    await shareAndRecord(ref, meta, coverImage);
    return;
  }

  const existing = await ref.get();
  if (existing.exists && !overwrite) {
    throw new Error(`A post with slug "${meta.slug}" already exists. Use --overwrite to replace it.`);
  }
  // Keep the LinkedIn markers on overwrite so the post is never shared twice.
  const { linkedinPostId, linkedinSharedAt } = existing.data() ?? {};
  const linkedinMarkers = linkedinPostId ? { linkedinPostId, linkedinSharedAt } : {};

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const upload = await cloudinary.uploader.upload(coverPath, {
    folder: "camilopinzon-cms",
    public_id: meta.slug,
    overwrite,
  });
  const mobileUpload = await cloudinary.uploader.upload(mobileCoverPath, {
    folder: "camilopinzon-cms",
    public_id: `${meta.slug}-mobile`,
    overwrite,
  });

  await ref.set({
    ...buildDocument(meta, content, upload.secure_url, mobileUpload.secure_url),
    ...linkedinMarkers,
  });
  console.log(`\nPublished: ${SITE_URL}/en/blog/${meta.slug} and ${SITE_URL}/es/blog/${meta.slug}`);
  console.log(`Cover: ${upload.secure_url}`);
  console.log(`Mobile cover: ${mobileUpload.secure_url}`);

  if (skipLinkedIn) return;
  try {
    await shareAndRecord(ref, meta, upload.secure_url);
  } catch (error: unknown) {
    console.error(`LinkedIn: failed. The blog post is live; retry with --commit --linkedin-only.`);
    throw error;
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  // exitCode instead of exit(): exiting while Firestore handles close crashes Node on Windows.
  process.exitCode = 1;
});
