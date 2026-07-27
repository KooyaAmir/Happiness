import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Our story",
  description: "How Happiness Philippines grew from food in 2007 to island hospitality.",
};

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
          <Text>Spread happiness.</Text>
          <Text as="h2" variant="title">
            Our vision
          </Text>
          <Text tone="muted">
            Redefine hospitality for mindful modern travelers with affordable luxury boutique
            accommodation, meaningful connections, memorable experiences, and cultural immersion.
          </Text>
        </Container>
      </Section>
    </>
  );
}
