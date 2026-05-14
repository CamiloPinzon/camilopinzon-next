import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://camilopinzon.com";
  const langs = ["en", "es"];
  const now = new Date();

  // Páginas estáticas principales
  const staticRoutes = ["", "/blog"].flatMap((route) =>
    langs.map((lang) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("daily" as const),
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          langs.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );

  return staticRoutes;
}
