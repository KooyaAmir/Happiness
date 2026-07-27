import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Events",
  description: "Filter Happiness events by location across Boracay, El Nido, and Siargao.",
};

const events = [
  {
    title: "Daily Happy Hour",
    location: "Boracay",
    venue: "Happiness Skate Cafe",
    when: "Daily · 12:00 pm – 8:00 pm",
  },
  {
    title: "Happy Hour",
    location: "El Nido",
    venue: "Happiness Restaurant",
    when: "Daily · 12:00 pm – 8:00 pm",
  },
  {
    title: "Bingo Night",
    location: "Siargao",
    venue: "Goodies",
    when: "Every Monday · 4:00 pm – 9:00 pm",
  },
  {
    title: "Funky Wednesdays",
    location: "Siargao",
    venue: "Goodies",
    when: "Every Wednesday · 8:00 pm – 12:00 am",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Island nights, Happiness style."
        description="Filter by location. Full calendar management lands in the dashboard next."
        image="/images/experiences/events-nightlife.png"
        compact
      />
      <Section tone="foam">
        <Container className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {["All", "Boracay", "El Nido", "Siargao"].map((filter) => (
              <button
                key={filter}
                type="button"
                className="rounded-[var(--hp-radius-pill)] border border-hp-border px-4 py-2 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]"
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="divide-y divide-hp-border border-y border-hp-border">
            {events.map((event) => (
              <div key={`${event.title}-${event.location}`} className="grid gap-2 py-5 md:grid-cols-[1fr_1fr_1.2fr]">
                <Text as="p" variant="label" tone="lagoon">
                  {event.location}
                </Text>
                <div>
                  <Text as="h2" variant="heading">
                    {event.title}
                  </Text>
                  <Text tone="muted">{event.venue}</Text>
                </div>
                <Text>{event.when}</Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
