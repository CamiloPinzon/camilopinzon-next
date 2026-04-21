import "./blog-newsletter.css";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";

export default function BlogNewsletter() {
  return (
    <div
      className="blog-newsletter"
      role="complementary"
      aria-label="Suscripción al blog"
    >
      <div className="blog-newsletter__text">
        <h3>¿Te gustó el contenido?</h3>
        <p>
          Recibe los nuevos artículos directo en tu correo. Sin spam, solo
          aprendizaje.
        </p>
      </div>
      <div className="blog-newsletter__form">
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
