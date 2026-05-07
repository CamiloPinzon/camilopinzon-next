"use client";

import { useRef } from "react";

import { usePathname } from "next/navigation";
import { getTranslations } from "@/lib/i18n/translations";
import Image from "next/image";
import SocialLinks from "@/components/social-links/social-links";

import styles from "./main-hero.module.scss";

export default function MainHero() {
  const heroRef = useRef(null);

  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "en";
  const t = getTranslations(lang);
  console.log("lng: " + lang);
  return (
    <section
      id="inicio"
      className={styles.hero}
      ref={heroRef}
      aria-label={t.hero.profileLabel}
    >
      <aside
        className={`glass-panel ${styles.profileCard}`}
        aria-label={t.hero.profileLabel}
      >
        <div className={styles.avatarRing}>
          <div
            className={styles.avatarPlaceholder}
            role="img"
            aria-label="Foto de Camilo Pinzón"
          >
            <Image src="/profile.webp" alt="Avatar" width={120} height={120} />
          </div>
        </div>
        <h1 className={styles.name}>Camilo Pinzón</h1>
        <p className={styles.role}>Web Developer</p>
        <div className={styles.socialsWrapper}>
          <SocialLinks />
        </div>
        <div className={styles.divider} />
        <p className={styles.sectionLabel}>{t.hero.aboutLabel}</p>
        <p className={styles.bio}>{t.hero.bio}</p>
        <div className={styles.divider} />
        <p className={styles.sectionLabel}>{t.hero.contactLabel}</p>
        <ul className={styles.contactList}>
          <li>
            ✉{" "}
            <a href="mailto:camilopinzondeveloper@gmail.com">
              {t.hero.emailLink}
            </a>
          </li>
          <li>
            📞 <a href="tel:+573176844185">57 317 684 4185</a>
          </li>
        </ul>
        <button className={styles.contactCta}>{t.hero.contactBtn}</button>
      </aside>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
        <h2 className={styles.headline}>
          {t.hero.headline1}
          <br />
          <em className="text-gradient">{t.hero.headlineEm}</em>
          <br />
          {t.hero.headline2}
        </h2>
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
        <div className={styles.stats} aria-label={t.hero.profileLabel}>
          <div>
            <span className={styles.statValue}>5+</span>
            <span className={styles.statLabel}>{t.hero.statYears}</span>
          </div>
          <div>
            <span className={styles.statValue}>30+</span>
            <span className={styles.statLabel}>{t.hero.statProjects}</span>
          </div>
          <div>
            <span className={styles.statValue}>11</span>
            <span className={styles.statLabel}>{t.hero.statTechs}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
