import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getDestinationsWithTours, getPublishedTours } from "@/lib/tours";

type Props = {
  params: Promise<{ destination: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destination: slug } = await params;
  const destinations = await getDestinationsWithTours();
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return { title: "Tours" };
  return {
    title: `${destination.name} tours`,
    description: destination.summary || `Tours in ${destination.name}`,
  };
}

export default async function DestinationToursPage({ params }: Props) {
  const { destination: slug } = await params;
  const destinations = await getDestinationsWithTours();
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();

  const tours = await getPublishedTours({ destinationSlug: slug });

  return (
    <>
      <PageHero
        eyebrow="Tours"
        title={`${destination.name} trips`}
        description={destination.summary || `Explore tours and packages in ${destination.name}.`}
        image="/images/heroes/tours-hero.png"
        compact
      />
      <Section tone="foam">
        <Container className="space-y-8">
          {tours.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <ImageCard
                  key={tour.id}
                  href={`/tours/${slug}/${tour.slug}`}
                  image={tour.image || "/images/heroes/tours-hero.png"}
                  title={tour.title}
                  copy={
                    tour.priceOnEnquiry
                      ? `${tour.duration || "Flexible"} · Price on enquiry`
                      : `${tour.duration || "Flexible"} · from ₱${tour.priceFrom?.toLocaleString() || "—"}`
                  }
                />
              ))}
            </div>
          ) : (
            <Text tone="muted">No published tours for {destination.name} yet.</Text>
          )}
        </Container>
      </Section>
    </>
  );
}
