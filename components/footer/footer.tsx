import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import SocialLinks from "../social-links/social-links";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div>
        <p className={styles.brandName}>Camilo Pinzón</p>
        <span className={styles.brandRole}>Web Developer</span>
        <div className={styles.socials}>
          <SocialLinks />
        </div>
      </div>
      <nav aria-label="Pie de página">
        <ul className={styles.nav}>
          {["Inicio", "Experiencia", "Servicios", "Blogs", "Contacto"].map(
            (link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div>
        <span className={styles.newsletterLabel}>
          Suscríbete para actualizaciones
        </span>
        <span className={styles.newsletterSub}>
          Mantente actualizado con los últimos blogs.
        </span>
        <div className={styles.newsletterForm}>
          <Input
            type="email"
            className={styles.newsletterInput}
            placeholder="your@email.com"
            ariaLabel="Correo para suscripción"
          />
          <Button className={styles.newsletterBtn}>Suscribir</Button>
        </div>
      </div>
      <p className={styles.copyright}>
        {` © Copyright ${new Date().getFullYear()} Camilo Pinzón. All Rights Reserved. · Privacy Policy · Terms of Service`}
      </p>
    </footer>
  );
}
