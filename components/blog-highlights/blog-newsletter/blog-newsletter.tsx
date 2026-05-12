"use client";

import { useState } from "react";
import { executeRecaptcha } from "@/lib/recaptcha";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import styles from "./blog-newsletter.module.scss";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";

export default function BlogNewsletter() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    const formEl = e.currentTarget;

    // Capturar FormData ANTES de setLoading — inputs disabled no se incluyen
    const formData = new FormData(formEl);

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha("newsletter_form");

      if (recaptchaToken) {
        formData.append("recaptchaToken", recaptchaToken);
      }

      const result = await subscribeNewsletter(formData);

      if (result.success) {
        setStatus({ type: "success", message: "¡Suscripción exitosa!" });
        formEl.reset();
      } else {
        setStatus({ type: "error", message: result.error || "Error al suscribirte." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Error inesperado." });
    } finally {
      setLoading(false);
    }
  };

  if (status.type === "success") {
    return (
      <div className={styles.newsletter} style={{ justifyContent: "center", textAlign: "center" }}>
        <h3 style={{ margin: 0, color: "var(--color-primary)", fontWeight: 500 }}>{status.message}</h3>
        <p style={{ margin: 0, marginTop: "8px", fontSize: "14px" }}>Revisa tu correo para el mensaje de bienvenida.</p>
      </div>
    );
  }

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
        {status.type === "error" && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{status.message}</p>
        )}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="tu@correo.com"
          ariaLabel="Correo electrónico para suscribirse"
          autoComplete="email"
          required
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "..." : "Suscribirme"}
        </Button>
      </form>
    </div>
  );
}
