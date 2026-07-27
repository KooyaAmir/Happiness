import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { featuredTours } from "@/content/site";

type Props = {
  params: Promise<{ destination: string; slug: string }>;
};

export function generateStaticParams() {
  return featuredTours.map((tour) => ({
    destination: tour.destination.toLowerCase().replace(" ", "-"),
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = featuredTours.find((item) => item.slug === slug);
  if (!tour) return { title: "Tour" };
  return {
    title: tour.title,
    description: `${tour.title} in ${tour.destination}. Enquire with Happiness Philippines.`,
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = featuredTours.find((item) => item.slug === slug);
  if (!tour) notFound();

  return (
    <>
      <PageHero
        eyebrow={tour.destination}
        title={tour.title}
        description={`${tour.duration} · from ${tour.from}. Send an enquiry and our travel team will confirm details.`}
        image={tour.image}
        compact
      />
      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <Text as="h2" variant="title">
              Trip overview
            </Text>
            <Text tone="muted">
              Full itinerary, inclusions, and what-to-bring content will be migrated from the live TREVL catalog.
              This page is the new enquiry-ready template.
            </Text>
          </div>
          <form className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6">
            <Text as="h3" variant="heading">
              Enquire
            </Text>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Travellers
              </span>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Preferred date
              </span>
              <input type="date" className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2" />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Full name
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
                Phone / WhatsApp
              </span>
              <input required className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2" />
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
