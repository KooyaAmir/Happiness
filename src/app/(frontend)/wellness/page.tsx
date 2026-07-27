import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Wellness",
  description: "Yoga, sound healing, ice baths, spa, and mindful rituals at Happiness.",
};

type Props = {
  searchParams: Promise<{ lead?: string }>;
};

export default async function WellnessPage({ searchParams }: Props) {
  const { lead } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Wellness"
        title="Heart, mind, body, and soul."
        description="Beachfront yoga, sound healing, ice baths, sauna, workshops, and private spa therapies across our locations."
        image="/images/experiences/wellness-yoga.png"
      />
      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <Text tone="muted">
              Drop by any Happiness wellness space or send an enquiry about daily offerings,
              private sessions, and group rituals.
            </Text>
            <Button href="/events">See island events</Button>
          </div>

          <form
            className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6"
            action="/api/lead"
            method="post"
          >
            <Text as="h3" variant="heading">
              Enquire about wellness
            </Text>

            {lead === "sent" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-lagoon/30 bg-[color-mix(in_oklab,var(--hp-lagoon)_8%,white)] px-3 py-2 text-[length:var(--hp-text-sm)] text-hp-lagoon">
                Enquiry sent. We will follow up soon.
              </p>
            ) : null}
            {lead === "error" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-coral/40 bg-[color-mix(in_oklab,var(--hp-coral)_10%,white)] px-3 py-2 text-[length:var(--hp-text-sm)]">
                Something went wrong. Please try again or{" "}
                <Link href="/contact" className="underline">
                  contact us
                </Link>
                .
              </p>
            ) : null}

            <input type="hidden" name="source" value="wellness" />
            <input type="hidden" name="returnTo" value="/wellness" />
            <input type="hidden" name="subject" value="Wellness enquiry" />
            <label className="absolute left-[-10000px] h-px w-px overflow-hidden">
              Company website
              <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </label>

            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Full name
              </span>
              <input
                name="fullName"
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Phone
              </span>
              <input
                name="phone"
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <Button type="submit" className="w-full">
              Send enquiry
            </Button>
          </form>
        </Container>
      </Section>
    </>
  );
}
