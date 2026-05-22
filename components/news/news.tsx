"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { NewsItem } from "@/lib/firebase/queries";
import { getTranslations } from "@/lib/i18n/translations";
import { useReveal } from "@/lib/hooks/use-reveal";
import styles from "./news.module.scss";

interface NewsProps {
  newsList: NewsItem[];
  lang?: string;
}

export default function News({ newsList, lang = "en" }: NewsProps) {
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const formattedNews = newsList.map((item) => {
    const d = new Date(item.publishedAt);
    const dateStr = d.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
    return { ...item, dateStr };
  });

  return (
    <section
      id="novedades"
      className={styles.section}
      aria-labelledby="news-section-title"
      ref={sectionRef}
    >
      <div className="section-wrapper">
        <header className="section-header" data-reveal>
          <span className="section-label">{t.news.sectionLabel}</span>
          <h2 className="section-title" id="news-section-title">
            {t.news.sectionTitle} <em>{t.news.sectionTitleEm}</em>
          </h2>
        </header>

        {formattedNews.length > 0 ? (
          <div className={styles.grid}>
            {formattedNews.map((item, i) => (
              <article
                key={item.id}
                className={`surface-card ${styles.card}`}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.12}s` } as React.CSSProperties}
              >
                <div className={styles.imageWrapper}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={item.image.startsWith("http")}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} />
                  )}
                </div>
                <div className={styles.content}>
                  <header className={styles.cardHeader}>
                    <time className={styles.date} dateTime={item.publishedAt}>
                      {item.dateStr}
                    </time>
                  </header>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.text}>{item.content}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty} aria-live="polite">
            <p className={styles.emptyText}>{t.news.emptyState}</p>
          </div>
        )}
      </div>
    </section>
  );
}
