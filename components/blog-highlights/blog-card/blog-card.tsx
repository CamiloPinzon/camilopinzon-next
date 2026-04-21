import React from "react";
import "./blog-card.css";


interface CardStyle extends React.CSSProperties {
  "--accent"?: string;
}

export interface BlogPost {
  id: number;
  tag: string;
  title: string;
  date: string;
  excerpt: string;
  color: string;
  readTime: string;
  featured: boolean;
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
        className="blog-card blog-card--featured"
        style={
          {
            "--accent": post.color,
            animationDelay: `${index * 80}ms`,
          } as CardStyle
        }
      >
        <div className="blog-card__featured-bg" aria-hidden="true" />
        <div className="blog-card__featured-inner">
          <header className="blog-card__header">
            <span className="blog-card__tag">{post.tag}</span>
            <div className="blog-card__meta">
              <time className="blog-card__date" dateTime={post.date}>
                {post.date}
              </time>
              <span className="blog-card__dot" aria-hidden="true" />
              <span className="blog-card__read-time">
                {post.readTime} lectura
              </span>
            </div>
          </header>
          <h3 className="blog-card__title blog-card__title--featured">
            {post.title}
          </h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <button
            className="blog-card__cta"
            aria-label={`Leer más sobre ${post.title}`}
          >
            Leer artículo completo
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <span className="blog-card__featured-badge">⭐ Destacado</span>
      </article>
    );
  }

  return (
    <article
      className="blog-card"
      style={
        {
          "--accent": post.color,
          animationDelay: `${index * 80}ms`,
        } as CardStyle
      }
    >
      <div className="blog-card__stripe" aria-hidden="true" />
      <header className="blog-card__header">
        <span className="blog-card__tag">{post.tag}</span>
        <div className="blog-card__meta">
          <time className="blog-card__date" dateTime={post.date}>
            {post.date}
          </time>
          <span className="blog-card__dot" aria-hidden="true" />
          <span className="blog-card__read-time">{post.readTime} lectura</span>
        </div>
      </header>
      <h3 className="blog-card__title">{post.title}</h3>
      <p className="blog-card__excerpt">{post.excerpt}</p>
      <button
        className="blog-card__cta"
        aria-label={`Leer más sobre ${post.title}`}
      >
        Leer artículo completo
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 7h12M8 2l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  );
}
