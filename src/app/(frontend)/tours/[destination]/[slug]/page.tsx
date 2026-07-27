import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getTourBySlug } from "@/lib/tours";

type Props = {
  params: Promise<{ destination: string; slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour" };
  return {
    title: tour.title,
    description: tour.summary || `${tour.title} in ${tour.destinationName}.`,
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const priceLabel = tour.priceOnEnquiry
    ? "Price on enquiry"
    : tour.priceFrom
      ? `From ₱${tour.priceFrom.toLocaleString()}`
      : "Ask for pricing";

  return (
    <>
      <PageHero
        eyebrow={tour.destinationName}
        title={tour.title}
        description={`${tour.duration || "Flexible timing"} · ${priceLabel}. Send an enquiry and our travel team will confirm details.`}
        image={tour.image || "/images/heroes/tours-hero.png"}
        compact
      />
      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {tour.summary ? (
              <div className="space-y-3">
                <Text as="h2" variant="title">
                  Overview
                </Text>
                <Text tone="muted">{tour.summary}</Text>
              </div>
            ) : null}

            {tour.inclusions?.length ? (
              <div className="space-y-3">
                <Text as="h2" variant="heading">
                  Inclusions
                </Text>
                <ul className="space-y-2">
                  {tour.inclusions.map((row, index) => (
                    <li key={`${row?.item}-${index}`}>
                      <Text>{row?.item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tour.whatToBring?.length ? (
              <div className="space-y-3">
                <Text as="h2" variant="heading">
                  What to bring
                </Text>
                <ul className="space-y-2">
                  {tour.whatToBring.map((row, index) => (
                    <li key={`${row?.item}-${index}`}>
                      <Text>{row?.item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <form
            className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6"
            action="/api/tour-enquiry"
            method="post"
          >
            <Text as="h3" variant="heading">
              Enquire
            </Text>
            <input type="hidden" name="tourId" value={tour.id} />
            <input type="hidden" name="tourTitle" value={tour.title} />
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Travellers
              </span>
              <input
                name="travellers"
                type="number"
                min={1}
                defaultValue={1}
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Preferred date
              </span>
              <input
                name="preferredDate"
                type="date"
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
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
                Phone / WhatsApp
              </span>
              <input
                name="phone"
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
