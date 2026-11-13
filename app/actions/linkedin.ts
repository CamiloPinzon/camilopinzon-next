'use server';

import { verifyAdminSession } from "@/lib/firebase/admin";
import { resolveAuthorUrn, shareArticleOnLinkedIn } from "@/lib/linkedin";

export interface BlogPostPayload {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  image?: string;
  coverImage?: string;
  translations?: {
    es?: {
      title?: string;
      excerpt?: string;
      content?: string;
    };
    [key: string]: Record<string, unknown> | undefined; // Allow other language translations loosely
  };
  [key: string]: unknown;
}

export async function publishToLinkedInAction(post: BlogPostPayload) {
  try {
    await verifyAdminSession();
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

    if (!accessToken) {
      console.warn("LinkedIn API credentials are missing. Skipping LinkedIn post.");
      return { success: false, error: "Missing LinkedIn credentials" };
    }

    // LINKEDIN_AUTHOR_URN is optional: urn:li:person:<userinfo sub>. When it is missing or holds the
    // numeric member ID, the author is resolved from the token (see lib/linkedin.ts).
    const authorUrn = await resolveAuthorUrn(accessToken, process.env.LINKEDIN_AUTHOR_URN);

    // Prioridad a la versión en Español ('es') para la automatización
    const title = post.translations?.es?.title || post.title || 'Nuevo artículo en el blog';
    const excerpt = post.translations?.es?.excerpt || post.excerpt || '';
    const slug = post.slug || post.id; // Fallback to id if slug is missing
    const coverImage = post.image || post.coverImage;

    const postUrl = `https://www.camilopinzon.dev/es/blog/${slug}`;

    const textContent = `He publicado un nuevo artículo: ${title}\n\n${excerpt}\n\nLee el artículo completo aquí: ${postUrl}`;

    const id = await shareArticleOnLinkedIn(accessToken, authorUrn, {
      text: textContent,
      url: postUrl,
      title,
      description: excerpt || title,
      thumbnailUrl: coverImage,
    });

    console.log("Successfully posted to LinkedIn:", id);
    return { success: true, data: { id } };
  } catch (error: unknown) {
    console.error("Error publishing to LinkedIn:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
