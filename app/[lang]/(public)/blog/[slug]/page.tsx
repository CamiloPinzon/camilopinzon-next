import { getPostBySlug } from "@/lib/firebase/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
      canonical: `https://camilopinzon.netlify.app/${lang}/blog/${slug}`,
      languages: {
        en: `https://camilopinzon.netlify.app/en/blog/${slug}`,
        es: `https://camilopinzon.netlify.app/es/blog/${slug}`,
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

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className="section-wrapper"
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#a3aed1",
          textDecoration: "none",
          fontSize: "0.875rem",
          marginBottom: "24px",
          display: "inline-block",
        }}
      >
        ← Volver al Inicio
      </Link>

      <header style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              backgroundColor: post.color || "#4318ff",
              color: "white",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {post.tag}
          </span>
          <span style={{ color: "#a3aed1", fontSize: "0.875rem" }}>
            {post.readTime}
          </span>
        </div>

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            color: "#2b3674",
            lineHeight: 1.2,
            marginBottom: "24px",
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
              backgroundColor: "#e0e5f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#4318ff",
            }}
          >
            {post.author?.name?.charAt(0) || "C"}
          </div>
          <div>
            <div
              style={{
                fontWeight: 600,
                color: "#2b3674",
                fontSize: "0.875rem",
              }}
            >
              {post.author?.name || "Camilo Pinzon"}
            </div>
            <div style={{ color: "#a3aed1", fontSize: "0.75rem" }}>
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
            height: "400px",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "40px",
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
        style={{ fontSize: "1.125rem", lineHeight: 1.8, color: "#4a5568" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
