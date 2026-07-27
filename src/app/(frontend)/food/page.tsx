import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { foodVenues, locations } from "@/content/site";

export const metadata: Metadata = {
  title: "Eat & drink",
  description:
    "Cafés, restaurants, bars, and happy hours across Happiness Boracay, El Nido, and Siargao.",
};

export default function FoodPage() {
  return (
    <>
      <PageHero
        eyebrow="Eat & drink"
        title="Food is where Happiness started."
        description="Cafés, restaurants, bars, and island happy hours — the social heart of every Happiness location."
        image="/images/food/happiness-dining.png"
      />

      <Section tone="foam">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text as="h2" variant="title">
              Signature spots
            </Text>
            <Text tone="muted">
              From skate-café mornings to beach-bar nights — eat where the community gathers.
            </Text>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {foodVenues.map((venue) => (
              <ImageCard
                key={`${venue.location}-${venue.name}`}
                href={`/stays/${venue.location.toLowerCase().replace(/\s+/g, "-")}`}
                image={venue.image}
                title={venue.name}
                copy={venue.copy}
                meta={venue.location}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-8">
          <Text as="h2" variant="title">
            By island
          </Text>
          <div className="grid gap-6 md:grid-cols-3">
            {locations.map((location) => (
              <div key={location.slug} className="space-y-3 border-t border-hp-border pt-5">
                <Text as="h3" variant="heading">
                  {location.name}
                </Text>
                <Text tone="muted">{location.foodScene}</Text>
                <Button href={`/stays/${location.slug}`} variant="ghost" className="text-hp-ink">
                  Explore {location.name}
                </Button>
              </div>
            ))}
          </div>
          <Button href="/events">See food & drink events</Button>
        </Container>
      </Section>
    </>
  );
}
