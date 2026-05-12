import type { NextConfig } from "next";
import path from "path";

const securityHeaders = [
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
  // Content Security Policy: Define fuentes permitidas de contenido
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: el propio dominio, Google ReCAPTCHA, Google Analytics
      "script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.googletagmanager.com",
      // Frames: solo ReCAPTCHA necesita iframes de Google
      "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com",
      // Estilos: propio dominio + inline (necesario para CSS modules)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fuentes: Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Imágenes: propio dominio, Cloudinary, Unsplash, data URIs
      "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
      // Conexiones: Firebase, Resend, Google APIs, ReCAPTCHA
      "connect-src 'self' https://*.googleapis.com https://*.google.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://www.google-analytics.com",
      // Workers del service worker (Firebase usa esto)
      "worker-src 'self' blob:",
    ].join("; "),
  },
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
    ],
  },
};

export default nextConfig;
