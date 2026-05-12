import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/en/", "/es/"],
        // Bloquear rutas de admin y utilidades internas
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://camilopinzon.dev/sitemap.xml",
  };
}
