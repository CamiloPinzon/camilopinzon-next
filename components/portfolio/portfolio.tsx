import Image from "next/image";
import { getTranslations } from "@/lib/i18n/translations";
import styles from "./portfolio.module.scss";
import { getProjects } from "@/lib/firebase/server-queries";
import PortfolioReveal from "./portfolio-reveal";

// Imágenes predeterminadas asociadas al fallback estático en caso de que la BD esté vacía
const FALLBACK_IMAGES = [
  "/social/og-image.png", // Pantallazo real / OG Preview del proyecto (Portafolio IA)
  "/portfolio/google-pay.png", // Interfaz de formulario / Stickers Google Pay
  "/portfolio/disney-cruise.png", // Plataforma web / Itinerarios Disney Cruise Line
  "/portfolio/chocolates-jet.png", // Portada gráfica oficial del álbum Chocolates Jet
];

export default async function Portfolio({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  const dbProjects = await getProjects(lang);

  // Mapear al formato de visualización unificado dando prioridad absoluta a la base de datos administrable
  const projectsToRender =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
          title: p.title,
          description: p.description,
          tags: p.tags,
          image: p.coverImage || "/social/og-image.png",
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl,
        }))
      : t.portfolio.items.map((p, i) => ({
          title: p.title,
          description: p.description,
          tags: p.tags,
          image: FALLBACK_IMAGES[i] || "/social/og-image.png",
          liveUrl: undefined as string | undefined,
          githubUrl: undefined as string | undefined,
        }));

  return (
    <section
      id="portafolio"
      className={styles.section}
      aria-label={t.portfolio.ariaLabel}
    >
      <PortfolioReveal>
        <div className="section-wrapper">
          <header className="section-header" data-reveal>
            <span className="section-label">{t.portfolio.sectionLabel}</span>
            <h2 className="section-title">
              {t.portfolio.title} <em>{t.portfolio.titleEm}</em>
            </h2>
          </header>

          <div className={styles.grid}>
            {projectsToRender.map((project, i) => (
              <div
                key={i}
                className={styles.cardReveal}
                data-reveal
                style={
                  {
                    "--reveal-delay": `${i * 0.12}s`,
                  } as React.CSSProperties
                }
              >
                <article className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={project.image.startsWith("http")}
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
                    {(project.liveUrl || project.githubUrl) && (
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginTop: "20px",
                        }}
                      >
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              color: "#4318ff",
                              textDecoration: "none",
                            }}
                          >
                            🌐 Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              color: "#2b3674",
                              textDecoration: "none",
                            }}
                          >
                            💻 GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </PortfolioReveal>
    </section>
  );
}
