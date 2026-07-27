import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/stays", label: "Stays" },
  { href: "/tours", label: "Tours" },
  { href: "/events", label: "Events" },
  { href: "/story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

type SiteHeaderProps = {
  transparent?: boolean;
};

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--hp-header-h)]",
        transparent
          ? "text-hp-foam"
          : "border-b border-hp-border bg-hp-foam/90 text-hp-ink backdrop-blur-md",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-[0.08em] uppercase transition-opacity hover:opacity-80"
        >
          Happiness
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
            variant={transparent ? "ghost" : "secondary"}
            className={transparent ? "border-hp-foam text-hp-foam" : undefined}
          >
            Book stay
          </Button>
        </div>
      </Container>
    </header>
  );
}
