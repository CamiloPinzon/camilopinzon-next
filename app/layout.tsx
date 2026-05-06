import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
