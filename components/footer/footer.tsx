import Link from "next/link";
import SocialLinks from "../social-links/social-links";
import FooterNewsletterForm from "./footer-newsletter-form";
import styles from "./footer.module.scss";
import { getTranslations } from "@/lib/i18n/translations";
import { NAV_LINKS, CONTACT_HASH } from "@/lib/config/nav-links";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

  const footerLinks = [
    ...NAV_LINKS.map((link) => ({
      label: t.nav[link.labelKey],
      href: `/${lang}/#${link.hash}`,
    })),
    { label: t.nav.contact, href: `/${lang}/#${CONTACT_HASH}` },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div>
        <p className={styles.brandName}>Camilo Pinzón</p>
        <span className={styles.brandRole}>{t.footer.role}</span>
        <div className={styles.socials}>
          <SocialLinks />
        </div>
      </div>
      <nav aria-label={t.footer.navLabel}>
        <ul className={styles.nav}>
          {footerLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <span className={styles.newsletterLabel}>{t.footer.newsletterLabel}</span>
        <span className={styles.newsletterSub}>{t.footer.newsletterSub}</span>
        <FooterNewsletterForm
          placeholder={t.footer.newsletterPlaceholder}
          btnLabel={t.footer.newsletterBtn}
          label={t.footer.newsletterLabel}
          successMsg={t.footer.newsletterSuccess}
          errorMsg={t.footer.newsletterError}
          lang={lang || "en"}
        />
      </div>
      <p className={styles.copyright}>
        {` © Copyright ${CURRENT_YEAR} Camilo Pinzón. All Rights Reserved. · Privacy Policy · Terms of Service`}
      </p>
    </footer>
  );
}
