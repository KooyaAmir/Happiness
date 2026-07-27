import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { featuredTours } from "@/content/site";

type Props = {
  params: Promise<{ destination: string }>;
};

const destinationMeta: Record<string, { name: string; image: string; copy: string }> = {
  "el-nido": {
    name: "El Nido",
    image: "/images/locations/el-nido-lagoon.png",
    copy: "Lagoons, limestone cliffs, and classic island tours.",
  },
  boracay: {
    name: "Boracay",
    image: "/images/locations/boracay-sunset.png",
    copy: "Sunset sails, ATVs, and beach adventures.",
  },
  siargao: {
    name: "Siargao",
    image: "/images/locations/siargao-palm-road.png",
    copy: "Island hopping, land tours, and surf-adjacent days.",
  },
};

export function generateStaticParams() {
  return Object.keys(destinationMeta).map((destination) => ({ destination }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destination } = await params;
  const meta = destinationMeta[destination];
  if (!meta) return { title: "Tours" };
  return {
    title: `${meta.name} tours`,
    description: meta.copy,
  };
}

export default async function DestinationToursPage({ params }: Props) {
  const { destination } = await params;
  const meta = destinationMeta[destination];
  if (!meta) notFound();

  const tours = featuredTours.filter(
    (tour) => tour.destination.toLowerCase().replace(" ", "-") === destination,
  );

  return (
    <>
      <PageHero
        eyebrow="Tours"
        title={`${meta.name} trips`}
        description={meta.copy}
        image={meta.image}
        compact
      />
      <Section tone="foam">
        <Container className="space-y-8">
          {tours.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <ImageCard
                  key={tour.slug}
                  href={`/tours/${destination}/${tour.slug}`}
                  image={tour.image}
                  title={tour.title}
                  copy={`${tour.duration} · from ${tour.from}`}
                />
              ))}
            </div>
          ) : (
            <Text tone="muted">
              Full destination catalog for {meta.name} will be migrated from TREVL next.
            </Text>
          )}
        </Container>
      </Section>
    </>
  );
}
