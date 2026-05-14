import { MetadataRoute } from "next";
import { getRecentPosts } from "@/lib/firebase/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Traer todos los posts activos de Firebase
  // Pasamos un límite muy alto para asegurar que los traiga todos
  const posts = await getRecentPosts("es", 1000);

  const dynamicPostRoutes = posts.flatMap((post) =>
    langs.map((lang) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          langs.map((l) => [l, `${baseUrl}/${l}/blog/${post.slug}`])
        ),
      },
    }))
  );

  return [...staticRoutes, ...dynamicPostRoutes];
}
