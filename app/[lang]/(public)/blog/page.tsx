import { getRecentPosts } from "@/lib/firebase/queries";
import BlogCard from "@/components/blog-highlights/blog-card/blog-card";
import { getTranslations } from "@/lib/i18n/translations";

export const revalidate = 3600;

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang);

  // Fetch up to 50 posts for the main blog page
  const posts = await getRecentPosts(lang, 50);

  // Format the dates as required by the BlogCard UI
  const formattedPosts = posts.map((p) => ({
    ...p,
    date: new Date(p.publishedAt).toLocaleDateString(
      lang === "es" ? "es-ES" : "en-US",
      { month: "short", day: "numeric", year: "numeric" }
    ),
  }));

  return (
    <main
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "120px 24px",
      }}
    >
      <header style={{ marginBottom: "64px", textAlign: "left" }}>
        <h1
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(34px, 5vw, 69px)",
            fontWeight: 350,
            letterSpacing: "-0.03em",
            color: "var(--color-midnight-ink)",
            marginBottom: "16px",
          }}
        >
          {t.blog.pageTitle}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-secondary)",
            fontSize: "14px",
            color: "var(--color-slate-comment)",
            letterSpacing: "-0.02em",
            maxWidth: "600px",
            margin: "0",
            lineHeight: 1.5,
          }}
        >
          {t.blog.pageSubtitle}
        </p>
      </header>

      {formattedPosts.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {formattedPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} lang={lang} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "64px",
            backgroundColor: "var(--color-canvas)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <span
            style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}
          >
            📭
          </span>
          <p style={{ 
            color: "var(--color-midnight-ink)", 
            fontFamily: "var(--font-secondary)",
            fontSize: "14px", 
            fontWeight: 400,
            letterSpacing: "-0.02em"
          }}>
            {t.blog.noArticles}
          </p>
        </div>
      )}
    </main>
  );
}
