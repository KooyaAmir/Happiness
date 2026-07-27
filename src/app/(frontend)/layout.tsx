import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Syne } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { AppHeader } from "@/components/layout/AppHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Happiness Philippines",
    template: "%s · Happiness Philippines",
  },
  description:
    "Stays, tours, wellness, and island life across Boracay, El Nido, and Siargao.",
  openGraph: {
    type: "website",
    siteName: "Happiness Philippines",
    title: "Happiness Philippines",
    description:
      "Stays, tours, wellness, and island life across Boracay, El Nido, and Siargao.",
    images: [{ url: "/images/heroes/home-hero.png" }],
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <div className="flex min-h-full flex-col">
          <AppHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <WhatsAppFab />
        <Analytics />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
