import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import {
  EVENT_LOCATIONS,
  getPublishedEvents,
  isEventLocationFilter,
  locationLabel,
} from "@/lib/events";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Events",
  description: "Filter Happiness events by location across Boracay, El Nido, and Siargao.",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ location?: string }>;
};

export default async function EventsPage({ searchParams }: Props) {
  const params = await searchParams;
  const location = isEventLocationFilter(params.location) ? params.location : "all";
  const events = await getPublishedEvents(location);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Island nights, Happiness style."
        description="Happy hours, bingo, and midweek nights — filter by island."
        image="/images/experiences/events-nightlife.png"
        compact
      />
      <Section tone="foam">
        <Container className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {EVENT_LOCATIONS.map((filter) => {
              const href =
                filter.value === "all" ? "/events" : `/events?location=${filter.value}`;
              const active = location === filter.value;
              return (
                <Link
                  key={filter.value}
                  href={href}
                  className={cn(
                    "rounded-[var(--hp-radius-pill)] border px-4 py-2 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] transition-colors",
                    active
                      ? "border-hp-ink bg-hp-ink text-hp-foam"
                      : "border-hp-border text-hp-ink hover:border-hp-ink",
                  )}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>

          {events.length === 0 ? (
            <Text tone="muted">No events for this location yet. Check back soon.</Text>
          ) : (
            <div className="divide-y divide-hp-border border-y border-hp-border">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="grid gap-2 py-5 md:grid-cols-[1fr_1fr_1.2fr]"
                >
                  <Text as="p" variant="label" tone="lagoon">
                    {locationLabel(event.location)}
                  </Text>
                  <div>
                    <Text as="h2" variant="heading">
                      {event.title}
                    </Text>
                    <Text tone="muted">{event.venue}</Text>
                  </div>
                  <Text>{event.scheduleLabel}</Text>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
