// LinkedIn sharing shared by the /admin CMS (app/actions/linkedin.ts) and the blog pipeline
// (scripts/publish-post.mts). Plain TypeScript with no path aliases so Node can run it from the script.
//
// Posting to a personal profile uses the UGC API (POST /v2/ugcPosts, scope w_member_social), which is
// what LinkedIn's "Share on LinkedIn" docs still document. The author must be `urn:li:person:{id}`,
// where {id} is the `sub` returned by GET /v2/userinfo (OpenID Connect): a short alphanumeric string
// such as "782bbtaQ". The numeric member ID (e.g. 270328370) is NOT a person ID: LinkedIn rejects
// `urn:li:person:<numeric>` with a 422 ("does not match urn:li:company:\d+|urn:li:member:-?\d+").

const API_BASE = "https://api.linkedin.com";

const PERSON_URN = /^urn:li:person:([A-Za-z0-9_-]+)$/;
const ORGANIZATION_URN = /^urn:li:organization:\d+$/;

export interface LinkedInArticle {
  /** Post body shown above the link card. */
  text: string;
  /** Public URL of the article. */
  url: string;
  title: string;
  description: string;
  /** Public URL of the cover image used as the card thumbnail. */
  thumbnailUrl?: string;
}

/**
 * Returns the configured URN when LinkedIn will accept it as an author, or null when it must be
 * resolved from the token instead (missing, malformed, or a numeric member ID posing as a person ID).
 */
export function validAuthorUrn(configured: string | undefined): string | null {
  const urn = configured?.trim().replace(/^["']|["']$/g, "");
  if (!urn) return null;
  if (ORGANIZATION_URN.test(urn)) return urn;
  const person = PERSON_URN.exec(urn);
  if (person && !/^\d+$/.test(person[1])) return urn;
  return null;
}

/** Reads the member's person URN from the token (GET /v2/userinfo, needs the `openid` scope). */
export async function fetchPersonUrn(accessToken: string): Promise<string> {
  const response = await fetch(`${API_BASE}/v2/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(
      `LinkedIn userinfo returned ${response.status}: ${await response.text()}. ` +
        "Set LINKEDIN_AUTHOR_URN to urn:li:person:<sub> (the alphanumeric `sub` from /v2/userinfo, not the numeric member ID).",
    );
  }
  const { sub } = (await response.json()) as { sub?: string };
  if (!sub) throw new Error("LinkedIn userinfo response has no `sub`.");
  return `urn:li:person:${sub}`;
}

/** Uses LINKEDIN_AUTHOR_URN when it is a valid author URN, otherwise resolves it from the token. */
export async function resolveAuthorUrn(accessToken: string, configured: string | undefined): Promise<string> {
  return validAuthorUrn(configured) ?? (await fetchPersonUrn(accessToken));
}

export function buildArticleSharePayload(authorUrn: string, article: LinkedInArticle) {
  return {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: article.text },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            originalUrl: article.url,
            title: { text: article.title },
            description: { text: article.description },
            ...(article.thumbnailUrl ? { thumbnails: [{ url: article.thumbnailUrl }] } : {}),
          },
        ],
      },
    },
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
  };
}

/** Publishes the article on LinkedIn and returns the new post's URN. */
export async function shareArticleOnLinkedIn(
  accessToken: string,
  authorUrn: string,
  article: LinkedInArticle,
): Promise<string> {
  const response = await fetch(`${API_BASE}/v2/ugcPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(buildArticleSharePayload(authorUrn, article)),
  });
  if (!response.ok) {
    throw new Error(`LinkedIn API returned ${response.status}: ${await response.text()}`);
  }
  const data = (await response.json().catch(() => ({}))) as { id?: string };
  return data.id ?? response.headers.get("x-restli-id") ?? "";
}
