"use client";

import styles from "./blog-highlights.module.scss";
import { useState } from "react";

import BlogCard from "./blog-card/blog-card";
import BlogFilterPills from "./blog-filter-pills/blog-filter-pills";
import BlogNewsletter from "./blog-newsletter/blog-newsletter";
import Button from "@/components/ui/button/button";

import { BlogPost } from "@/lib/firebase/queries";

interface BlogHighlightsProps {
  posts: BlogPost[];
}

export default function BlogHighlights({ posts }: BlogHighlightsProps) {
  const [activeTag, setActiveTag] = useState("Todos");

  // Format dates locally so it doesn't break hydration if they are ISO strings
  const formattedPosts = posts.map(p => ({
    ...p,
    date: new Date(p.publishedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }),
    // Determine if it's featured (e.g. the very first one, or add a 'featured' boolean to your DB)
    featured: p === posts[0] 
  }));

  const ALL_TAGS = [
    "Todos",
    ...Array.from(new Set(formattedPosts.map((p) => p.tag).filter(Boolean))),
  ] as string[];

  const filteredPosts =
    activeTag === "Todos"
      ? formattedPosts
      : formattedPosts.filter((p) => p.tag === activeTag);
      
  const featuredPost = formattedPosts.find((p) => p.featured);
  const gridPosts = filteredPosts.filter(
    (p) => !(p.featured && activeTag === "Todos"),
  );

  return (
    <section
      id="blogs"
      className={styles.section}
      aria-labelledby="blog-title"
    >
      <div className="section-wrapper">
        <div className={styles.headerRow}>
          <header style={{ marginBottom: 0 }}>
            <span className="section-label">Contenido &amp; Aprendizaje</span>
            <h2 className="section-title" id="blog-title">
              Últimas publicaciones <em>del blog</em>
            </h2>
          </header>

          <BlogFilterPills
            tags={ALL_TAGS}
            activeTag={activeTag}
            onTagChange={setActiveTag}
          />
        </div>

        {/* Featured — visible only when "Todos" */}
        {activeTag === "Todos" && featuredPost && (
          <div className={styles.featuredWrapper}>
            <BlogCard post={featuredPost} index={0} variant="featured" />
          </div>
        )}

        {/* Grid */}
        {gridPosts.length > 0 ? (
          <div className={styles.grid}>
            {gridPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.empty} aria-live="polite">
            <span className={styles.emptyIcon} aria-hidden="true">
              📭
            </span>
            <p className={styles.emptyText}>
              No hay artículos en esta categoría aún
            </p>
          </div>
        )}

        <div className={styles.ctaRow}>
          <Button href="/blog" variant="ghost">
            Ver todos
          </Button>
        </div>

        {/* Newsletter CTA */}
        <BlogNewsletter />
      </div>
    </section>
  );
}
