import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParallaxMedia } from "@/components/home/ParallaxMedia";
import { TiltCard } from "@/components/home/TiltCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { locations } from "@/content/site";

export const metadata: Metadata = {
  title: "Stays",
  description:
    "Book Happiness hostels, villas, and resorts across Boracay, El Nido, and Siargao.",
};

export default function StaysPage() {
  return (
    <>
      <PageHero
        eyebrow="Stays"
        title="Sleep well. Live locally."
        description="Affordable luxury across three islands — dorms, private rooms, villas, and beach resorts."
        image="/images/stays/hostel-pool.png"
      />

      <Section tone="foam">
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <Text as="p" variant="label" tone="lagoon" className="hp-reveal">
                Choose your island
              </Text>
              <div className="hp-mask">
                <Text as="h2" variant="display" className="hp-mask-reveal">
                  Three bases. One Happiness.
                </Text>
              </div>
              <Text tone="muted" className="hp-reveal">
                Browse venues here, then book with live inventory when Boom is connected.
              </Text>
            </div>
            <Button href="/book" variant="secondary">
              Check availability
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {locations.map((location, index) => (
              <TiltCard key={location.slug} className="hp-reveal">
                <Link
                  href={`/stays/${location.slug}`}
                  className="group relative block overflow-hidden rounded-[var(--hp-radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hp-focus)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <ParallaxMedia speed={0.22 + index * 0.05}>
                      <Image
                        src={location.cardImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </ParallaxMedia>
                    <div className="absolute inset-0 bg-gradient-to-t from-hp-ink/90 via-hp-ink/20 to-hp-ink/10" />
                    <span className="absolute left-5 top-5 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-foam/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-hp-foam">
                      <Text as="h3" variant="title" tone="inverse">
                        {location.name}
                      </Text>
                      <Text tone="inverse" className="opacity-85">
                        {location.atmosphere}
                      </Text>
                      <p className="pt-1 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus opacity-0 transition-opacity duration-[var(--hp-duration)] group-hover:opacity-100">
                        Enter {location.name} →
                      </p>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
