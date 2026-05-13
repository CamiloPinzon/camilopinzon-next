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
        // Regla general para todos los motores de búsqueda
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://camilopinzon.dev/sitemap.xml",
  };
}
