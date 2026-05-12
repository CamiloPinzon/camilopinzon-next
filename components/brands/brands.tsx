"use client";

import { BRANDS } from "@/lib/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./brands.module.scss";

export default function Brands({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  
  // Duplicamos el array para lograr el efecto infinito sin cortes
  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className={styles.section} aria-labelledby="brands-title" data-reveal>
      <div className="section-wrapper">
        <header className="section-header">
          <h2 className="section-title" id="brands-title">
            {t.brands.title}
          </h2>
          <p className={styles.subtext}>
            {t.brands.subtitle}
          </p>
        </header>
      </div>

      {/* Marquee Container (Full Width) */}
      <div className={styles.marqueeContainer} aria-label={t.brands.ariaLabel}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((brand, i) => (
            <div key={i} className={styles.brandLogo}>
              {/* Para mostrar logos reales. Si no existen, muestra el alt. */}
              <div className={styles.logoPlaceholder}>
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
