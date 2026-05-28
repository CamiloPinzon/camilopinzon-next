/**
 * Shared navigation link definitions.
 * Single source of truth for both MainNav and Footer.
 * To add, remove or reorder menu items, edit ONLY this file.
 */
export interface NavLink {
  /** Key inside the `t.nav` translations object */
  labelKey: "home" | "services" | "portfolio" | "news" | "blog";
  /** Anchor hash (without #) */
  hash: string;
}

export const NAV_LINKS: NavLink[] = [
  { labelKey: "home", hash: "inicio" },
  { labelKey: "services", hash: "servicios" },
  { labelKey: "portfolio", hash: "portafolio" },
  { labelKey: "news", hash: "novedades" },
  { labelKey: "blog", hash: "blogs" },
];

/** Contact CTA — rendered separately as a button in nav and footer */
export const CONTACT_HASH = "contacto";
