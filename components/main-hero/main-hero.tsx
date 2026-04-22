"use client";

import { useRef } from "react";

import Image from "next/image";

import styles from "./main-hero.module.scss";

import SocialLinks from "@/components/social-links/social-links";

export default function MainHero() {
  const heroRef = useRef(null);
  return (
    <section
      id="inicio"
      className={styles.hero}
      ref={heroRef}
      aria-label="Presentación"
    >
      <aside className={`glass-panel ${styles.profileCard}`} aria-label="Información de perfil">
        <div className={styles.avatarRing}>
          <div
            className={styles.avatarPlaceholder}
            role="img"
            aria-label="Foto de Camilo Pinzón"
          >
            <Image src="/profile.webp" alt="Avatar" width={120} height={120} />
          </div>
        </div>
        <h1 className={styles.name}>Camilo Pinzón</h1>
        <p className={styles.role}>Web Developer</p>
        <div className={styles.socialsWrapper}>
          <SocialLinks />
        </div>
        <div className={styles.divider} />
        <p className={styles.sectionLabel}>Sobre mí</p>
        <p className={styles.bio}>
          Autodidacta y dedicado. Desarrollador web con capacidad para asimilar
          el trabajo bajo presión y gran facilidad para el trabajo en equipo, ya
          sea de forma local o remota.
        </p>
        <div className={styles.divider} />
        <p className={styles.sectionLabel}>Contacto</p>
        <ul className={styles.contactList}>
          <li>
            ✉{" "}
            <a href="mailto:camilopinzondeveloper@gmail.com">
              Envíame un correo
            </a>
          </li>
          <li>
            📞 <a href="tel:+573176844185">57 317 684 4185</a>
          </li>
        </ul>
        <button className={styles.contactCta}>Contáctame</button>
      </aside>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          Disponible para proyectos · Colombia &amp; Remoto
        </p>
        <h2 className={styles.headline}>
          Construyo
          <br />
          <em className="text-gradient">Experiencias</em>
          <br />
          Digitales
        </h2>
        <p className={styles.subtext}>
          Desarrollo web front-end con enfoque en performance, accesibilidad y
          código limpio. Transformo ideas en productos digitales de alto
          impacto.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>Ver proyectos</button>
          <button className={styles.btnGhost}>Descargar CV</button>
        </div>
        <div className={styles.stats} aria-label="Estadísticas">
          <div>
            <span className={styles.statValue}>5+</span>
            <span className={styles.statLabel}>Años de experiencia</span>
          </div>
          <div>
            <span className={styles.statValue}>30+</span>
            <span className={styles.statLabel}>Proyectos entregados</span>
          </div>
          <div>
            <span className={styles.statValue}>11</span>
            <span className={styles.statLabel}>Tecnologías dominadas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
