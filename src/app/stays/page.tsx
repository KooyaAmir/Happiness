import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { locations } from "@/content/site";

export const metadata: Metadata = {
  title: "Stays",
  description: "Book Happiness hostels, villas, and resorts across Boracay, El Nido, and Siargao.",
};

export default function StaysPage() {
  return (
    <>
      <PageHero
        eyebrow="Stays"
        title="Sleep well. Live locally."
        description="Affordable luxury across three islands — dorms, private rooms, villas, and beach resorts."
        image="/images/stays/hostel-pool.png"
      />

      <Section tone="foam">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <Text as="h2" variant="title">
                Choose your island
              </Text>
              <Text tone="muted">
                Availability and rates come from Boom. Browse venues here, then book with live inventory.
              </Text>
            </div>
            <Button href="/book" variant="secondary">
              Check availability
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {locations.map((location) => (
              <ImageCard
                key={location.slug}
                href={`/stays/${location.slug}`}
                image={location.cardImage}
                title={location.name}
                copy={location.summary}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
