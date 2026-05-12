import { Metadata } from "next";
import MainHero from "@/components/main-hero/main-hero";
import TechStack from "@/components/tech-stack/tech-stack";
import BlogHighlights from "@/components/blog-highlights/blog-highlights";
import Brands from "@/components/brands/brands";
import { getRecentPosts } from "@/lib/firebase/queries";
import DownloadCv from "@/components/download-cv/download-cv";
import Services from "@/components/services/services";
import Portfolio from "@/components/portfolio/portfolio";
import Contact from "@/components/contact/contact";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Camilo Pinzón",
    url: "https://camilopinzon.dev",
    image: "https://camilopinzon.dev/profile.webp",
    sameAs: [
      "https://github.com/CamiloPinzon",
      "https://www.linkedin.com/in/camilo-pinzon/",
    ],
    jobTitle: "Frontend Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    knowsAbout: ["React", "Next.js", "TypeScript", "Firebase", "CSS"],
    description:
      lang === "es"
        ? "Desarrollador frontend especializado en React y Next.js con experiencia en experiencias digitales de alto impacto."
        : "Frontend developer specialized in React and Next.js with experience in high-impact digital experiences.",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainHero />
      <div className="theme-dark">
        <Services lang={lang} />
        <TechStack lang={lang} />
      </div>
      <Portfolio lang={lang} />
      <div className="theme-dark">
        <DownloadCv lang={lang} />
        <BlogHighlights posts={posts} />
      </div>
      <Brands lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}
