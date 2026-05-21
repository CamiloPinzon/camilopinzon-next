"use client";

import { useRef, useState, useEffect } from "react";
import { getTranslations } from "@/lib/i18n/translations";
import styles from "./main-hero.module.scss";

interface CounterProps {
  value: number;
  duration?: number;
  delay?: number;
}

function Counter({ value, duration = 1200, delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let timerId: number;

    const runCounter = () => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          timerId = window.requestAnimationFrame(step);
        }
      };
      timerId = window.requestAnimationFrame(step);
    };

    const delayTimer = setTimeout(runCounter, delay);

    return () => {
      clearTimeout(delayTimer);
      if (timerId) window.cancelAnimationFrame(timerId);
    };
  }, [value, duration, delay]);

  return <>{count}</>;
}

export default function MainHero({ lang }: { lang: string }) {
  const heroRef = useRef(null);
  const t = getTranslations(lang);

  const headline1Words = t.hero.headline1.split(" ");
  const headlineEmWords = t.hero.headlineEm.split(" ");
  const headline2Words = t.hero.headline2.split(" ");
  
  let currentIdx = 0;

  return (
    <section
      id="inicio"
      className={styles.hero}
      ref={heroRef}
      aria-label={t.hero.profileLabel}
    >
      {/* Ambient background glows */}
      <div className={styles.glowBg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      <div className={styles.manifesto}>
        <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
        
        <h1 className={styles.headline}>
          {headline1Words.map((word, idx) => {
            const delay = currentIdx++;
            return (
              <span key={`h1-${idx}`} className={styles.wordContainer}>
                <span className={styles.wordMask}>
                  <span className={styles.word} style={{ "--word-index": delay } as React.CSSProperties}>
                    {word}
                  </span>
                </span>
                {" "}
              </span>
            );
          })}
          {headlineEmWords.map((word, idx) => {
            const delay = currentIdx++;
            return (
              <span key={`hem-${idx}`} className={styles.wordContainer}>
                <span className={styles.wordMask}>
                  <span className={`${styles.word} text-gradient`} style={{ "--word-index": delay } as React.CSSProperties}>
                    {word}
                  </span>
                </span>
                {" "}
              </span>
            );
          })}
          {headline2Words.map((word, idx) => {
            const delay = currentIdx++;
            return (
              <span key={`h2-${idx}`} className={styles.wordContainer}>
                <span className={styles.wordMask}>
                  <span className={styles.word} style={{ "--word-index": delay } as React.CSSProperties}>
                    {word}
                  </span>
                </span>
                {idx < headline2Words.length - 1 && " "}
              </span>
            );
          })}
        </h1>

        <p className={styles.subtext}>{t.hero.subtext}</p>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => {
              document
                .getElementById("portafolio")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {t.hero.btnProjects}
          </button>
        </div>

        <div className={styles.divider} />

        <ul className={styles.manifestoList}>
          <li>
            <span>{t.hero.statYears}</span>
            <strong><Counter value={10} delay={900} />+</strong>
          </li>
          <li>
            <span>{t.hero.statProjects}</span>
            <strong><Counter value={100} delay={900} />+</strong>
          </li>
          <li>
            <span>{t.hero.statTechs}</span>
            <strong><Counter value={4} delay={900} /></strong>
          </li>
        </ul>
      </div>
    </section>
  );
}
