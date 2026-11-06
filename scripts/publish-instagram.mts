/**
 * Publishes an approved Instagram carousel for a blog post through Meta's official API
 * ("Instagram API with Instagram Login"). Setup: .claude/skills/blog-pipeline/SKILL.md, "Instagram".
 *
 * Usage:
 *   npm run instagram:publish -- whoami                            # check the token and account
 *   npm run instagram:publish -- refresh-token                     # renew the 60-day token in .env.local
 *   npm run instagram:publish -- content/blog/<slug>               # dry run
 *   npm run instagram:publish -- content/blog/<slug> --commit      # publish
 *
 * Post folder: content/blog/<slug>/instagram/ with 01.png ... (2 to 10 slides) and caption.txt.
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { v2 as cloudinary } from "cloudinary";

const GRAPH_HOST = "https://graph.instagram.com";
const GRAPH_VERSION = process.env.IG_GRAPH_VERSION ?? "v21.0";
const MAX_CAPTION = 2200;
const MAX_HASHTAGS = 5;
const POLL_EVERY_MS = 3000;
const POLL_MAX_TRIES = 40;

type GraphResponse = Record<string, string | undefined>;

// The token travels in the body or query and is never logged.
async function graph(method: "GET" | "POST", route: string, params: Record<string, string> = {}, versioned = true) {
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) throw new Error("IG_ACCESS_TOKEN is not set in .env.local");
  const url = new URL(versioned ? `${GRAPH_HOST}/${GRAPH_VERSION}/${route}` : `${GRAPH_HOST}/${route}`);
  const all = { ...params, access_token: token };
  const init: RequestInit = { method, signal: AbortSignal.timeout(30_000) };
  if (method === "GET") {
    for (const [key, value] of Object.entries(all)) url.searchParams.set(key, value);
  } else {
    init.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    init.body = new URLSearchParams(all);
  }
  const response = await fetch(url, init);
  const json = (await response.json().catch(() => null)) as
    | (GraphResponse & { error?: { message?: string; code?: number } })
    | null;
  if (!response.ok || json?.error) {
    const code = json?.error?.code ? ` (code ${json.error.code})` : "";
    throw new Error(`Graph ${route}: ${json?.error?.message ?? `HTTP ${response.status}`}${code}`);
  }
  return (json ?? {}) as GraphResponse;
}

function userId(): string {
  const id = process.env.IG_USER_ID;
  if (!id) throw new Error("IG_USER_ID is not set in .env.local. Run whoami to get it.");
  return id;
}

async function waitFinished(containerId: string) {
  for (let i = 0; i < POLL_MAX_TRIES; i++) {
    const { status_code: status, status: detail } = await graph("GET", containerId, { fields: "status_code,status" });
    if (status === "FINISHED") return;
    if (status === "ERROR" || status === "EXPIRED") {
      throw new Error(`Container ${containerId} ended in ${status}${detail ? `: ${detail}` : ""}`);
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_EVERY_MS));
  }
  throw new Error(`Container ${containerId} did not finish in time`);
}

async function loadCarousel(dir: string) {
  const folder = path.join(dir, "instagram");
  const files = (await readdir(folder)).filter((f) => /^\d+\.(png|jpe?g)$/i.test(f)).sort();
  if (files.length < 2 || files.length > 10) {
    throw new Error(`A carousel needs 2 to 10 slides; found ${files.length} in ${folder}`);
  }
  const caption = (await readFile(path.join(folder, "caption.txt"), "utf8")).trim();
  if (!caption) throw new Error("caption.txt is empty");
  if (caption.length > MAX_CAPTION) throw new Error(`Caption has ${caption.length} characters; the limit is ${MAX_CAPTION}`);
  const hashtags = caption.match(/#[\p{L}\p{N}_]+/gu) ?? [];
  if (hashtags.length > MAX_HASHTAGS) throw new Error(`Caption has ${hashtags.length} hashtags; the limit is ${MAX_HASHTAGS}`);
  return { slides: files.map((f) => path.join(folder, f)), caption };
}

// Instagram only accepts JPEG and downloads it from a public URL.
async function uploadSlide(slug: string, file: string): Promise<string> {
  const upload = await cloudinary.uploader.upload(file, {
    folder: `camilopinzon-cms/instagram/${slug}`,
    public_id: path.parse(file).name,
    format: "jpg",
    overwrite: true,
  });
  return upload.secure_url;
}

async function publishWithRetry(creationId: string): Promise<string> {
  for (let attempt = 1; ; attempt++) {
    try {
      const { id } = await graph("POST", `${userId()}/media_publish`, { creation_id: creationId });
      if (!id) throw new Error("Meta returned no media id");
      return id;
    } catch (error: unknown) {
      // 9007 ("Media ID is not available") can appear briefly after the container is FINISHED.
      if (attempt >= 4 || !(error instanceof Error) || !error.message.includes("code 9007")) throw error;
      await new Promise((resolve) => setTimeout(resolve, 10_000));
    }
  }
}

async function publish(dir: string, commit: boolean) {
  const slug = path.basename(dir);
  const { slides, caption } = await loadCarousel(dir);
  console.log(`Carousel for "${slug}": ${slides.length} slides, caption of ${caption.length} characters.`);
  slides.forEach((slide) => console.log(`  ${slide}`));
  console.log(caption.replace(/^/gm, "    | "));
  if (!commit) {
    console.log("\nDry run: nothing uploaded or published. Re-run with --commit to publish.");
    return;
  }

  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key || key === "{}") throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not set");
  const db = getFirestore(initializeApp({ credential: cert(JSON.parse(key) as Record<string, string>) }));
  const ref = db.collection("posts").doc(slug);
  const existing = await ref.get();
  if (!existing.exists) throw new Error(`Post "${slug}" is not on the blog yet. Publish it first.`);
  if (existing.data()?.instagramPostId) {
    console.log(`Instagram: already published (${existing.data()?.instagramPostId}), skipping.`);
    return;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const children: string[] = [];
  for (const slide of slides) {
    const { id } = await graph("POST", `${userId()}/media`, {
      image_url: await uploadSlide(slug, slide),
      is_carousel_item: "true",
    });
    if (!id) throw new Error("Meta returned no container id for a slide");
    children.push(id);
  }
  for (const child of children) await waitFinished(child);

  const { id: creationId } = await graph("POST", `${userId()}/media`, {
    media_type: "CAROUSEL",
    children: children.join(","),
    caption,
  });
  if (!creationId) throw new Error("Meta returned no container id for the carousel");
  await waitFinished(creationId);

  const instagramPostId = await publishWithRetry(creationId);
  await ref.update({ instagramPostId, instagramSharedAt: new Date().toISOString() });
  const { permalink } = await graph("GET", instagramPostId, { fields: "permalink" }).catch(() => ({ permalink: undefined }));
  console.log(`Instagram: published (${instagramPostId})${permalink ? ` ${permalink}` : ""}`);
}

async function whoami() {
  const me = await graph("GET", "me", { fields: "user_id,username,account_type" });
  console.log(`Account: @${me.username} (${me.account_type})`);
  console.log(`IG_USER_ID=${me.user_id}`);
}

// Meta requires the token to be over 24 hours old and not expired.
async function refreshToken() {
  const { access_token: token, expires_in: expiresIn } = await graph(
    "GET",
    "refresh_access_token",
    { grant_type: "ig_refresh_token" },
    false,
  );
  if (!token) throw new Error("Meta returned no token");
  const envPath = path.resolve(".env.local");
  const env = await readFile(envPath, "utf8");
  if (!/^IG_ACCESS_TOKEN=.*$/m.test(env)) throw new Error("IG_ACCESS_TOKEN not found in .env.local");
  await writeFile(envPath, env.replace(/^IG_ACCESS_TOKEN=.*$/m, () => `IG_ACCESS_TOKEN="${token}"`));
  console.log(`Token renewed in .env.local. Expires in ${Math.round(Number(expiresIn) / 86400)} days.`);
}

async function main() {
  const args = process.argv.slice(2);
  const target = args.find((a) => !a.startsWith("--"));
  if (!target) {
    throw new Error("Usage: scripts/publish-instagram.mts <whoami | refresh-token | post-folder> [--commit]");
  }
  if (target === "whoami") return whoami();
  if (target === "refresh-token") return refreshToken();
  return publish(path.resolve(target), args.includes("--commit"));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  // exitCode instead of exit(): exiting while Firestore handles close crashes Node on Windows.
  process.exitCode = 1;
});
