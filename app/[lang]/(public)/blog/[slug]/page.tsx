import { getPostBySlug } from "@/lib/firebase/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n/translations";
import styles from "./blog-post.module.scss"; // Optional, or use global utilities
import { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug, lang);
  if (!post) {
    return { title: "Post no encontrado" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://camilopinzon.dev/${lang}/blog/${slug}`,
      languages: {
        en: `https://camilopinzon.dev/en/blog/${slug}`,
        es: `https://camilopinzon.dev/es/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.camilopinzon.com/${lang}/blog/${slug}`,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [],
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "Camilo Pinzón"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  // Await the params object according to Next.js 15+ best practices
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug, lang);

  if (!post) {
    notFound();
  }

  const t = getTranslations(lang);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === "es" ? "es-ES" : "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <article
      className="section-wrapper"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Link
        href={`/${lang}/blog`}
        style={{
          color: "var(--color-slate-comment)",
          fontFamily: "var(--font-secondary)",
          textDecoration: "none",
          fontSize: "14px",
          letterSpacing: "-0.02em",
          marginBottom: "32px",
          display: "inline-block",
        }}
      >
        {t.blogPost.backLink}
      </Link>

      <header style={{ marginBottom: "50px" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              backgroundColor: "rgba(0, 113, 227, 0.1)",
              color: "var(--color-future-blue)",
              padding: "4px 10px",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-secondary)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            {post.tag}
          </span>
          <span style={{ color: "var(--color-slate-comment)", fontFamily: "var(--font-secondary)", fontSize: "12px" }}>
            {post.readTime}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(34px, 5vw, 64px)",
            fontWeight: 350,
            color: "var(--color-midnight-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "32px",
          }}
        >
          {post.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "var(--color-ghost-white)",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-primary)",
              fontSize: "16px",
              color: "var(--color-midnight-ink)",
            }}
          >
            {post.author?.name?.charAt(0) || "C"}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-secondary)",
                fontWeight: 500,
                color: "var(--color-midnight-ink)",
                fontSize: "14px",
                letterSpacing: "-0.02em",
              }}
            >
              {post.author?.name || "Camilo Pinzón"}
            </div>
            <div style={{ color: "var(--color-slate-comment)", fontFamily: "var(--font-secondary)", fontSize: "12px" }}>
              {formattedDate}
            </div>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "450px",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            marginBottom: "60px",
            border: "1px solid var(--color-border)",
          }}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      {/* Render the raw HTML from the legacy 'blogs' collection safely */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
