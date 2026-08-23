import Image from "next/image";

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
          {marqueeItems.map((brand, i) => {
            // Solo el primer set es accesible; los duplicados del marquee
            // se ocultan a lectores de pantalla y al teclado para evitar
            // que el mismo enlace se anuncie varias veces.
            const isDuplicate = i >= BRANDS.length;

            return (
              <a
                key={i}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.brandLogo}
                title={brand.name}
                aria-hidden={isDuplicate || undefined}
                tabIndex={isDuplicate ? -1 : undefined}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={160}
                  height={64}
                  className={styles.logoImage}
                  sizes="160px"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
