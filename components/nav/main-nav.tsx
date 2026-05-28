"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getTranslations } from "@/lib/i18n/translations";
import { NAV_LINKS, CONTACT_HASH } from "@/lib/config/nav-links";

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

  // Extract current language from pathname
  const currentLang = pathname.split("/")[1] || "en";
  const t = getTranslations(currentLang);

  const navLinks = NAV_LINKS.map((link) => ({
    label: t.nav[link.labelKey],
    href: `/${currentLang}/#${link.hash}`,
  }));

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => link.hash)
      .concat(CONTACT_HASH)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: 0.1, rootMargin: "-20% 0px -40% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentLang]);

  /** Smooth scroll a un anchor — usa scrollIntoView + scroll-margin-top del CSS */
  const handleAnchorClick = (e: React.MouseEvent, sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={[
          styles.nav,
          scrolled || menuOpen ? "glass-panel" : "",
          scrolled ? styles.scrolled : "",
          menuOpen ? styles.open : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Navegación principal"
      >
        <Link
          href={`/${currentLang}/`}
          className={styles.logo}
          onClick={(e) => {
            setMenuOpen(false);
            // If already on the home page, just scroll to top smoothly
            const isHome =
              pathname === `/${currentLang}` ||
              pathname === `/${currentLang}/` ||
              pathname === "/";
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          Camilo Pinzón
        </Link>

        <ul className={styles.links}>
          {navLinks.map((link) => {
            const hashIndex = link.href.indexOf("#");
            const isAnchor = hashIndex !== -1;
            const sectionId = isAnchor
              ? link.href.substring(hashIndex + 1)
              : null;

            const isActive = isAnchor
              ? pathname === `/${currentLang}` || pathname === "/"
                ? activeSection === sectionId
                : false
              : pathname.startsWith(link.href);

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={isActive ? styles.linkActive : undefined}
                  onClick={
                    isAnchor && sectionId
                      ? (e) => handleAnchorClick(e, sectionId)
                      : undefined
                  }
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
            <Link
              href={`/${currentLang}/#${CONTACT_HASH}`}
              className={styles.cta}
              onClick={(e) => handleAnchorClick(e, "contacto")}
            >
              {t.nav.contact}
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
        className={[styles.drawer, menuOpen ? styles.drawerOpen : ""]
          .filter(Boolean)
          .join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {navLinks.map((link, i) => {
          const hashIndex = link.href.indexOf("#");
          const isAnchor = hashIndex !== -1;
          const sectionId = isAnchor
            ? link.href.substring(hashIndex + 1)
            : null;
          const isActive = isAnchor
            ? pathname === `/${currentLang}` || pathname === "/"
              ? activeSection === sectionId
              : false
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={[
                styles.drawerLink,
                isActive ? styles.drawerLinkActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={
                isAnchor && sectionId
                  ? (e) => handleAnchorClick(e, sectionId)
                  : () => setMenuOpen(false)
              }
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          );
        })}
        <div className={styles.drawerDivider} />
        <div style={{ marginBottom: '10px' }}>
          <LanguageSwitcher />
        </div>
        <Link
          href={`/${currentLang}/#${CONTACT_HASH}`}
          className={styles.drawerCta}
          onClick={(e) => handleAnchorClick(e, "contacto")}
        >
          {t.nav.contact}
        </Link>
      </div>
    </>
  );
}
