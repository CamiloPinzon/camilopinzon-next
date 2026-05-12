"use client";

import { useState } from "react";
import { executeRecaptcha } from "@/lib/recaptcha";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import styles from "./footer.module.scss";
import Button from "@/components/ui/button/button";

interface Props {
  placeholder: string;
  btnLabel: string;
  label: string;
  successMsg: string;
  errorMsg: string;
}

export default function FooterNewsletterForm({ placeholder, btnLabel, label, successMsg, errorMsg }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEl = e.currentTarget;

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha("footer_newsletter");
      if (recaptchaToken) formData.append("recaptchaToken", recaptchaToken);

      const result = await subscribeNewsletter(formData);

      if (result.success) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return <p style={{ fontSize: "0.82rem", color: "var(--color-accent)" }}>{successMsg}</p>;
  }

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        className={styles.newsletterInput}
        placeholder={placeholder}
        aria-label={label}
        required
        disabled={loading}
      />
      <Button type="submit" className={styles.newsletterBtn} disabled={loading}>
        {loading ? "..." : btnLabel}
      </Button>
      {status === "error" && (
        <p style={{ fontSize: "0.72rem", color: "red", marginTop: "4px", gridColumn: "1/-1" }}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
