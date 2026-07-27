import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { locations } from "@/content/site";

const intents = [
  {
    href: "/book",
    label: "Book a stay",
    copy: "Hostels, villas, and resorts — check dates and reserve.",
  },
  {
    href: "/tours",
    label: "Plan a tour",
    copy: "Day trips and vacation packages across the Philippines.",
  },
  {
    href: "/surf-retreat",
    label: "Surf retreat",
    copy: "Zero-to-hero surf weeks based in Siargao.",
  },
  {
    href: "/food",
    label: "Eat & drink",
    copy: "Cafés, restaurants, bars, and island happy hours.",
  },
];

/**
 * Practical homepage gateway: choose an intent or an island, then go deeper.
 */
export function TripStarter() {
  return (
    <section className="bg-hp-foam py-[var(--hp-space-9)]">
      <Container className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <Text as="p" variant="label" tone="lagoon">
            Start here
          </Text>
          <Text as="h2" variant="display">
            What do you want to do?
          </Text>
          <Text tone="muted">
            Pick a path — we’ll take you straight to booking, tours, or the right island.
          </Text>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {intents.map((intent, index) => (
            <Link
              key={intent.href}
              href={intent.href}
              className="group flex flex-col justify-between border-t border-hp-border pt-5 transition-colors hover:border-hp-lagoon"
            >
              <div className="space-y-3">
                <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-lagoon">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Text as="h3" variant="heading">
                  {intent.label}
                </Text>
                <Text tone="muted">{intent.copy}</Text>
              </div>
              <span className="mt-6 inline-flex font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-ink transition-transform group-hover:translate-x-1">
                Go →
              </span>
            </Link>
          ))}
        </div>

        <div className="space-y-6 border-t border-hp-border pt-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-2">
              <Text as="p" variant="label" tone="lagoon">
                Or choose an island
              </Text>
              <Text as="h3" variant="title">
                Where will you wake up?
              </Text>
            </div>
            <Button href="/stays" variant="secondary">
              All stays
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {locations.map((location) => (
              <article
                key={location.slug}
                className="overflow-hidden rounded-[var(--hp-radius-lg)] border border-hp-border bg-white"
              >
                <Link
                  href={`/stays/${location.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={location.cardImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[var(--hp-duration-slow)] ease-[var(--hp-ease-out)] hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>
                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    <Text as="h3" variant="heading">
                      {location.name}
                    </Text>
                    <Text tone="muted">{location.atmosphere}</Text>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button href={`/stays/${location.slug}`} size="sm">
                      View stays
                    </Button>
                    <Button
                      href={`/tours/${location.slug}`}
                      size="sm"
                      variant="ghost"
                      className="text-hp-ink"
                    >
                      Island tours
                    </Button>
                    <Button
                      href={`/book?location=${location.slug}`}
                      size="sm"
                      variant="secondary"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
