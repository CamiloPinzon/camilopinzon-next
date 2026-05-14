import Image from "next/image";
import { getTranslations } from "@/lib/i18n/translations";
import styles from "./portfolio.module.scss";

// Imágenes de stock premium (Unsplash) representativas
const IMAGES = [
  "/social/og-image.png", // Pantallazo real / OG Preview del proyecto (Portafolio IA)
  "/portfolio/google-pay.png", // Interfaz de formulario / Stickers Google Pay
  "/portfolio/disney-cruise.png", // Plataforma web / Itinerarios Disney Cruise Line
  "/portfolio/chocolates-jet.png", // Portada gráfica oficial del álbum Chocolates Jet
];

export default function Portfolio({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  return (
    <section
      id="portafolio"
      className={styles.section}
      aria-label={t.portfolio.ariaLabel}
    >
      <div className="section-wrapper">
        <header className="section-header">
          <span className="section-label">{t.portfolio.sectionLabel}</span>
          <h2 className="section-title">
            {t.portfolio.title} <em>{t.portfolio.titleEm}</em>
          </h2>
        </header>

        <div className={styles.grid}>
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
