"use client";

import { useRef } from "react";
import { getTranslations } from "@/lib/i18n/translations";
import styles from "./main-hero.module.scss";

export default function MainHero({ lang }: { lang: string }) {
  const heroRef = useRef(null);
  const t = getTranslations(lang);
  return (
    <section
      id="inicio"
      className={styles.hero}
      ref={heroRef}
      aria-label={t.hero.profileLabel}
    >
      <div className={styles.manifesto}>
        <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
        <h1 className={styles.headline}>
          {t.hero.headline1}{" "}
          <em className="text-gradient">{t.hero.headlineEm}</em>{" "}
          {t.hero.headline2}
        </h1>
        <p className={styles.subtext}>{t.hero.subtext}</p>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => {
              document
                .getElementById("portafolio")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {t.hero.btnProjects}
          </button>
          <a
            href={`/${lang}-cv-camilo-pinzon.pdf`}
            download={`Camilo-Pinzon-CV-${lang.toUpperCase()}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            {t.hero.btnCv}
          </a>
        </div>

        <div className={styles.divider} />

        <ul className={styles.manifestoList}>
          <li>
            <span>{t.hero.statYears}</span>
            <strong>10+</strong>
          </li>
          <li>
            <span>{t.hero.statProjects}</span>
            <strong>100+</strong>
          </li>
          <li>
            <span>{t.hero.statTechs}</span>
            <strong>11</strong>
          </li>
        </ul>
      </div>
    </section>
  );
}
