import type { NextConfig } from "next";
import path from "path";

// Definición de Content Security Policy (CSP) robusta y compatible con reCAPTCHA v3
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.google.com/recaptcha/ https://www.recaptcha.net/ https://www.gstatic.com/recaptcha/ https://www.googletagmanager.com https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com https://cdn.jsdelivr.net https://www.google.com https://imagenes.portafolio.co;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://apis.google.com https://www.google.com/recaptcha/ https://www.recaptcha.net/ https://www.gstatic.com/ https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://va.vercel-scripts.com;
  frame-src 'self' https://*.firebaseapp.com https://www.google.com/recaptcha/ https://www.recaptcha.net/ https://recaptcha.google.com/;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  trusted-types *;
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  // Cabecera CSP principal requerida para obtener 100/100 en Lighthouse Best Practices
  { key: "Content-Security-Policy", value: cspHeader },
  // Cabecera COOP configurada para permitir ventanas emergentes de autenticación (Firebase OAuth Sign-In)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // Evita que el navegador "adivine" el tipo MIME del contenido (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Protege contra clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Controla la información enviada en el encabezado Referer
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deshabilita APIs del navegador que no necesitas
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Fuerza HTTPS en el navegador (HSTS) — Solo activo en producción
  ...(process.env.NODE_ENV === "production"
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, "."),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
};

export default nextConfig;
