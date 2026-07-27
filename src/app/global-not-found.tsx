import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import Link from "next/link";
import "./(frontend)/globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Page not found · Happiness Philippines",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <main className="flex min-h-screen items-center justify-center bg-hp-foam px-6">
          <div className="max-w-xl space-y-6 text-center">
            <p className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-lagoon">
              404
            </p>
            <h1 className="font-display text-[length:var(--hp-text-3xl)] font-semibold leading-[var(--hp-leading-tight)] tracking-[var(--hp-tracking-display)] text-hp-ink">
              This island doesn&apos;t exist.
            </h1>
            <p className="font-body text-hp-text-muted">
              The page you&apos;re looking for drifted away. Stays, tours, and
              island nights are all still here.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/"
                className="rounded-[var(--hp-radius-pill)] bg-hp-citrus px-6 py-3 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-ink"
              >
                Back to home
              </Link>
              <Link
                href="/tours"
                className="rounded-[var(--hp-radius-pill)] border border-hp-border px-6 py-3 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-ink"
              >
                Explore tours
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
