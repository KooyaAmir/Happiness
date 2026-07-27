import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Happiness Philippines in Boracay, El Nido, and Siargao.",
};

type Props = {
  searchParams: Promise<{ contact?: string }>;
};

const contacts = [
  {
    location: "Boracay",
    lines: [
      "Bulabog Road, Brgy Balabag, Boracay",
      "boracayhostel@happinessphilippines.com",
      "+63 967 376 3265",
    ],
  },
  {
    location: "El Nido",
    lines: [
      "Serena St, Barangay Buena Suerte, El Nido",
      "elnidohostel@happinessphilippines.com",
      "+63 916 264 5952",
    ],
  },
  {
    location: "Siargao",
    lines: [
      "Tourism Road, Brgy Catangnan, Gen. Luna",
      "siargaohostel@happinessphilippines.com",
      "+63 966 026 4679",
    ],
  },
];

export default async function ContactPage({ searchParams }: Props) {
  const { contact } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let us know how we can help."
        description="Reach the right island team — or send a message and we will route it."
        image="/images/locations/boracay-white-beach.png"
        compact
      />
      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            {contacts.map((row) => (
              <div key={row.location} className="space-y-2 border-b border-hp-border pb-5">
                <Text as="h2" variant="heading">
                  {row.location}
                </Text>
                {row.lines.map((line) => (
                  <Text key={line} tone="muted">
                    {line}
                  </Text>
                ))}
              </div>
            ))}
          </div>
          <form
            className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6"
            action="/api/contact"
            method="post"
          >
            <Text as="h2" variant="heading">
              Send a message
            </Text>

            {contact === "sent" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-lagoon/30 bg-[color-mix(in_oklab,var(--hp-lagoon)_8%,white)] px-3 py-2 text-[length:var(--hp-text-sm)] text-hp-lagoon">
                Message sent. We will get back to you soon.
              </p>
            ) : null}
            {contact === "error" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-coral/40 bg-[color-mix(in_oklab,var(--hp-coral)_10%,white)] px-3 py-2 text-[length:var(--hp-text-sm)]">
                Something went wrong. Please try again or email the island team directly.
              </p>
            ) : null}

            <input type="hidden" name="returnTo" value="/contact" />
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
                Location
              </span>
              <select
                name="location"
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
                defaultValue="el-nido"
              >
                <option value="boracay">Boracay</option>
                <option value="el-nido">El Nido</option>
                <option value="siargao">Siargao</option>
                <option value="general">General</option>
              </select>
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
            <Button type="submit">Send message</Button>
            <Text tone="muted">
              Looking for a role? See{" "}
              <Link href="/careers" className="underline">
                careers
              </Link>
              .
            </Text>
          </form>
        </Container>
      </Section>
    </>
  );
}
