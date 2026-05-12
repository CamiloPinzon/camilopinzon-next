"use client";

import { useEffect, useRef } from "react";
import styles from "./hero-parallax.module.scss";

/**
 * Orbs decorativos que se mueven a 20% de la velocidad de scroll.
 * Crea profundidad real (parallax) en el hero sin afectar el layout.
 * Usa requestAnimationFrame para batching — nunca bloquea el main thread.
 * Solo activo compositor (transform) — cero layout repaints.
 */
export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY === lastY.current) return;
        lastY.current = scrollY;
        // Mueve los orbs al 20% de la velocidad — efecto de profundidad
        el.style.transform = `translateY(${scrollY * 0.2}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={ref} className={styles.layer} aria-hidden="true">
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
    </div>
  );
}
