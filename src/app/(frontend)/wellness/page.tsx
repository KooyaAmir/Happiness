import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Wellness",
  description: "Yoga, sound healing, ice baths, spa, and mindful rituals at Happiness.",
};

export default function WellnessPage() {
  return (
    <>
      <PageHero
        eyebrow="Wellness"
        title="Heart, mind, body, and soul."
        description="Beachfront yoga, sound healing, ice baths, sauna, workshops, and private spa therapies across our locations."
        image="/images/experiences/wellness-yoga.png"
      />
      <Section tone="foam">
        <Container className="max-w-3xl space-y-6">
          <Text tone="muted">
            Drop by any Happiness wellness space and enquire about daily offerings. Bookable wellness sessions can be added after the first content pass.
          </Text>
          <Button href="/contact">Ask about wellness</Button>
        </Container>
      </Section>
    </>
  );
}
