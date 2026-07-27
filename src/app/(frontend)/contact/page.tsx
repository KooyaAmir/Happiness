import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Happiness Philippines in Boracay, El Nido, and Siargao.",
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

export default function ContactPage() {
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
            {contacts.map((contact) => (
              <div key={contact.location} className="space-y-2 border-b border-hp-border pb-5">
                <Text as="h2" variant="heading">
                  {contact.location}
                </Text>
                {contact.lines.map((line) => (
                  <Text key={line} tone="muted">
                    {line}
                  </Text>
                ))}
              </div>
            ))}
          </div>
          <form className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6">
            <Text as="h2" variant="heading">
              Send a message
            </Text>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                First name
              </span>
              <input required className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2" />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Email
              </span>
              <input type="email" required className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2" />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Location
              </span>
              <select className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2">
                <option>El Nido</option>
                <option>Siargao</option>
                <option>Boracay</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Message
              </span>
              <textarea rows={4} className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2" />
            </label>
            <Button type="submit">Send message</Button>
          </form>
        </Container>
      </Section>
    </>
  );
}
