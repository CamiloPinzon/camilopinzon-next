'use server';

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
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const authorUrn = process.env.LINKEDIN_AUTHOR_URN; // e.g., urn:li:person:123456789

    if (!accessToken || !authorUrn) {
      console.warn("LinkedIn API credentials are missing. Skipping LinkedIn post.");
      return { success: false, error: "Missing LinkedIn credentials" };
    }

    // Prioridad a la versión en Español ('es') para la automatización
    const title = post.translations?.es?.title || post.title || 'Nuevo artículo en el blog';
    const excerpt = post.translations?.es?.excerpt || post.excerpt || '';
    const slug = post.slug || post.id; // Fallback to id if slug is missing
    const coverImage = post.image || post.coverImage;

    const postUrl = `https://www.camilopinzon.dev/es/blog/${slug}`;

    const textContent = `He publicado un nuevo artículo: ${title}\n\n${excerpt}\n\nLee el artículo completo aquí: ${postUrl}`;

    // Standard LinkedIn API v2/ugcPosts payload
    const payload = {
      author: authorUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: textContent
          },
          shareMediaCategory: coverImage ? "ARTICLE" : "NONE",
          media: coverImage ? [
            {
              status: "READY",
              description: {
                text: excerpt || title
              },
              originalUrl: postUrl,
              thumbnails: [
                {
                  url: coverImage
                }
              ],
              title: {
                text: title
              }
            }
          ] : []
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    };

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LinkedIn API error:", response.status, errorText);
      return { success: false, error: `LinkedIn API returned ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    console.log("Successfully posted to LinkedIn:", data.id);
    return { success: true, data };
  } catch (error: unknown) {
    console.error("Error publishing to LinkedIn:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
