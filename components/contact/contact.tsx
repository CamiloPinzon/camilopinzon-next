"use client";

import { useState, useRef } from "react";
import { getTranslations } from "@/lib/i18n/translations";
import { executeRecaptcha } from "@/lib/recaptcha";
import { submitContact } from "@/app/actions/contact";
import Button from "@/components/ui/button/button";
import styles from "./contact.module.scss";
import { useReveal } from "@/lib/hooks/use-reveal";

function ContactFormInner({
  t,
  lang,
}: {
  t: ReturnType<typeof getTranslations>;
  lang: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    // Capturar FormData ANTES de setLoading — los inputs disabled no se incluyen en FormData
    const formData = new FormData(e.currentTarget);
    const formEl = e.currentTarget;

    // Adjuntar el idioma de navegación actual para la respuesta localizada
    formData.append("lang", lang);

    setLoading(true);

    try {
      // 1. Obtener el token de ReCAPTCHA
      const recaptchaToken = await executeRecaptcha("contact_form");
      if (recaptchaToken) {
        formData.append("recaptchaToken", recaptchaToken);
      }

      // 2. Enviar a la Server Action
      const result = await submitContact(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: t.contact.successMsg || "Message sent successfully!",
        });
        formEl.reset();
      } else {
        setStatus({
          type: "error",
          message: result.error || t.contact.errorDefault,
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: t.contact.errorUnexpected || "Unexpected error.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`glass-panel ${styles.card}`}>
      <header className="section-header" style={{ marginBottom: "24px" }}>
        <span className="section-label">{t.contact.sectionLabel}</span>
        <h2 className="section-title">{t.contact.title}</h2>
      </header>

      <p className={styles.description}>{t.contact.description}</p>

      {status.type === "success" ? (
        <div
          className={styles.successMessage}
          style={{
            padding: "20px",
            background: "rgba(0, 200, 100, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(0, 200, 100, 0.2)",
            color: "var(--color-text)",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <h3 style={{ marginBottom: "8px", fontWeight: 500 }}>
            {status.message}
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-slate-comment)" }}>
            {t.contact.successSub}
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          {status.type === "error" && (
            <div
              style={{ color: "red", fontSize: "14px", marginBottom: "16px" }}
            >
              {status.message}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              {t.contact.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={styles.input}
              placeholder={t.contact.namePlaceholder}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              {t.contact.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.input}
              placeholder={t.contact.emailPlaceholder}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>
              {t.contact.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              required
              className={styles.textarea}
              placeholder={t.contact.messagePlaceholder}
              disabled={loading}
            />
          </div>

          <Button type="submit" style={{ marginTop: "8px" }} disabled={loading}>
            {loading ? t.contact.sending || "..." : t.contact.submitBtn}
          </Button>
        </form>
      )}
    </div>
  );
}

export default function Contact({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      id="contacto"
      className={styles.section}
      aria-label={t.contact.ariaLabel}
      ref={sectionRef}
    >
      <div className="section-wrapper">
        <div data-reveal>
          <ContactFormInner t={t} lang={lang} />
        </div>
      </div>
    </section>
  );
}
