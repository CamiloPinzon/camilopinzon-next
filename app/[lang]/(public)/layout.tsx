import type { Metadata } from "next";
import MainNav from "@/components/nav/main-nav";
import Footer from "@/components/footer/footer";
import Chatbot from "@/components/chatbot/chatbot";
import { getTranslations } from "@/lib/i18n/translations";

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
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_CO" : "en_US",
      url: `https://camilopinzon.dev/${lang}`,
      title: t.seo.ogTitle,
      description: t.seo.ogDescription,
      siteName: "Camilo Pinzón",
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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/social/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/social/site.webmanifest",
  };
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <MainNav />
      {children}
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </>
  );
}
