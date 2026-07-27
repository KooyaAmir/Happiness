import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function NotFound() {
  return (
    <Section tone="foam" className="pt-[calc(var(--hp-header-h)+3rem)]">
      <Container className="max-w-2xl space-y-6 py-20 text-center">
        <Text as="p" variant="label" tone="lagoon">
          404
        </Text>
        <Text as="h1" variant="display">
          This island doesn&apos;t exist.
        </Text>
        <Text tone="muted">
          The page you&apos;re looking for drifted away. Try the shore instead —
          stays, tours, and island nights are all still here.
        </Text>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button href="/">Back to home</Button>
          <Button href="/tours" variant="secondary">
            Explore tours
          </Button>
          <Button href="/contact" variant="ghost" className="text-hp-ink">
            Contact us
          </Button>
        </div>
        <Text variant="caption" tone="muted">
          Looking for something specific?{" "}
          <Link href="/blog" className="underline">
            Browse the journal
          </Link>
          .
        </Text>
      </Container>
    </Section>
  );
}
