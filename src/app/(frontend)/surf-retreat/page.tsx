import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Surf retreat",
  description: "Siargao surf retreats with coaching, recovery, and island life.",
};

export default function SurfRetreatPage() {
  return (
    <>
      <PageHero
        eyebrow="Surf retreat"
        title="Come for the surf. Stay for the feeling."
        description="Zero-to-hero coaching, recovery rituals, and island community in Siargao. Lead-gen for now — deep design polish continues."
        image="/images/experiences/surf-wave.png"
      />
      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <Text as="h2" variant="title">
              A surf week you will never forget
            </Text>
            <Text tone="muted">
              Daily coaching, video analysis, wellness recovery, and curated island moments.
              Tell us your dates and we will follow up.
            </Text>
          </div>
          <form className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6">
            <Text as="h3" variant="heading">
              Save your spot
            </Text>
            {["Name", "Phone (WhatsApp)", "Country", "Start date"].map((label) => (
              <label key={label} className="block space-y-2">
                <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                  {label}
                </span>
                <input
                  type={label.includes("date") ? "date" : "text"}
                  required
                  className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
                />
              </label>
            ))}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Container>
      </Section>
    </>
  );
}
