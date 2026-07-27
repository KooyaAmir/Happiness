import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getLocation, locations } from "@/content/site";

type Props = {
  params: Promise<{ location: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ location: location.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) return { title: "Stay" };
  return {
    title: `${location.name} stays`,
    description: location.summary,
  };
}

export default async function LocationStayPage({ params }: Props) {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return (
    <>
      <PageHero
        eyebrow={location.name}
        title={location.tagline}
        description={location.summary}
        image={location.heroImage}
      />

      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Text as="h2" variant="title">
              Why stay with Happiness
            </Text>
            <ul className="space-y-3">
              {location.highlights.map((item) => (
                <li key={item} className="border-b border-hp-border pb-3">
                  <Text>{item}</Text>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href={`/book?location=${location.slug}`} size="lg">
                Book your stay
              </Button>
              <Button href="/tours" variant="ghost" className="text-hp-ink">
                Explore tours
              </Button>
            </div>
          </div>
          <div
            className="min-h-80 rounded-[var(--hp-radius-lg)] bg-cover bg-center"
            style={{ backgroundImage: `url('${location.cardImage}')` }}
          />
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-8">
          <Text as="h2" variant="title">
            Our stays in {location.name}
          </Text>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {location.venues.map((venue) => (
              <ImageCard
                key={venue.slug}
                href={`/stays/${location.slug}/${venue.slug}`}
                image={venue.image}
                title={venue.name}
                copy={venue.blurb}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
