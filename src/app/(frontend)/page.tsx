import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { experiences, locations } from "@/content/site";
import { getPublishedTours } from "@/lib/tours";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredTours = await getPublishedTours({ limit: 4 });
  return (
    <>
      <div className="relative min-h-[100svh] overflow-hidden text-hp-foam">
        <div aria-hidden className="absolute inset-0 bg-hp-ink" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-70 hp-kenburns"
          style={{
            backgroundImage: "url('/images/heroes/home-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/55 to-hp-ink/25"
        />

        <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-[calc(var(--hp-header-h)+2rem)] md:pb-20">
          <div className="max-w-3xl space-y-6">
            <Text as="p" variant="label" tone="citrus" className="hp-fade-up">
              Happiness Philippines
            </Text>
            <Text as="h1" variant="hero" tone="inverse" className="hp-fade-up hp-fade-up-delay-1">
              Island life, designed for joy.
            </Text>
            <Text
              variant="lede"
              tone="inverse"
              className="max-w-xl opacity-85 hp-fade-up hp-fade-up-delay-2"
            >
              Stays, tours, and soulful spaces across Boracay, El Nido, and
              Siargao — one brand, three islands, endless reasons to stay longer.
            </Text>
            <div className="flex flex-wrap gap-3 pt-2 hp-fade-up hp-fade-up-delay-3">
              <Button href="/book" size="lg">
                Book your stay
              </Button>
              <Button href="/tours" size="lg" variant="ghost" className="border-hp-foam text-hp-foam">
                Explore tours
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Section tone="foam">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text as="p" variant="label" tone="lagoon">
              Our locations
            </Text>
            <Text as="h2" variant="display">
              Three islands. One Happiness.
            </Text>
            <Text tone="muted">
              Hostels, boutique stays, food, and experiences — each island with its own rhythm.
            </Text>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {locations.map((location) => (
              <ImageCard
                key={location.slug}
                href={`/stays/${location.slug}`}
                image={location.cardImage}
                title={location.name}
                copy={location.tagline}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <Text as="p" variant="label" tone="lagoon">
                Travel & tours
              </Text>
              <Text as="h2" variant="display">
                Adventures worth enquiring about.
              </Text>
            </div>
            <Button href="/tours" variant="secondary">
              View all tours
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTours.map((tour) => (
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

      <Section tone="ink">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text as="p" variant="label" tone="citrus">
              More Happiness
            </Text>
            <Text as="h2" variant="display" tone="inverse">
              Wellness, surf, and island nights.
            </Text>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {experiences.map((item) => (
              <ImageCard
                key={item.href}
                href={item.href}
                image={item.image}
                title={item.title}
                copy={item.copy}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
