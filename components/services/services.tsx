import { getTranslations } from "@/lib/i18n/translations";
import styles from "./services.module.scss";

// Íconos temporales (emojis) que luego reemplazaremos por SVGs o Imágenes
const ICONS = ["🚀", "🛍️", "🎨", "⚡"];

export default function Services({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  return (
    <section
      id="servicios"
      className={styles.section}
      aria-label={t.services.ariaLabel}
    >
      <div className="section-wrapper">
        <header className="section-header">
          <span className="section-label">{t.services.sectionLabel}</span>
          <h2 className="section-title">
            {t.services.title} <em>{t.services.titleEm}</em>
          </h2>
        </header>

        <div className={styles.grid}>
          {t.services.items.map((service, i) => (
            <article key={i} className={`glass-panel ${styles.card}`}>
              <div className={styles.iconWrapper} aria-hidden="true">
                {ICONS[i]}
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>

              <span className={styles.link}>{t.services.learnMore}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
