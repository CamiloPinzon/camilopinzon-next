import { Metadata } from "next";
import MainHero from "@/components/main-hero/main-hero";
import TechStack from "@/components/tech-stack/tech-stack";
import BlogHighlights from "@/components/blog-highlights/blog-highlights";
import Brands from "@/components/brands/brands";
import { getRecentPosts } from "@/lib/firebase/queries";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title:
      lang === "es"
        ? "Camilo Pinzón — Frontend Developer"
        : "Camilo Pinzón — Frontend Developer",
    description:
      lang === "es"
        ? "Portfolio y blog de Camilo Pinzón, desarrollador frontend especializado en React y Next.js."
        : "Portfolio and blog of Camilo Pinzón, frontend developer specialized in React and Next.js.",
    alternates: {
      canonical: `https://camilopinzon.dev/${lang}`,
      languages: {
        en: "https://camilopinzon.dev/en",
        es: "https://camilopinzon.dev/es",
      },
    },
    openGraph: {
      title: "Camilo Pinzón — Frontend Developer",
      description:
        lang === "es"
          ? "Portfolio y blog de Camilo Pinzón, desarrollador frontend."
          : "Portfolio and blog of Camilo Pinzón, frontend developer.",
      url: `https://camilopinzon.dev/${lang}`,
      images: [
        {
          url: "/og-image.jpg", // ← Crearemos esta imagen después
          width: 1200,
          height: 630,
          alt: "Camilo Pinzón — Frontend Developer",
        },
      ],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const posts = await getRecentPosts(lang, 7);

  return (
    <main>
      <MainHero />
      <TechStack lang={lang} />
      <BlogHighlights posts={posts} />
      <Brands lang={lang} />
    </main>
  );
}
