"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ParallaxMedia } from "@/components/home/ParallaxMedia";
import { TiltCard } from "@/components/home/TiltCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import type { Location } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export function LocationExperience({ location }: { location: Location }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const momentsPinRef = useRef<HTMLDivElement>(null);
  const momentsStageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Hero scroll + mouse parallax
  useEffect(() => {
    if (reduced) return;
    const hero = heroRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!hero || !media || !content) return;

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      raf = 0;
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;
      const sy = Math.max(0, -hero.getBoundingClientRect().top);
      media.style.transform = `translate3d(${mouseX * -42}px, ${sy * 0.42 + mouseY * -24}px, 0) scale(${1.16 + sy * 0.00018})`;
      content.style.transform = `translate3d(${mouseX * 18}px, ${-sy * 0.2 + mouseY * 10}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - sy / 480));
      if (Math.abs(targetX - mouseX) > 0.001 || Math.abs(targetY - mouseY) > 0.001) {
        raf = requestAnimationFrame(paint);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onScroll = () => schedule();
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    hero.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      hero.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  // Sticky moments scrubber
  useEffect(() => {
    const pin = momentsPinRef.current;
    const stage = momentsStageRef.current;
    if (!pin || !stage) return;

    const layers = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-moment-layer]"),
    );
    const progressBar = stage.querySelector<HTMLElement>("[data-moment-progress]");
    const counter = stage.querySelector<HTMLElement>("[data-moment-counter]");
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = pin.getBoundingClientRect();
      const total = pin.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;
      const count = location.moments.length;
      const segment = Math.min(progress * count, count - 0.001);
      const active = Math.min(count - 1, Math.max(0, Math.round(segment)));
      const local = Math.min(1, Math.max(0, segment - Math.floor(segment)));

      layers.forEach((layer, index) => {
        const media = layer.querySelector<HTMLElement>("[data-moment-media]");
        const distance = index - segment;
        const visibility = Math.max(0, 1 - Math.abs(distance) * 1.2);
        layer.style.opacity = String(visibility);
        layer.style.visibility = visibility > 0.02 ? "visible" : "hidden";
        if (media && !reduced) {
          media.style.transform = `translate3d(0, ${distance * 80}px, 0) scale(${1.1 + (index === active ? local * 0.05 : 0)})`;
        }
      });

      if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
      if (counter) {
        counter.textContent = String(active + 1).padStart(2, "0");
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.moments.length, reduced]);

  return (
    <>
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden text-hp-foam"
      >
        <div aria-hidden className="absolute inset-0 bg-hp-ink" />
        <div
          ref={mediaRef}
          aria-hidden
          className="absolute -inset-[12%] will-change-transform"
          style={{ transform: "translate3d(0,0,0) scale(1.16)" }}
        >
          <Image
            src={location.heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-80 hp-kenburns"
            sizes="120vw"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/50 to-hp-ink/20"
        />

        <div
          ref={contentRef}
          className="relative will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          <Container className="flex min-h-[100svh] flex-col justify-end pb-14 pt-[calc(var(--hp-header-h)+2rem)]">
            <div className="max-w-3xl space-y-5">
              <Text as="p" variant="label" tone="citrus" className="hp-fade-up">
                Stay · {location.name}
              </Text>
              <Text
                as="h1"
                variant="hero"
                tone="inverse"
                className="hp-fade-up hp-fade-up-delay-1"
              >
                {location.name}
              </Text>
              <Text
                variant="lede"
                tone="inverse"
                className="max-w-xl opacity-90 hp-fade-up hp-fade-up-delay-2"
              >
                {location.atmosphere}
              </Text>
              <div className="flex flex-wrap gap-3 pt-2 hp-fade-up hp-fade-up-delay-3">
                <Button href={`/book?location=${location.slug}`} size="lg">
                  Book your stay
                </Button>
                <Button
                  href={`/tours/${location.slug}`}
                  size="lg"
                  variant="ghost"
                  className="border-hp-foam text-hp-foam"
                >
                  Explore tours
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center">
          <div className="flex flex-col items-center gap-2 opacity-70">
            <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-foam">
              Enter {location.name}
            </span>
            <span className="hp-scroll-cue block h-8 w-px bg-gradient-to-b from-hp-citrus to-transparent" />
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="bg-hp-foam py-[var(--hp-space-9)]">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-5">
            <Text as="p" variant="label" tone="lagoon" className="hp-reveal">
              The island
            </Text>
            <div className="hp-mask">
              <Text as="h2" variant="display" className="hp-mask-reveal">
                {location.tagline}
              </Text>
            </div>
            <Text tone="muted" className="max-w-2xl hp-reveal">
              {location.summary}
            </Text>
            <ul className="grid gap-3 sm:grid-cols-2 hp-reveal">
              {location.highlights.map((item) => (
                <li
                  key={item}
                  className="border-t border-hp-border pt-3 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-lagoon"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--hp-radius-lg)] hp-reveal">
            <ParallaxMedia speed={0.3}>
              <Image
                src={location.cardImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </ParallaxMedia>
          </div>
        </Container>
      </section>

      {/* Sticky moments */}
      <section
        ref={momentsPinRef}
        className="relative bg-hp-ink"
        style={{ height: `${location.moments.length * 100}vh` }}
      >
        <div
          ref={momentsStageRef}
          className="sticky top-0 flex h-[100svh] overflow-hidden text-hp-foam"
        >
          {location.moments.map((moment, index) => (
            <div
              key={moment.title}
              data-moment-layer
              className="absolute inset-0"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <div
                data-moment-media
                className="absolute -inset-[8%] will-change-transform"
                style={{ transform: "translate3d(0,0,0) scale(1.1)" }}
              >
                <Image
                  src={moment.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/45 to-hp-ink/20" />
              <Container className="relative z-10 flex h-full flex-col justify-end pb-16 pt-[calc(var(--hp-header-h)+2rem)]">
                <p className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus">
                  Moment {String(index + 1).padStart(2, "0")} of{" "}
                  {String(location.moments.length).padStart(2, "0")}
                </p>
                <Text as="h2" variant="display" tone="inverse" className="mt-3 max-w-3xl">
                  {moment.title}
                </Text>
                <Text variant="lede" tone="inverse" className="mt-4 max-w-xl opacity-85">
                  {moment.copy}
                </Text>
              </Container>
            </div>
          ))}

          <div className="absolute inset-x-[var(--hp-gutter)] bottom-6 z-20 mx-auto flex max-w-[var(--hp-container)] items-end justify-between gap-6">
            <div className="h-px flex-1 overflow-hidden bg-hp-foam/20">
              <div
                data-moment-progress
                className="h-full origin-left bg-hp-citrus will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <p className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-foam/70">
              <span data-moment-counter>01</span>
              <span className="opacity-40">
                {" "}
                / {String(location.moments.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Stays */}
      <section className="bg-hp-mist py-[var(--hp-space-9)]">
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <Text as="p" variant="label" tone="lagoon" className="hp-reveal">
                Where to sleep
              </Text>
              <div className="hp-mask">
                <Text as="h2" variant="display" className="hp-mask-reveal">
                  Our stays in {location.name}
                </Text>
              </div>
            </div>
            <Button href={`/book?location=${location.slug}`} variant="secondary">
              Check availability
            </Button>
          </div>

          <div
            className={cn(
              "grid gap-5",
              location.venues.length === 1
                ? "md:grid-cols-1 md:max-w-2xl"
                : location.venues.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-2 xl:grid-cols-3",
            )}
          >
            {location.venues.map((venue, index) => (
              <TiltCard key={venue.slug} className="hp-reveal">
                <Link
                  href={`/stays/${location.slug}/${venue.slug}`}
                  className="group relative block overflow-hidden rounded-[var(--hp-radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hp-focus)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ParallaxMedia speed={0.2 + index * 0.05}>
                      <Image
                        src={venue.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </ParallaxMedia>
                    <div className="absolute inset-0 bg-gradient-to-t from-hp-ink/90 via-hp-ink/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-hp-foam">
                      <Text as="h3" variant="heading" tone="inverse">
                        {venue.name}
                      </Text>
                      <Text tone="inverse" className="opacity-80">
                        {venue.blurb}
                      </Text>
                      {venue.vibe ? (
                        <p className="pt-1 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus">
                          {venue.vibe}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery strip */}
      <section className="overflow-hidden bg-hp-ink py-[var(--hp-space-8)] text-hp-foam">
        <Container className="mb-8">
          <Text as="p" variant="label" tone="citrus" className="hp-reveal">
            Gallery
          </Text>
          <div className="hp-mask mt-3">
            <Text as="h2" variant="display" tone="inverse" className="hp-mask-reveal">
              Feel {location.name}
            </Text>
          </div>
        </Container>
        <div className="hp-marquee">
          <div className="hp-marquee-track gap-4 pr-4" aria-hidden>
            {[...location.gallery, ...location.gallery].map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative h-56 w-72 shrink-0 overflow-hidden rounded-[var(--hp-radius-lg)] md:h-72 md:w-96"
              >
                <Image src={src} alt="" fill className="object-cover" sizes="384px" />
              </div>
            ))}
          </div>
          <div className="hp-marquee-track gap-4 pr-4" aria-hidden>
            {[...location.gallery, ...location.gallery].map((src, index) => (
              <div
                key={`${src}-b-${index}`}
                className="relative h-56 w-72 shrink-0 overflow-hidden rounded-[var(--hp-radius-lg)] md:h-72 md:w-96"
              >
                <Image src={src} alt="" fill className="object-cover" sizes="384px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food + CTA */}
      <section className="bg-hp-foam py-[var(--hp-space-9)]">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 hp-reveal">
            <Text as="p" variant="label" tone="lagoon">
              Eat & drink
            </Text>
            <Text as="h2" variant="display">
              The social heart of {location.name}
            </Text>
            {location.foodScene ? (
              <Text tone="muted">{location.foodScene}</Text>
            ) : null}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/food">See food & drink</Button>
              <Button href={`/events?location=${location.slug}`} variant="secondary">
                Island events
              </Button>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--hp-radius-lg)] hp-reveal">
            <ParallaxMedia speed={0.25}>
              <Image
                src={location.moments[1]?.image || location.cardImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ParallaxMedia>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden text-hp-foam">
        <Image
          src={location.heroImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hp-ink/65" />
        <Container className="relative flex min-h-[52svh] flex-col items-start justify-center gap-6 py-[var(--hp-space-10)]">
          <Text as="p" variant="label" tone="citrus" className="hp-reveal">
            Ready for {location.name}?
          </Text>
          <div className="hp-mask max-w-2xl">
            <Text as="h2" variant="display" tone="inverse" className="hp-mask-reveal">
              Wake up here.
            </Text>
          </div>
          <Text variant="lede" tone="inverse" className="max-w-xl opacity-85 hp-reveal">
            Tell us your dates — we’ll lock the stay and help plan the rest of the island.
          </Text>
          <div className="flex flex-wrap gap-3 pt-2 hp-reveal">
            <Button href={`/book?location=${location.slug}`} size="lg">
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
