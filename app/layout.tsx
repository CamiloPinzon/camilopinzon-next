import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import RecaptchaProvider from "@/components/providers/recaptcha-provider";
import GlobalBg from "@/components/global-bg/global-bg";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

// Fuente principal para cuerpo y UI — moderna, legible, parecida a PP Neue Montreal
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Fuente para títulos y headings — geométrica, personalidad fuerte
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Camilo Pinzon — Frontend Developer",
    template: "%s — Camilo Pinzon",
  },
  description:
    "Frontend developer especializado en React, Next.js y experiencias digitales de alto impacto. Portfolio, blog y contacto.",
  metadataBase: new URL("https://camilopinzon.dev"),
  openGraph: {
    type: "website",
    title: "Camilo Pinzón — Frontend Developer",
    description: "Frontend developer especializado en React, Next.js y experiencias digitales de alto impacto. Portfolio, blog y contacto.",
    siteName: "Camilo Pinzón",
    locale: "es_CO",
    alternateLocale: "en_US",
    images: [
      {
        url: "/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "Camilo Pinzón — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camilo Pinzón — Frontend Developer",
    description: "Frontend developer especializado en React, Next.js y experiencias digitales de alto impacto.",
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
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "facebook-domain-verification": "ght3sfge61gajaah4lxntr3zd0s05f",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* Background atmosférico global — position:fixed, z-index:-1, sin clipping */}
        <GlobalBg />
        <RecaptchaProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
