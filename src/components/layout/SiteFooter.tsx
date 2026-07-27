import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/stays", label: "Stays" },
      { href: "/tours", label: "Tours" },
      { href: "/food", label: "Eat & drink" },
      { href: "/wellness", label: "Wellness" },
      { href: "/surf-retreat", label: "Surf retreat" },
      { href: "/events", label: "Events" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/story", label: "Our story" },
      { href: "/blog", label: "Journal" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Locations",
    links: [
      { href: "/stays/boracay", label: "Boracay" },
      { href: "/stays/el-nido", label: "El Nido" },
      { href: "/stays/siargao", label: "Siargao" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-hp-ink text-hp-foam">
      <Container className="grid gap-10 py-[var(--hp-space-8)] md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm space-y-4">
          <Text as="p" variant="heading" tone="inverse">
            Happiness Philippines
          </Text>
          <Text tone="inverse" className="opacity-70">
            Affordable luxury stays, tours, and island life across Boracay, El
            Nido, and Siargao.
          </Text>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="space-y-4">
            <Text as="h2" variant="label" tone="citrus">
              {column.title}
            </Text>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-hp-foam/75 transition-colors hover:text-hp-foam"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Text variant="caption" tone="inverse" className="opacity-55">
          © {new Date().getFullYear()} Happiness Philippines. All rights reserved.
        </Text>
        <Link
          href="/design-system"
          className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-foam/55 transition-colors hover:text-hp-citrus"
        >
          Design system
        </Link>
      </Container>
    </footer>
  );
}
