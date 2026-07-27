import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Surf retreat",
  description: "Siargao surf retreats with coaching, recovery, and island life.",
};

type Props = {
  searchParams: Promise<{ enquiry?: string }>;
};

export default async function SurfRetreatPage({ searchParams }: Props) {
  const { enquiry } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Surf retreat"
        title="Come for the surf. Stay for the feeling."
        description="Zero-to-hero coaching, recovery rituals, and island community in Siargao."
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
          <form
            className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6"
            action="/api/surf-enquiry"
            method="post"
          >
            <Text as="h3" variant="heading">
              Save your spot
            </Text>

            {enquiry === "sent" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-lagoon/30 bg-[color-mix(in_oklab,var(--hp-lagoon)_8%,white)] px-3 py-2 text-[length:var(--hp-text-sm)] text-hp-lagoon">
                Enquiry sent. Our surf team will follow up on WhatsApp or email.
              </p>
            ) : null}
            {enquiry === "error" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-coral/40 bg-[color-mix(in_oklab,var(--hp-coral)_10%,white)] px-3 py-2 text-[length:var(--hp-text-sm)]">
                Something went wrong. Please try again or{" "}
                <Link href="/contact" className="underline">
                  contact us
                </Link>
                .
              </p>
            ) : null}

            <input type="hidden" name="returnTo" value="/surf-retreat" />
            <label className="absolute left-[-10000px] h-px w-px overflow-hidden">
              Company website
              <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </label>

            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Name
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
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Phone (WhatsApp)
              </span>
              <input
                name="phone"
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Country
              </span>
              <input
                name="country"
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Start date
              </span>
              <input
                name="startDate"
                type="date"
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Notes
              </span>
              <textarea
                name="message"
                rows={3}
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Container>
      </Section>
    </>
  );
}
