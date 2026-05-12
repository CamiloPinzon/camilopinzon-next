"use client";

import { useRef } from "react";
import { getTranslations } from "@/lib/i18n/translations";
import Image from "next/image";
import SocialLinks from "@/components/social-links/social-links";

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
          {t.hero.headline1} <em className="text-gradient">{t.hero.headlineEm}</em> {t.hero.headline2}
        </h1>
        <p className={styles.subtext}>{t.hero.subtext}</p>
        
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>{t.hero.btnProjects}</button>
          <a
            href={`/${lang}-cv-camilo-pinzon.pdf`}
            download={`Camilo-Pinzon-CV-${lang.toUpperCase()}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.btnGhost}>{t.hero.btnCv}</button>
          </a>
        </div>

        <div className={styles.divider} />

        <ul className={styles.manifestoList}>
          <li>
            <span>{t.hero.statYears}</span>
            <strong>14+</strong>
          </li>
          <li>
            <span>{t.hero.statProjects}</span>
            <strong>200+</strong>
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
