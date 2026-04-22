"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import HamburgerIcon from "../hamburger-icon/hamburger-icon";
import styles from "./main-nav.module.scss";

const toSlug = (label: string) =>
  label.toLowerCase().replace(/\s+/g, "-");

export default function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.concat("Contacto").map((label) =>
      document.getElementById(toSlug(label))
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: 0.35 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NAV_LINKS = [
    "Inicio",
    "Experiencia",
    "Servicios",
    "Portafolio",
    "Blogs",
    "Descargar CV",
  ];

  return (
    <>
      <nav
        className={[
          styles.nav,
          scrolled ? styles.scrolled : "",
          menuOpen ? styles.open : "",
        ].filter(Boolean).join(" ")}
        aria-label="Navegación principal"
      >
        <Link
          href="#inicio"
          className={styles.logo}
          onClick={() => setMenuOpen(false)}
        >
          Camilo Pinzón
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <Link
                href={`#${toSlug(link)}`}
                className={activeSection === toSlug(link) ? styles.linkActive : undefined}
              >
                {link}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#contacto" className={styles.cta}>
              Contacto
            </Link>
          </li>
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen ? "true" : "false"}
          aria-controls="mobile-drawer"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={[styles.drawer, menuOpen ? styles.drawerOpen : ""].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link}
            href={`#${toSlug(link)}`}
            className={[
              styles.drawerLink,
              activeSection === toSlug(link) ? styles.drawerLinkActive : "",
            ].filter(Boolean).join(" ")}
            onClick={() => setMenuOpen(false)}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {link}
          </Link>
        ))}
        <div className={styles.drawerDivider} />
        <button className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
          Contacto
        </button>
      </div>
    </>
  );
}
