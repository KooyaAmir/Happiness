import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCard } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { experiences, locations } from "@/content/site";
import { getPublishedEvents, locationLabel } from "@/lib/events";
import { getOpenJobs, jobLocationLabel } from "@/lib/jobs";
import { getPublishedPosts, postCategoryLabel } from "@/lib/posts";
import { getPublishedTours } from "@/lib/tours";

export const dynamic = "force-dynamic";

const heroStats = [
  { value: "03", label: "Islands" },
  { value: "07", label: "Stays & venues" },
  { value: "40+", label: "Tours & packages" },
];

const marqueeItems = [
  "Boracay",
  "El Nido",
  "Siargao",
  "Stays",
  "Tours",
  "Food",
  "Wellness",
  "Surf",
];

function MarqueeBand() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  const track = (
    <div className="hp-marquee-track" aria-hidden>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center gap-6 pr-6 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus"
        >
          {item}
          <span className="text-hp-foam/40">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="hp-marquee border-y border-white/10 bg-hp-ink py-4">
      {track}
      {track}
    </div>
  );
}

export default async function Home() {
  const [featuredTours, posts, events, jobs] = await Promise.all([
    getPublishedTours({ limit: 4 }),
    getPublishedPosts(3),
    getPublishedEvents("all"),
    getOpenJobs(),
  ]);

  const featuredEvents = events.slice(0, 3);
  const featuredJobs = jobs.slice(0, 3);

  return (
    <>
      <div className="relative min-h-[100svh] overflow-hidden text-hp-foam">
        <div aria-hidden className="absolute inset-0 bg-hp-ink" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-70 hp-kenburns"
          style={{
            backgroundImage: "url('/images/heroes/home-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/55 to-hp-ink/25"
        />

        <Container className="relative flex min-h-[100svh] flex-col justify-end pb-12 pt-[calc(var(--hp-header-h)+2rem)] md:pb-16">
          <div className="max-w-3xl space-y-6">
            <Text as="p" variant="label" tone="citrus" className="hp-fade-up">
              Boracay · El Nido · Siargao
            </Text>
            <Text as="h1" variant="hero" tone="inverse" className="hp-fade-up hp-fade-up-delay-1">
              Island life, designed for joy.
            </Text>
            <Text
              variant="lede"
              tone="inverse"
              className="max-w-xl opacity-85 hp-fade-up hp-fade-up-delay-2"
            >
              Stays, tours, and soulful spaces across Boracay, El Nido, and
              Siargao — one brand, three islands, endless reasons to stay longer.
            </Text>
            <div className="flex flex-wrap gap-3 pt-2 hp-fade-up hp-fade-up-delay-3">
              <Button href="/book" size="lg">
                Book your stay
              </Button>
              <Button href="/tours" size="lg" variant="ghost" className="border-hp-foam text-hp-foam">
                Explore tours
              </Button>
            </div>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/20 pt-6 hp-fade-up hp-fade-up-delay-3">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[length:var(--hp-text-2xl)] leading-[var(--hp-leading-tight)] tracking-[var(--hp-tracking-display)]">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] opacity-70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <MarqueeBand />

      <Section tone="foam">
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between hp-reveal">
            <div className="max-w-2xl space-y-3">
              <Text as="p" variant="label" tone="lagoon">
                Our locations
              </Text>
              <Text as="h2" variant="display">
                Three islands. One Happiness.
              </Text>
              <Text tone="muted">
                Hostels, boutique stays, food, and experiences — each island with its own rhythm.
              </Text>
            </div>
            <Button href="/stays" variant="secondary">
              All stays
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {locations.map((location, index) => (
              <Link
                key={location.slug}
                href={`/stays/${location.slug}`}
                className="group relative block overflow-hidden rounded-[var(--hp-radius-lg)] hp-reveal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hp-focus)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={location.cardImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[var(--hp-duration-slow)] ease-[var(--hp-ease-out)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hp-ink/90 via-hp-ink/20 to-hp-ink/10" />
                  <span className="absolute left-5 top-5 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-foam/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-hp-foam">
                    <Text as="h3" variant="title" tone="inverse">
                      {location.name}
                    </Text>
                    <Text tone="inverse" className="opacity-80">
                      {location.tagline}
                    </Text>
                    <p className="pt-1 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus opacity-0 transition-opacity duration-[var(--hp-duration)] group-hover:opacity-100">
                      Explore {location.name} →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between hp-reveal">
            <div className="max-w-2xl space-y-3">
              <Text as="p" variant="label" tone="lagoon">
                Travel & tours
              </Text>
              <Text as="h2" variant="display">
                Adventures worth enquiring about.
              </Text>
            </div>
            <Button href="/tours" variant="secondary">
              View all tours
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTours.map((tour) => (
              <div key={tour.id} className="hp-reveal">
                <ImageCard
                  href={`/tours/${tour.destinationSlug}/${tour.slug}`}
                  image={tour.image || "/images/heroes/tours-hero.png"}
                  title={tour.title}
                  copy={
                    tour.priceOnEnquiry
                      ? `${tour.duration || "Flexible"} · Price on enquiry`
                      : `${tour.duration || "Flexible"} · from ₱${tour.priceFrom?.toLocaleString() || "—"}`
                  }
                  meta={tour.destinationName}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="space-y-10">
          <div className="max-w-2xl space-y-3 hp-reveal">
            <Text as="p" variant="label" tone="citrus">
              More Happiness
            </Text>
            <Text as="h2" variant="display" tone="inverse">
              Food, wellness, surf, and island days.
            </Text>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {experiences.map((item) => (
              <div key={item.href} className="hp-reveal">
                <ImageCard
                  href={item.href}
                  image={item.image}
                  title={item.title}
                  copy={item.copy}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {featuredEvents.length ? (
        <Section tone="foam">
          <Container className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between hp-reveal">
              <div className="max-w-2xl space-y-3">
                <Text as="p" variant="label" tone="lagoon">
                  Events
                </Text>
                <Text as="h2" variant="display">
                  Island nights this week.
                </Text>
              </div>
              <Button href="/events" variant="secondary">
                All events
              </Button>
            </div>
            <div className="divide-y divide-hp-border border-y border-hp-border hp-reveal">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="grid gap-2 py-5 md:grid-cols-[1fr_1.2fr_1fr]"
                >
                  <Text as="p" variant="label" tone="lagoon">
                    {locationLabel(event.location)}
                  </Text>
                  <div>
                    <Text as="h3" variant="heading">
                      {event.title}
                    </Text>
                    <Text tone="muted">{event.venue}</Text>
                  </div>
                  <Text>{event.scheduleLabel}</Text>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {posts.length ? (
        <Section tone="mist">
          <Container className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between hp-reveal">
              <div className="max-w-2xl space-y-3">
                <Text as="p" variant="label" tone="lagoon">
                  Journal
                </Text>
                <Text as="h2" variant="display">
                  Stories from the islands.
                </Text>
              </div>
              <Button href="/blog" variant="secondary">
                Read the journal
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block space-y-3 border-t border-hp-border pt-5 hp-reveal"
                >
                  <Text as="p" variant="label" tone="lagoon">
                    {postCategoryLabel(post.category)}
                  </Text>
                  <Text as="h3" variant="heading">
                    {post.title}
                  </Text>
                  <Text tone="muted">{post.excerpt}</Text>
                </a>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {featuredJobs.length ? (
        <Section tone="foam">
          <Container className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between hp-reveal">
              <div className="max-w-2xl space-y-3">
                <Text as="p" variant="label" tone="lagoon">
                  Careers
                </Text>
                <Text as="h2" variant="display">
                  Join the Happiness family.
                </Text>
              </div>
              <Button href="/careers" variant="secondary">
                Open roles
              </Button>
            </div>
            <div className="divide-y divide-hp-border border-y border-hp-border hp-reveal">
              {featuredJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <Text as="h3" variant="heading">
                      {job.title}
                    </Text>
                    <Text tone="muted">
                      {jobLocationLabel(job.location)} · {job.venue}
                    </Text>
                  </div>
                  <Button href={`/careers/${job.slug}`} size="sm">
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <section className="relative overflow-hidden text-hp-foam">
        <Image
          src="/images/locations/boracay-sunset.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hp-ink/60" />
        <Container className="relative flex min-h-[56svh] flex-col items-start justify-center gap-6 py-[var(--hp-space-10)]">
          <Text as="p" variant="label" tone="citrus" className="hp-reveal">
            Plan your trip
          </Text>
          <Text as="h2" variant="display" tone="inverse" className="max-w-2xl hp-reveal">
            Ready for island time?
          </Text>
          <Text variant="lede" tone="inverse" className="max-w-xl opacity-85 hp-reveal">
            Tell us where you want to wake up — our team on the ground will
            sort the rest, from beds to boats.
          </Text>
          <div className="flex flex-wrap gap-3 pt-2 hp-reveal">
            <Button href="/book" size="lg">
              Book your stay
            </Button>
            <Button
              href="/contact"
              size="lg"
              variant="ghost"
              className="border-hp-foam text-hp-foam"
            >
              Talk to us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
