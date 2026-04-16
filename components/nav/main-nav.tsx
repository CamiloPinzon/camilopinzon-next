"use client";

import { useEffect, useState } from "react";

import HamburgerIcon from "../hamburger-icon/hamburger-icon";
import "./main-nav.css";

export default function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = [
    "Inicio",
    "Experiencia",
    "Servicios",
    "Blogs",
    "Descargar CV",
  ];
  return (
    <>
      <nav
        className={`site-nav${scrolled ? " site-nav--scrolled" : ""}${menuOpen ? " site-nav--open" : ""}`}
        aria-label="Navegación principal"
      >
        <a
          href="#inicio"
          className="nav__logo"
          onClick={() => setMenuOpen(false)}
        >
          Camilo Pinzón
        </a>

        <ul className="nav__links">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(" ", "-")}`}>{link}</a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="nav__cta">
              Contacto
            </a>
          </li>
        </ul>

        <button
          className="nav__hamburger"
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
        className={`nav__drawer${menuOpen ? " nav__drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(" ", "-")}`}
            className="nav__drawer-link"
            onClick={() => setMenuOpen(false)}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {link}
          </a>
        ))}
        <div className="nav__drawer-divider" />
        <button className="nav__drawer-cta" onClick={() => setMenuOpen(false)}>
          Contacto
        </button>
      </div>
    </>
  );
}
