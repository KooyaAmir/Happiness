import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard, PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { locations } from "@/content/site";

export const metadata: Metadata = {
  title: "Our story",
  description: "How Happiness Philippines grew from food in 2007 to island hospitality.",
};

const milestones = [
  {
    year: "2007",
    title: "It starts with food",
    copy: "Happiness begins in kitchens — plates worth gathering around, long before the first bed.",
  },
  {
    year: "El Nido",
    title: "First island home",
    copy: "A hostel on Sirena Street, boutique villas, and a jungle resort in Corong Corong.",
  },
  {
    year: "Siargao",
    title: "Surf capital chapter",
    copy: "Goodies, HResto, BBar, a beach resort, and the surf retreat that became a signature.",
  },
  {
    year: "Boracay",
    title: "The biggest one yet",
    copy: "Our newest and largest location — pool, skate café, shop, restaurant, bar, and wellness space.",
  },
];

const pillars = [
  { title: "Stay", copy: "Hostels, boutique villas, and resorts built for connection." },
  { title: "Eat & drink", copy: "Cafés, restaurants, bars — the social heart of every location." },
  { title: "Do", copy: "Tours, packages, surf, and events across the islands." },
  { title: "Wellness", copy: "Yoga, sound healing, ice baths, and space to reset." },
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Not all bad experiences are negative."
        description="Born from starting anew — bonded through wanderlust — Happiness grew from food into stays, tours, shops, and wellness across three islands."
        image="/images/experiences/community.png"
      />

      <Section tone="foam">
        <Container className="max-w-3xl space-y-6">
          <Text as="h2" variant="title">
            Our mission
          </Text>
          <Text variant="lede">Spread happiness.</Text>
          <Text as="h2" variant="title">
            Our vision
          </Text>
          <Text tone="muted">
            Redefine hospitality for mindful modern travelers with affordable luxury boutique
            accommodation, meaningful connections, memorable experiences, and cultural immersion.
          </Text>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-8">
          <Text as="h2" variant="title">
            The journey
          </Text>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="space-y-3 border-t border-hp-border pt-5">
                <Text as="p" variant="label" tone="lagoon">
                  {milestone.year}
                </Text>
                <Text as="h3" variant="heading">
                  {milestone.title}
                </Text>
                <Text tone="muted">{milestone.copy}</Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="foam">
        <Container className="space-y-8">
          <Text as="h2" variant="title">
            What Happiness means today
          </Text>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="space-y-2 border-t border-hp-border pt-5">
                <Text as="h3" variant="heading">
                  {pillar.title}
                </Text>
                <Text tone="muted">{pillar.copy}</Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text as="p" variant="label" tone="citrus">
              Three islands
            </Text>
            <Text as="h2" variant="display" tone="inverse">
              Come find your island.
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
          <Button href="/contact" variant="secondary">
            Say hello
          </Button>
        </Container>
      </Section>
    </>
  );
}
