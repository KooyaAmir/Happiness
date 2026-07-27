"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/stays", label: "Stays" },
  { href: "/tours", label: "Tours" },
  { href: "/food", label: "Food" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Journal" },
  { href: "/story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

type SiteHeaderProps = {
  transparent?: boolean;
};

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const overlay = transparent && !open && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overlay
          ? "text-hp-foam"
          : "border-b border-hp-border bg-hp-foam/95 text-hp-ink backdrop-blur-md",
      )}
    >
      <Container className="flex h-[var(--hp-header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="relative flex h-12 w-12 shrink-0 items-center transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/happiness-logo.png"
            alt="Happiness Philippines"
            width={48}
            height={48}
            className={cn(
              "h-12 w-12 object-contain",
              overlay ? "brightness-0 invert" : undefined,
            )}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/book"
            size="sm"
            variant={overlay ? "ghost" : "secondary"}
            className={overlay ? "border-hp-foam text-hp-foam" : undefined}
          >
            Book stay
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-current/30 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="font-mono text-[length:var(--hp-text-xs)] uppercase">
              {open ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-hp-border bg-hp-foam lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
