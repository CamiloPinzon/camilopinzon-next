/**
 * Publishes an approved bilingual blog post (en/es) to Firestore `posts`, shares it on LinkedIn and
 * emails the newsletter subscribers.
 *
 * Usage:
 *   npm run blog:publish -- content/blog/<slug>            # dry run
 *   npm run blog:publish -- content/blog/<slug> --commit   # publish to the blog + LinkedIn + newsletter
 *
 * Post folder layout (see .claude/skills/blog-pipeline/SKILL.md):
 *   post.json          metadata + per-language title, excerpt, coverImageAlt, faqs + LinkedIn text
 *   content.en.html    article body in English (HTML)
 *   content.es.html    article body in Spanish (HTML)
 *   cover.(png|jpg|webp)         approved cover image, 1600x900 (16:9)
 *   cover-mobile.(png|jpg|webp)  approved mobile cover image, 1080x1350 (4:5)
 *
 * Flags:
 *   --commit           upload the cover, write the Firestore document, share on LinkedIn, send the newsletter
 *   --overwrite        allow replacing an existing post with the same slug (never emails subscribers)
 *   --skip-linkedin    do not share on LinkedIn
 *   --skip-newsletter  do not email subscribers
 *   --linkedin-only    retry the LinkedIn share for a post already on the blog
 *   --newsletter-only  retry the newsletter for a post already on the blog
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, type DocumentReference, type Firestore } from "firebase-admin/firestore";
import { v2 as cloudinary } from "cloudinary";
import { Resend } from "resend";
import { renderNewPostHtml } from "../lib/emails/templates.ts";
import { getTranslations } from "../lib/i18n/translations.ts";
import { resolveAuthorUrn, shareArticleOnLinkedIn, validAuthorUrn } from "../lib/linkedin.ts";

const LANGS = ["en", "es"] as const;
const SITE_URL = "https://camilopinzon.dev";
// Sends go one at a time; the pause keeps a large list under Resend's rate limit.
const NEWSLETTER_SEND_DELAY_MS = 600;

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

function linkedinAccessToken(): string {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!accessToken) throw new Error("LINKEDIN_ACCESS_TOKEN is not set");
  return accessToken;
}

// Same ugcPosts share the CMS sends from app/actions/linkedin.ts (both use lib/linkedin.ts).
async function shareOnLinkedIn(meta: PostMeta, coverImage: string): Promise<string> {
  const accessToken = linkedinAccessToken();
  const authorUrn = await resolveAuthorUrn(accessToken, process.env.LINKEDIN_AUTHOR_URN);
  const localized = meta.translations[meta.linkedin.lang];
  return shareArticleOnLinkedIn(accessToken, authorUrn, {
    text: linkedinText(meta),
    url: postUrl(meta),
    title: localized.title,
    description: localized.excerpt,
    thumbnailUrl: coverImage,
  });
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

type Lang = (typeof LANGS)[number];

function newsletterSubject(meta: PostMeta, lang: Lang): string {
  return getTranslations(lang).emails.newPostSubject.replace("{title}", meta.translations[lang].title);
}

async function getActiveSubscribers(db: Firestore): Promise<{ email: string; lang: Lang }[]> {
  const snapshot = await db.collection("subscribers").where("status", "==", "active").get();
  return snapshot.docs.flatMap((doc) => {
    const { email, lang } = doc.data() as { email?: string; lang?: string };
    if (!email) return [];
    return [{ email, lang: lang === "en" ? ("en" as const) : ("es" as const) }];
  });
}

// Same email the CMS sends from app/actions/newsletter.ts, in each subscriber's language.
async function sendNewsletter(db: Firestore, ref: DocumentReference, meta: PostMeta) {
  if ((await ref.get()).data()?.newsletterSentAt) {
    console.log("Newsletter: already sent, skipping.");
    return;
  }
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_SENDER_EMAIL;
  if (!apiKey || !sender) throw new Error("RESEND_API_KEY or RESEND_SENDER_EMAIL is not set");

  const resend = new Resend(apiKey);
  const subscribers = await getActiveSubscribers(db);
  const failed: string[] = [];

  for (const [index, { email, lang }] of subscribers.entries()) {
    if (index > 0) await new Promise((resolve) => setTimeout(resolve, NEWSLETTER_SEND_DELAY_MS));
    const t = getTranslations(lang).emails;
    const { error } = await resend.emails.send(
      {
        from: `Camilo Pinzón <${sender}>`,
        to: email,
        subject: newsletterSubject(meta, lang),
        html: renderNewPostHtml({
          greeting: t.newPostGreeting,
          message: t.newPostMessage.replace("{title}", meta.translations[lang].title),
          ctaText: t.newPostCta,
          postUrl: `${SITE_URL}/${lang}/blog/${meta.slug}`,
          signOff: t.newsletterSignOff,
          unsubscribeText: t.unsubscribe,
          unsubscribeUrl: `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`,
        }),
      },
      // A retry within 24 hours does not email anyone who already got this post.
      { idempotencyKey: `new-post/${meta.slug}/${email}` },
    );
    if (error) {
      failed.push(email);
      console.error(`Newsletter: failed for ${email}: ${error.message}`);
    }
  }

  const sent = subscribers.length - failed.length;
  if (failed.length > 0) {
    throw new Error(`Newsletter: sent ${sent}, failed ${failed.length}. Retry with --commit --newsletter-only.`);
  }
  await ref.update({ newsletterSentAt: new Date().toISOString(), newsletterSentCount: sent });
  console.log(`Newsletter: sent to ${sent} subscribers.`);
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
  const skipNewsletter = args.includes("--skip-newsletter");
  const newsletterOnly = args.includes("--newsletter-only");
  if (!dir) {
    throw new Error(
      "Usage: scripts/publish-post.mts <post-folder> [--commit] [--overwrite] [--skip-linkedin] [--skip-newsletter] [--linkedin-only | --newsletter-only]",
    );
  }

  const { meta, content, coverPath, mobileCoverPath } = await loadPost(path.resolve(dir));
  console.log(`Post "${meta.slug}" is valid.`);
  for (const lang of LANGS) {
    console.log(`  [${lang}] ${meta.translations[lang].title}`);
    console.log(`       alt: ${meta.translations[lang].coverImageAlt}`);
  }
  console.log(`  cover: ${coverPath}`);
  console.log(`  mobile cover: ${mobileCoverPath}`);
  console.log(skipLinkedIn ? "  LinkedIn: skipped" : `  LinkedIn post:\n${linkedinText(meta).replace(/^/gm, "    | ")}`);
  if (!skipLinkedIn && !newsletterOnly) {
    // Read-only check (GET /v2/userinfo at most) so a bad author URN shows up before --commit.
    const configured = process.env.LINKEDIN_AUTHOR_URN;
    try {
      const authorUrn = await resolveAuthorUrn(linkedinAccessToken(), configured);
      const note = validAuthorUrn(configured) ? "from LINKEDIN_AUTHOR_URN" : "resolved from the token via /v2/userinfo";
      console.log(`  LinkedIn author: ${authorUrn} (${note})`);
    } catch (error: unknown) {
      console.warn(`  LinkedIn author: NOT VALID, the share will fail. ${error instanceof Error ? error.message : error}`);
    }
  }

  const db = getFirestore(initializeApp({ credential: cert(getServiceAccount()) }));

  if (skipNewsletter) {
    console.log("  Newsletter: skipped");
  } else {
    const subscribers = await getActiveSubscribers(db);
    console.log(`  Newsletter: ${subscribers.length} active subscribers`);
    for (const lang of LANGS) {
      const count = subscribers.filter((s) => s.lang === lang).length;
      console.log(`    [${lang}] ${count}: ${newsletterSubject(meta, lang)}`);
    }
  }

  if (!commit) {
    console.log("\nDry run: nothing uploaded or written. Re-run with --commit to publish.");
    return;
  }

  const ref = db.collection("posts").doc(meta.slug);

  if (linkedinOnly || newsletterOnly) {
    const coverImage = (await ref.get()).data()?.coverImage as string | undefined;
    if (!coverImage) throw new Error(`Post "${meta.slug}" is not on the blog yet. Publish it first.`);
    if (linkedinOnly) await shareAndRecord(ref, meta, coverImage);
    if (newsletterOnly) await sendNewsletter(db, ref, meta);
    return;
  }

  const existing = await ref.get();
  if (existing.exists && !overwrite) {
    throw new Error(`A post with slug "${meta.slug}" already exists. Use --overwrite to replace it.`);
  }
  // Keep the markers on overwrite so the post is never shared or emailed twice.
  const { linkedinPostId, linkedinSharedAt, newsletterSentAt, newsletterSentCount } = existing.data() ?? {};
  const sendMarkers = {
    ...(linkedinPostId ? { linkedinPostId, linkedinSharedAt } : {}),
    ...(newsletterSentAt ? { newsletterSentAt, newsletterSentCount } : {}),
  };

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
    ...sendMarkers,
  });
  console.log(`\nPublished: ${SITE_URL}/en/blog/${meta.slug} and ${SITE_URL}/es/blog/${meta.slug}`);
  console.log(`Cover: ${upload.secure_url}`);
  console.log(`Mobile cover: ${mobileUpload.secure_url}`);

  // One channel failing must not stop the other: the post is already live.
  const failures: unknown[] = [];
  if (!skipLinkedIn) {
    try {
      await shareAndRecord(ref, meta, upload.secure_url);
    } catch (error: unknown) {
      console.error(`LinkedIn: failed. The blog post is live; retry with --commit --linkedin-only.`);
      failures.push(error);
    }
  }
  if (existing.exists) {
    console.log("Newsletter: skipped, this overwrites an existing post.");
  } else if (!skipNewsletter) {
    try {
      await sendNewsletter(db, ref, meta);
    } catch (error: unknown) {
      console.error(`Newsletter: failed. The blog post is live; retry with --commit --newsletter-only.`);
      failures.push(error);
    }
  }
  if (failures.length > 0) throw failures[0];
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  // exitCode instead of exit(): exiting while Firestore handles close crashes Node on Windows.
  process.exitCode = 1;
});
