import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Block AI training crawlers
        userAgent: ["GPTBot", "CCBot", "Bytespider"],
        disallow: "/",
      },
      {
        // Allow AI search crawlers
        userAgent: ["ChatGPT-User", "PerplexityBot", "Applebot"],
        allow: "/",
      },
      {
        // Allow all other crawlers
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://camilopinzon.dev/sitemap.xml",
  };
}
