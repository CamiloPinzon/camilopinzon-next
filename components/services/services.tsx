"use client";

import { useRef } from "react";
import { getTranslations } from "@/lib/i18n/translations";
import { useReveal } from "@/lib/hooks/use-reveal";
import styles from "./services.module.scss";

export default function Services({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      id="servicios"
      className={styles.section}
      aria-label={t.services.ariaLabel}
      ref={sectionRef}
    >
      <div className="section-wrapper">
        <header className="section-header" data-reveal>
          <h2 className="section-title">
            {t.services.title} <em>{t.services.titleEm}</em>
          </h2>
        </header>

        <div className={styles.list}>
          {t.services.items.map((service, i) => (
            <article
              key={i}
              className={styles.item}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
            >
              <h3 className={styles.itemTitle}>
                <span className={styles.itemNumber}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {service.title}
              </h3>
              <p className={styles.itemDesc}>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
