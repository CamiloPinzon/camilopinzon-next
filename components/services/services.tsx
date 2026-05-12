import { getTranslations } from "@/lib/i18n/translations";
import styles from "./services.module.scss";

export default function Services({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  return (
    <section
      id="servicios"
      className={styles.section}
      aria-label={t.services.ariaLabel}
      data-reveal
    >
      <div className="section-wrapper">
        <header className="section-header">
          <h2 className="section-title">
            {t.services.title} <em>{t.services.titleEm}</em>
          </h2>
        </header>

        <div className={styles.list} data-stagger>
          {t.services.items.map((service, i) => (
            <article key={i} className={styles.item}>
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
