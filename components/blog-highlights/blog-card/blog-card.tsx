import React from "react";
import styles from "./blog-card.module.scss";

interface CardStyle extends React.CSSProperties {
  "--accent"?: string;
}

import Link from "next/link";
import { BlogPost as QueryBlogPost } from "@/lib/firebase/queries";

// We extend the backend BlogPost to include the formatted fields for UI
export interface BlogPost extends Omit<QueryBlogPost, 'id'> {
  id: string | number; // Support legacy numbers or new strings
  date: string; // Formatted date string
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
  variant?: "default" | "featured";
}

export default function BlogCard({
  post,
  index,
  variant = "default",
}: BlogCardProps) {
  if (variant === "featured") {
    return (
      <article
        className={styles.cardFeatured}
        style={
          {
            "--accent": post.color,
            animationDelay: `${index * 80}ms`,
          } as CardStyle
        }
      >
        <div className={styles.featuredBg} aria-hidden="true" />
        <div className={styles.featuredInner}>
          <header className={styles.header}>
            <span className={`badge badge--accent ${styles.tag}`}>{post.tag}</span>
            <div className={styles.meta}>
              <time className={styles.date} dateTime={post.date}>
                {post.date}
              </time>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.readTime}>
                {post.readTime} lectura
              </span>
            </div>
          </header>
          <h3 className={styles.titleFeatured}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className={styles.cta} aria-label={`Leer más sobre ${post.title}`}>
            Leer artículo completo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <span className={styles.featuredBadge}>⭐ Destacado</span>
      </article>
    );
  }

  return (
    <article
      className={`surface-card ${styles.card}`}
      style={
        {
          "--accent": post.color,
          animationDelay: `${index * 80}ms`,
        } as CardStyle
      }
    >
      <div className={styles.stripe} aria-hidden="true" />
      <header className={styles.header}>
        <span className={`badge badge--accent ${styles.tag}`}>{post.tag}</span>
        <div className={styles.meta}>
          <time className={styles.date} dateTime={post.date}>
            {post.date}
          </time>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.readTime}>{post.readTime} lectura</span>
        </div>
      </header>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className={styles.cta} aria-label={`Leer más sobre ${post.title}`}>
        Leer artículo completo
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </article>
  );
}
