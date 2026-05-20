import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Regla permisiva explícita para scrapers de redes sociales y mensajería
        userAgent: ["facebookexternalhit", "Twitterbot", "LinkedInBot", "WhatsApp", "TelegramBot"],
        allow: "/",
      },
      {
        // Regla explícita para rastreadores de IA y motores de búsqueda generativa (GEO/AEO)
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // Regla general para todos los motores de búsqueda
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://camilopinzon.dev/sitemap.xml",
  };
}
