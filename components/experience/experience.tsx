import type { ExperienceItem } from "@/lib/firebase/queries";
import styles from "./experience.module.scss";

interface ExperienceProps {
  items: ExperienceItem[];
  title?: string;
  subtitle?: string;
}

export default function Experience({ 
  items, 
  title = "Experiencia Profesional", 
  subtitle = "Mi trayectoria construyendo soluciones digitales de alto impacto." 
}: ExperienceProps) {
  return (
    <section className={styles.section} id="experiencia">
      <div className="section-wrapper">
        <header className="section-header">
          <span className="section-label">Trayectoria</span>
          <h2 className="section-title">{title}</h2>
          <p className={styles.description} style={{ marginTop: '0.5rem' }}>
            {subtitle}
          </p>
        </header>

        <div className={styles.timeline}>
          {items.map((item) => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.dateSide}>
                <span className={styles.dateRange}>
                  {item.startDate} — {item.endDate}
                </span>
              </div>
              
              <div className={styles.contentSide}>
                <div className={styles.dot} />
                <div className={`glass-panel surface-card ${styles.card}`}>
                  <h3 className={styles.jobTitle}>{item.jobTitle}</h3>
                  <a 
                    href={item.website || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.company}
                  >
                    {item.company}
                    {item.website && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    )}
                  </a>
                  
                  <p className={styles.description}>{item.description}</p>
                  
                  {item.tags && item.tags.length > 0 && (
                    <div className={styles.tags}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
