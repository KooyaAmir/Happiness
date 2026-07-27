import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Design system",
};

const colors = [
  { name: "Ink", token: "--hp-ink", value: "#07171C" },
  { name: "Lagoon", token: "--hp-lagoon", value: "#0F5C66" },
  { name: "Lagoon bright", token: "--hp-lagoon-bright", value: "#1A8A96" },
  { name: "Foam", token: "--hp-foam", value: "#F4F7F5" },
  { name: "Mist", token: "--hp-mist", value: "#D7E4DF" },
  { name: "Sand", token: "--hp-sand", value: "#CBB89A" },
  { name: "Citrus", token: "--hp-citrus", value: "#C6D94E" },
  { name: "Coral", token: "--hp-coral", value: "#E07A5F" },
];

export default function DesignSystemPage() {
  return (
    <div className="bg-hp-foam pt-[var(--hp-header-h)] text-hp-ink">
      <Section className="pb-[var(--hp-space-7)] pt-[var(--hp-space-8)]">
        <Container className="space-y-5">
          <Badge tone="lagoon">Living style guide</Badge>
          <Text as="h1" variant="display">
            Happiness design system
          </Text>
          <Text variant="lede" tone="muted" className="max-w-2xl">
            Cinematic tropical craft for stays, tours, and island life. Tokens
            first — components second — pages last.
          </Text>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-6">
          <Text as="h2" variant="title">
            Color
          </Text>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((color) => (
              <div key={color.token} className="overflow-hidden rounded-[var(--hp-radius-lg)] border border-hp-border bg-hp-foam">
                <div
                  className="h-28"
                  style={{ background: `var(${color.token})` }}
                />
                <div className="space-y-1 p-4">
                  <Text as="p" variant="heading">
                    {color.name}
                  </Text>
                  <Text variant="caption" tone="muted">
                    {color.token}
                  </Text>
                  <Text variant="label" tone="muted">
                    {color.value}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <Text as="h2" variant="title">
            Typography
          </Text>
          <div className="space-y-6 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6 md:p-8">
            <Text as="p" variant="hero">
              Island life, designed for joy.
            </Text>
            <Text as="p" variant="display">
              Syne for display. Figtree for body.
            </Text>
            <Text as="p" variant="lede" tone="muted">
              Body copy stays calm and readable across booking flows, tour
              itineraries, and long-form journal posts.
            </Text>
            <Text as="p" variant="label" tone="lagoon">
              Labels · destinations · meta
            </Text>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-6">
          <Text as="h2" variant="title">
            Buttons
          </Text>
          <div className="flex flex-wrap items-center gap-3 rounded-[var(--hp-radius-lg)] border border-hp-border bg-hp-foam p-6">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost" className="text-hp-ink">
              Ghost
            </Button>
            <div className="rounded-[var(--hp-radius-md)] bg-hp-ink p-3">
              <Button variant="inverse">Inverse</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-6">
          <Text as="h2" variant="title">
            Motion
          </Text>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Fade up", "Entrance for hero copy and section reveals"],
              ["Ken Burns", "Slow atmospheric drift on hero imagery"],
              ["Press scale", "Buttons respond with a subtle active shrink"],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-5"
              >
                <Text as="h3" variant="heading">
                  {title}
                </Text>
                <Text className="mt-2" tone="muted">
                  {copy}
                </Text>
              </div>
            ))}
          </div>
          <Text tone="muted" variant="caption">
            Respects <code>prefers-reduced-motion</code>.
          </Text>
        </Container>
      </Section>

      <Section tone="ink" className="pb-[var(--hp-space-10)]">
        <Container className="space-y-5">
          <Text as="h2" variant="title" tone="inverse">
            Principles
          </Text>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Brand first in the opening viewport — Happiness is the hero.",
              "One job per section. One headline. One supporting line.",
              "Full-bleed photography over card grids in marketing surfaces.",
              "Rooms come from Boom; content systems stay in our dashboard.",
            ].map((item) => (
              <li
                key={item}
                className="rounded-[var(--hp-radius-lg)] border border-white/10 bg-white/5 p-5"
              >
                <Text tone="inverse">{item}</Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </div>
  );
}
