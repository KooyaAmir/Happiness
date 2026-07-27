import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getDestinationsWithTours, getPublishedTours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Tours",
  description: "Tailor-made vacation packages and day tours across the Philippines.",
};

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const [destinations, tours] = await Promise.all([
    getDestinationsWithTours(),
    getPublishedTours({ limit: 100 }),
  ]);

  const packages = tours.filter((tour) => tour.kind === "vacation-package");
  const dayTours = tours.filter((tour) => tour.kind !== "vacation-package");

  return (
    <>
      <PageHero
        eyebrow="Travel & tours"
        title="Tailor-made island adventures."
        description="Day tours, activities, and multi-day packages across the Philippines — enquire with our specialists."
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
                key={destination.slug}
                href={`/tours/${destination.slug}`}
                variant="ghost"
                className="border border-hp-border text-hp-ink"
              >
                {destination.name}
                {destination.count ? ` (${destination.count})` : ""}
              </Button>
            ))}
          </div>
        </Container>
      </Section>

      {packages.length ? (
        <Section tone="foam">
          <Container className="space-y-8">
            <div className="max-w-2xl space-y-3">
              <Text as="h2" variant="title">
                Vacation packages
              </Text>
              <Text tone="muted">
                Multi-day trips shaped around your dates — enquiry only for now.
              </Text>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((tour) => (
                <ImageCard
                  key={tour.id}
                  href={`/tours/${tour.destinationSlug}/${tour.slug}`}
                  image={tour.image || "/images/heroes/tours-hero.png"}
                  title={tour.title}
                  copy={
                    tour.priceOnEnquiry
                      ? `${tour.duration || "Flexible"} · Price on enquiry`
                      : `${tour.duration || "Flexible"} · from ₱${tour.priceFrom?.toLocaleString() || "—"}`
                  }
                  meta={`Package · ${tour.destinationName}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="mist">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text as="h2" variant="title">
              Day tours & activities
            </Text>
            <Text tone="muted">
              {dayTours.length
                ? `${dayTours.length} tours in the dashboard. Enquiry-based booking for now.`
                : "Run npm run seed:tours to migrate the live catalog into Payload."}
            </Text>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dayTours.map((tour) => (
              <ImageCard
                key={tour.id}
                href={`/tours/${tour.destinationSlug}/${tour.slug}`}
                image={tour.image || "/images/heroes/tours-hero.png"}
                title={tour.title}
                copy={
                  tour.priceOnEnquiry
                    ? `${tour.duration || "Flexible"} · Price on enquiry`
                    : `${tour.duration || "Flexible"} · from ₱${tour.priceFrom?.toLocaleString() || "—"}`
                }
                meta={tour.destinationName}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
