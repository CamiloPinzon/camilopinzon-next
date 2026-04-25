"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LanguageSwitcher from "./language-switcher";
import HamburgerIcon from "../hamburger-icon/hamburger-icon";
import styles from "./main-nav.module.scss";

export default function MainNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => {
      const hashIndex = link.href.indexOf('#');
      return hashIndex !== -1 ? link.href.substring(hashIndex + 1) : null;
    })
      .concat("contacto")
      .map((id) => id ? document.getElementById(id) : null)
      .filter(Boolean) as HTMLElement[];

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

  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en';

  const NAV_LINKS = [
    { label: "Inicio", href: `/${currentLang}#inicio` },
    { label: "Experiencia", href: `/${currentLang}/experience` },
    { label: "Servicios", href: `/${currentLang}#servicios` },
    { label: "Portafolio", href: `/${currentLang}#portafolio` },
    { label: "Blogs", href: `/${currentLang}/blog` },
    { label: "Descargar CV", href: `/${currentLang}#descargar-cv` },
  ];

  return (
    <>
      <nav
        className={[
          styles.nav,
          scrolled || menuOpen ? "glass-panel" : "",
          scrolled ? styles.scrolled : "",
          menuOpen ? styles.open : "",
        ].filter(Boolean).join(" ")}
        aria-label="Navegación principal"
      >
        <Link
          href="/#inicio"
          className={styles.logo}
          onClick={() => setMenuOpen(false)}
        >
          Camilo Pinzón
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => {
            const hashIndex = link.href.indexOf('#');
            const isAnchor = hashIndex !== -1;
            const sectionId = isAnchor ? link.href.substring(hashIndex + 1) : null;
            
            // Logic for active state:
            // 1. If it's an anchor on the homepage, check activeSection (from IntersectionObserver)
            // 2. If it's a dedicated page (like /experience or /blog), check if pathname starts with it.
            const isActive = isAnchor 
              ? (pathname === `/${currentLang}` || pathname === '/' ? activeSection === sectionId : false) 
              : pathname.startsWith(link.href);

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={isActive ? styles.linkActive : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <Link href="/#contacto" className={styles.cta}>
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
        {NAV_LINKS.map((link, i) => {
          const hashIndex = link.href.indexOf('#');
          const isAnchor = hashIndex !== -1;
          const sectionId = isAnchor ? link.href.substring(hashIndex + 1) : null;
          const isActive = isAnchor 
            ? (pathname === `/${currentLang}` || pathname === '/' ? activeSection === sectionId : false) 
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={[
                styles.drawerLink,
                isActive ? styles.drawerLinkActive : "",
              ].filter(Boolean).join(" ")}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          );
        })}
        <div className={styles.drawerDivider} />
        <button className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
          Contacto
        </button>
      </div>
    </>
  );
}
