import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Syne } from "next/font/google";
import { AppHeader } from "@/components/layout/AppHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

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
  title: {
    default: "Happiness Philippines",
    template: "%s · Happiness Philippines",
  },
  description:
    "Stays, tours, wellness, and island life across Boracay, El Nido, and Siargao.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
