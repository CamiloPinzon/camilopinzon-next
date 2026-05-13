"use client";

import { useState } from "react";
import { executeRecaptcha } from "@/lib/recaptcha";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { getTranslations } from "@/lib/i18n/translations";
import styles from "./blog-newsletter.module.scss";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";

export default function BlogNewsletter({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    const formEl = e.currentTarget;

    // Capturar FormData ANTES de setLoading — inputs disabled no se incluyen
    const formData = new FormData(formEl);
    
    // Adjuntar el idioma para la respuesta del servidor localizada
    formData.append("lang", lang);

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha("newsletter_form");

      if (recaptchaToken) {
        formData.append("recaptchaToken", recaptchaToken);
      }

      const result = await subscribeNewsletter(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: t.blogNewsletter.successTitle || "Subscription successful!",
        });
        formEl.reset();
      } else {
        setStatus({
          type: "error",
          message: result.error || t.blogNewsletter.errorDefault,
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: t.blogNewsletter.errorUnexpected || "Unexpected error.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (status.type === "success") {
    return (
      <div
        className={styles.newsletter}
        style={{ justifyContent: "center", textAlign: "center" }}
      >
        <h3 style={{ margin: 0, color: "var(--color-primary)", fontWeight: 500 }}>
          {status.message}
        </h3>
        <p style={{ margin: 0, marginTop: "8px", fontSize: "14px" }}>
          {t.blogNewsletter.successSub}
        </p>
      </div>
    );
  }

  return (
    <div
      className={styles.newsletter}
      role="complementary"
      aria-label={t.blogNewsletter.ariaLabel}
    >
      <div className={styles.text}>
        <h3>{t.blogNewsletter.title}</h3>
        <p>{t.blogNewsletter.subtitle}</p>
        {status.type === "error" && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>
            {status.message}
          </p>
        )}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder={t.blogNewsletter.placeholder}
          ariaLabel={t.blogNewsletter.ariaLabel}
          autoComplete="email"
          required
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "..." : t.blogNewsletter.btn}
        </Button>
      </form>
    </div>
  );
}
