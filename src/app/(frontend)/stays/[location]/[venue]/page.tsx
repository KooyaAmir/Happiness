import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getLocation, locations } from "@/content/site";

type Props = {
  params: Promise<{ location: string; venue: string }>;
};

export function generateStaticParams() {
  return locations.flatMap((location) =>
    location.venues.map((venue) => ({
      location: location.slug,
      venue: venue.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: locationSlug, venue: venueSlug } = await params;
  const location = getLocation(locationSlug);
  const venue = location?.venues.find((item) => item.slug === venueSlug);
  if (!venue) return { title: "Venue" };
  return {
    title: venue.name,
    description: venue.blurb,
  };
}

export default async function VenuePage({ params }: Props) {
  const { location: locationSlug, venue: venueSlug } = await params;
  const location = getLocation(locationSlug);
  const venue = location?.venues.find((item) => item.slug === venueSlug);
  if (!location || !venue) notFound();

  return (
    <>
      <PageHero
        eyebrow={location.name}
        title={venue.name}
        description={venue.blurb}
        image={venue.image}
        compact
      />
      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {venue.vibe ? (
              <div className="space-y-3">
                <Text as="h2" variant="title">
                  The vibe
                </Text>
                <Text tone="muted">{venue.vibe}</Text>
              </div>
            ) : null}

            {venue.amenities?.length ? (
              <div className="space-y-3">
                <Text as="h2" variant="heading">
                  Amenities
                </Text>
                <ul className="space-y-2">
                  {venue.amenities.map((item) => (
                    <li key={item} className="border-b border-hp-border pb-2">
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {venue.dining?.length ? (
              <div className="space-y-3">
                <Text as="h2" variant="heading">
                  Eat & drink on site
                </Text>
                <ul className="space-y-2">
                  {venue.dining.map((item) => (
                    <li key={item}>
                      <Text tone="muted">{item}</Text>
                    </li>
                  ))}
                </ul>
                <Button href="/food" variant="ghost" className="text-hp-ink">
                  Explore all food & drink
                </Button>
              </div>
            ) : null}

            <Text tone="muted">
              Live room types and rates connect through Boom once credentials are live.
              You can still search dates now and our team can help meanwhile.
            </Text>
          </div>

          <div className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6">
            <Text as="h3" variant="heading">
              Plan your stay
            </Text>
            <Button href={`/book?location=${location.slug}`} className="w-full" size="lg">
              Check availability
            </Button>
            <Button href="/contact" variant="secondary" className="w-full">
              Ask the island team
            </Button>
            <Button href={`/stays/${location.slug}`} variant="ghost" className="w-full text-hp-ink">
              Back to {location.name}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
