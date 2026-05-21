import { Metadata } from "next";
import MainHero from "@/components/main-hero/main-hero";
import TechStack from "@/components/tech-stack/tech-stack";
import BlogHighlights from "@/components/blog-highlights/blog-highlights";
import Brands from "@/components/brands/brands";
import { getRecentPosts } from "@/lib/firebase/queries";
import Services from "@/components/services/services";
import Portfolio from "@/components/portfolio/portfolio";
import Contact from "@/components/contact/contact";

import { getTranslations } from "@/lib/i18n/translations";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang);

  return {
    title: t.seo.title,
    description: t.seo.description,
    keywords: t.seo.keywords,
    alternates: {
      canonical: `https://camilopinzon.dev/${lang}`,
      languages: {
        en: "https://camilopinzon.dev/en",
        es: "https://camilopinzon.dev/es",
      },
    },
    openGraph: {
      type: "website",
      title: t.seo.ogTitle,
      description: t.seo.ogDescription,
      url: `https://camilopinzon.dev/${lang}`,
      siteName: "Camilo Pinzón",
      locale: lang === "es" ? "es_CO" : "en_US",
      images: [
        {
          url: "/social/og-image.png",
          width: 1200,
          height: 630,
          alt: t.seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.ogTitle,
      description: t.seo.ogDescription,
      images: ["/social/twitter-card.png"],
      creator: "@CamiloPinzonDev",
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
    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://camilopinzon.dev/${lang}#organization`,
        name: "Camilo Pinzón",
        url: `https://camilopinzon.dev/${lang}`,
        logo: "https://camilopinzon.dev/profile.webp",
        sameAs: [
          "https://github.com/CamiloPinzon",
          "https://www.linkedin.com/in/camilo-pinzon/",
        ],
        description:
          lang === "es"
            ? "Empresa de desarrollo web y soluciones de software de alto impacto. Nos especializamos en React, Next.js y experiencias digitales premium."
            : "Custom web development agency specializing in React, Next.js, and high-impact digital solutions.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CO",
        }
      },
      {
        "@type": "WebSite",
        "@id": `https://camilopinzon.dev/${lang}#website`,
        url: `https://camilopinzon.dev/${lang}`,
        name: "Camilo Pinzón",
        publisher: {
          "@id": `https://camilopinzon.dev/${lang}#organization`
        }
      },
      {
        "@type": "ContactPage",
        "@id": `https://camilopinzon.dev/${lang}#contacto`,
        url: `https://camilopinzon.dev/${lang}#contacto`,
        name: lang === "es" ? "Contacto - Camilo Pinzón" : "Contact - Camilo Pinzón",
        mainEntity: {
          "@id": `https://camilopinzon.dev/${lang}#organization`
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainHero lang={lang} />
      <div className="theme-dark">
        <Services lang={lang} />
      </div>
      <Portfolio lang={lang} />
      <div className="theme-dark">
        <TechStack lang={lang} />
        <BlogHighlights posts={posts} lang={lang} />
      </div>
      <Contact lang={lang} />
      <Brands lang={lang} />
    </main>
  );
}
