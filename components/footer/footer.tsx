import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import SocialLinks from "../social-links/social-links";
import styles from "./footer.module.scss";
import { getTranslations } from "@/lib/i18n/translations";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);

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
          {t.footer.links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}>{link}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <span className={styles.newsletterLabel}>{t.footer.newsletterLabel}</span>
        <span className={styles.newsletterSub}>{t.footer.newsletterSub}</span>
        <div className={styles.newsletterForm}>
          <Input
            type="email"
            className={styles.newsletterInput}
            placeholder={t.footer.newsletterPlaceholder}
            ariaLabel={t.footer.newsletterLabel}
          />
          <Button className={styles.newsletterBtn}>{t.footer.newsletterBtn}</Button>
        </div>
      </div>
      <p className={styles.copyright}>
        {` © Copyright ${CURRENT_YEAR} Camilo Pinzón. All Rights Reserved. · Privacy Policy · Terms of Service`}
      </p>
    </footer>
  );
}
