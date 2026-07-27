import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { featuredTours } from "@/content/site";

export const metadata: Metadata = {
  title: "Tours",
  description: "Tailor-made vacation packages and day tours across the Philippines.",
};

const destinations = [
  "El Nido",
  "Boracay",
  "Siargao",
  "Bohol",
  "Cebu",
  "Port Barton",
  "Coron",
  "Manila",
];

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel & tours"
        title="Tailor-made island adventures."
        description="Day tours, activities, and multi-day packages — enquire with our specialists. Full TREVL catalog migration comes next."
        image="/images/heroes/tours-hero.png"
      />

      <Section tone="foam">
        <Container className="space-y-6">
          <Text as="h2" variant="title">
            Destinations
          </Text>
          <div className="flex flex-wrap gap-2">
            {destinations.map((destination) => (
              <Button
                key={destination}
                href={`/tours/${destination.toLowerCase().replace(" ", "-")}`}
                variant="ghost"
                className="border border-hp-border text-hp-ink"
              >
                {destination}
              </Button>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text as="h2" variant="title">
              Popular trips
            </Text>
            <Text tone="muted">
              Enquiry-based booking for now — tell us dates and travellers, we handle the rest.
            </Text>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTours.map((tour) => (
              <ImageCard
                key={tour.slug}
                href={`/tours/${tour.destination.toLowerCase().replace(" ", "-")}/${tour.slug}`}
                image={tour.image}
                title={tour.title}
                copy={`${tour.duration} · from ${tour.from}`}
                meta={tour.destination}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
