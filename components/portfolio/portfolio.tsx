import Image from "next/image";
import { getTranslations } from "@/lib/i18n/translations";
import styles from "./portfolio.module.scss";

// Imágenes de stock premium (Unsplash) representativas
const IMAGES = [
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", // Bosque/Naturaleza (Jet)
  "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&w=800&q=80", // Crucero (Disney)
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80", // Pago Digital (Google Wallet)
];

export default function Portfolio({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  return (
    <section
      id="portafolio"
      className={styles.section}
      aria-label={t.portfolio.ariaLabel}
      data-reveal
    >
      <div className="section-wrapper">
        <header className="section-header">
          <span className="section-label">{t.portfolio.sectionLabel}</span>
          <h2 className="section-title">
            {t.portfolio.title} <em>{t.portfolio.titleEm}</em>
          </h2>
        </header>

        <div className={styles.grid} data-stagger>
          {t.portfolio.items.map((project, i) => (
            <article key={i} className={`surface-card ${styles.card}`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={IMAGES[i]}
                  alt={project.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized // Usamos unoptimized para URLs externas de Unsplash temporalmente
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`badge badge--outline ${styles.tagBadge}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
