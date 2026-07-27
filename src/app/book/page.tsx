import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Book your stay",
  description: "Search Happiness stays across Boracay, El Nido, and Siargao.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book stay"
        title="Find your room."
        description="Live availability and Xendit checkout will connect to Boom. This is the booking search shell."
        image="/images/stays/private-room.png"
        compact
      />
      <Section tone="foam">
        <Container>
          <form className="grid gap-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Location
              </span>
              <select className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-3">
                <option>Boracay</option>
                <option>El Nido</option>
                <option>Siargao</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Check-in
              </span>
              <input type="date" className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-3" />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Check-out
              </span>
              <input type="date" className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-3" />
            </label>
            <Button type="submit" size="lg">
              Check availability
            </Button>
          </form>
          <Text className="mt-6" tone="muted">
            Boom API + Xendit payment flow ships once credentials are available.
          </Text>
        </Container>
      </Section>
    </>
  );
}
