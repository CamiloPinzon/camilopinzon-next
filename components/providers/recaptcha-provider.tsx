"use client";

import Script from "next/script";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export default function RecaptchaProvider() {
  if (!siteKey) return null;

  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      strategy="lazyOnload"
    />
  );
}
