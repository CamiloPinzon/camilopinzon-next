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
  // NOTA: CSP removido — bloqueaba el script de Google reCAPTCHA v3.
  // Re-implementar cuando se confirme la lista completa de dominios necesarios.
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
