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
        <Container className="max-w-3xl space-y-6">
          <Text tone="muted">
            Full room types, rates, and live availability will connect through Boom.
            For now you can browse the venue story and jump into booking search.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Button href={`/book?location=${location.slug}`} size="lg">
              Check availability
            </Button>
            <Button href={`/stays/${location.slug}`} variant="ghost" className="text-hp-ink">
              Back to {location.name}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
