"use client";

import { useRef } from "react";

import Image from "next/image";

import "./main-hero.css";

import SocialLinks from "@/components/social-links/social-links";

export default function MainHero() {
  const heroRef = useRef(null);
  return (
    <section
      id="inicio"
      className="site-hero"
      ref={heroRef}
      aria-label="Presentación"
    >
      <aside className="hero__profile-card" aria-label="Información de perfil">
        <div className="hero__avatar-ring">
          <div
            className="hero__avatar-placeholder"
            role="img"
            aria-label="Foto de Camilo Pinzón"
          >
            <Image src="/profile.webp" alt="Avatar" width={120} height={120} />
          </div>
        </div>
        <h1 className="hero__name">Camilo Pinzón</h1>
        <p className="hero__role">Web Developer</p>
        <div className="hero__socials-wrapper">
          <SocialLinks />
        </div>
        <div className="hero__divider" />
        <p className="hero__section-label">Sobre mí</p>
        <p className="hero__bio">
          Autodidacta y dedicado. Desarrollador web con capacidad para asimilar
          el trabajo bajo presión y gran facilidad para el trabajo en equipo, ya
          sea de forma local o remota.
        </p>
        <div className="hero__divider" />
        <p className="hero__section-label">Contacto</p>
        <ul className="hero__contact-list">
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
        <button className="hero__contact-cta">Contáctame</button>
      </aside>

      <div className="hero__content">
        <p className="hero__eyebrow">
          Disponible para proyectos · Colombia & Remoto
        </p>
        <h2 className="hero__headline">
          Construyo
          <br />
          <em>Experiencias</em>
          <br />
          Digitales
        </h2>
        <p className="hero__subtext">
          Desarrollo web front-end con enfoque en performance, accesibilidad y
          código limpio. Transformo ideas en productos digitales de alto
          impacto.
        </p>
        <div className="hero__actions">
          <button className="btn-primary">Ver proyectos</button>
          <button className="btn-ghost">Descargar CV</button>
        </div>
        <div className="hero__stats" aria-label="Estadísticas">
          <div>
            <span className="hero__stat-value">5+</span>
            <span className="hero__stat-label">Años de experiencia</span>
          </div>
          <div>
            <span className="hero__stat-value">30+</span>
            <span className="hero__stat-label">Proyectos entregados</span>
          </div>
          <div>
            <span className="hero__stat-value">11</span>
            <span className="hero__stat-label">Tecnologías dominadas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
