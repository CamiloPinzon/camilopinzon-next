import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

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
    siteName: "Camilo Pinzón",
    locale: "es-CO",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@CamiloPinzonDev",
  },
  robots: {
    index: true,
    follow: true,
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
