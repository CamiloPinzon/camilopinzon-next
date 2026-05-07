import { BRANDS } from "@/lib/constants";
import { getTranslations } from "@/lib/i18n/translations";

import styles from "./brands.module.scss";

export default function Brands({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  return (
    <section className={styles.section} aria-labelledby="brands-title">
      <div className="section-wrapper">
        <header className="section-header">
          <h2 className="section-title" id="brands-title">
            {t.brands.title}
          </h2>
          <p className={styles.subtext}>
            {t.brands.subtitle}
          </p>
        </header>
        <div className={styles.marqueeWrapper} aria-label={t.brands.ariaLabel}>
          <div className={styles.marquee} aria-hidden="true">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div key={i} className={`badge badge--filled ${styles.chip}`}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
