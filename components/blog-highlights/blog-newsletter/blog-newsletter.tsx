import styles from "./blog-newsletter.module.scss";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";

export default function BlogNewsletter() {
  return (
    <div
      className={styles.newsletter}
      role="complementary"
      aria-label="Suscripción al blog"
    >
      <div className={styles.text}>
        <h3>¿Te gustó el contenido?</h3>
        <p>
          Recibe los nuevos artículos directo en tu correo. Sin spam, solo
          aprendizaje.
        </p>
      </div>
      <div className={styles.form}>
        <Input
          type="email"
          name="email"
          placeholder="tu@correo.com"
          ariaLabel="Correo electrónico para suscribirse"
          autoComplete="email"
          required
        />
        <Button type="submit">Suscribirme</Button>
      </div>
    </div>
  );
}
