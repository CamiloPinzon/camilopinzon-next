import { getTranslations } from "@/lib/i18n/translations";
import Button from "@/components/ui/button/button";
import styles from "./download-cv.module.scss";

export default function DownloadCv({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  return (
    <section
      id="descargar-cv"
      className={styles.section}
      aria-label={t.cv.ariaLabel}
      data-reveal
    >
      <div className="section-wrapper">
        <header className="section-header">
          <span className="section-label">{t.cv.sectionLabel}</span>
          <h2 className="section-title" id="cv-title">
            {t.cv.title} <em>{t.cv.titleEm}</em>
          </h2>
        </header>

        <div className={`glass-panel ${styles.card}`}>
          <span
            style={{ fontSize: "3rem", marginBottom: "16px", display: "block" }}
          >
            📄
          </span>
          <p className={styles.description}>{t.cv.description}</p>
          <a
            href={`/${lang}-cv-camilo-pinzon.pdf`}
            download="Camilo-Pinzon-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>{t.cv.downloadBtn}</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
