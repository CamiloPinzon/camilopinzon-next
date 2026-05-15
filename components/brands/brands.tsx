import { BRANDS } from "@/lib/constants";
import { getTranslations } from "@/lib/i18n/translations";

import styles from "./brands.module.scss";

export default function Brands({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  // Duplicamos el array para lograr el efecto infinito sin cortes
  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className={styles.section} aria-labelledby="brands-title">
      <div className="section-wrapper">
        <header className={`section-header ${styles.sectionHeader}`}>
          <h2 className="section-title" id="brands-title">
            {t.brands.title}
          </h2>
          <p className={styles.subtext}>{t.brands.subtitle}</p>
        </header>
      </div>

      {/* Marquee Container (Full Width) */}
      <div className={styles.marqueeContainer} aria-label={t.brands.ariaLabel}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((brand, i) => (
            <a
              key={i}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brandLogo}
              title={brand.name}
            >
              <span className={styles.logoText}>{brand.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
