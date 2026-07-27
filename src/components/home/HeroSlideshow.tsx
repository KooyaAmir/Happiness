"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

const SLIDE_MS = 6500;

const slides = [
  {
    name: "Boracay",
    tagline: "White Beach mornings, skate café afternoons, island nights.",
    image: "/images/reference/27-boracay-24.jpg",
  },
  {
    name: "El Nido",
    tagline: "Limestone cathedrals, hidden lagoons, boutique calm.",
    image: "/images/heroes/home-hero.png",
  },
  {
    name: "Siargao",
    tagline: "Palm roads, glassy waves, the slowest sunsets.",
    image: "/images/reference/11-iao-activity-2.jpg",
  },
];

const stats = [
  { value: 3, suffix: "", pad: 2, label: "Islands" },
  { value: 7, suffix: "", pad: 2, label: "Stays & venues" },
  { value: 40, suffix: "+", pad: 2, label: "Tours & packages" },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function CountUp({
  value,
  suffix,
  pad,
  start,
}: {
  value: number;
  suffix: string;
  pad: number;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value, reduced]);

  return (
    <>
      {String(display).padStart(pad, "0")}
      {suffix}
    </>
  );
}

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxTarget = useRef({ x: 0, y: 0 });
  const parallaxCurrent = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(
      () => setIndex((current) => (current + 1) % slides.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, reduced]);

  // Mouse parallax: background drifts with the pointer, content counter-drifts.
  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (reduced || event.pointerType !== "mouse") return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      parallaxTarget.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
      if (rafRef.current) return;
      const animate = () => {
        const target = parallaxTarget.current;
        const current = parallaxCurrent.current;
        current.x += (target.x - current.x) * 0.06;
        current.y += (target.y - current.y) * 0.06;
        const el = sectionRef.current;
        if (el) {
          el.style.setProperty("--hero-px", current.x.toFixed(4));
          el.style.setProperty("--hero-py", current.y.toFixed(4));
        }
        if (
          Math.abs(target.x - current.x) > 0.001 ||
          Math.abs(target.y - current.y) > 0.001
        ) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          rafRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    },
    [reduced],
  );

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const active = slides[index];

  return (
    <div
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative min-h-[100svh] overflow-hidden text-hp-foam"
      style={{ "--hero-px": 0, "--hero-py": 0 } as React.CSSProperties}
    >
      <div aria-hidden className="absolute inset-0 bg-hp-ink" />

      {/* Slides — oversized and driven by mouse parallax */}
      <div
        aria-hidden
        className="absolute -inset-[4%]"
        style={{
          transform:
            "translate3d(calc(var(--hero-px) * -14px), calc(var(--hero-py) * -10px), 0)",
        }}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.name}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--hp-ease-in-out)]",
              slideIndex === index ? "opacity-70" : "opacity-0",
            )}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={slideIndex === 0}
              className={cn(
                "object-cover",
                slideIndex === index && "hp-kenburns",
              )}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/55 to-hp-ink/25"
      />

      {/* Slide switcher */}
      <div className="absolute right-[var(--hp-gutter)] top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.name}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className={cn(
              "group flex items-center justify-end gap-3 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] transition-opacity",
              slideIndex === index ? "opacity-100" : "opacity-50 hover:opacity-80",
            )}
            aria-label={`Show ${slide.name}`}
          >
            <span>{slide.name}</span>
            <span className="relative h-px w-10 overflow-hidden bg-hp-foam/30">
              {slideIndex === index && !reduced ? (
                <span
                  key={index}
                  className="absolute inset-y-0 left-0 w-full origin-left bg-hp-citrus"
                  style={{ animation: `hp-progress ${SLIDE_MS}ms linear forwards` }}
                />
              ) : slideIndex === index ? (
                <span className="absolute inset-0 bg-hp-citrus" />
              ) : null}
            </span>
          </button>
        ))}
      </div>

      <Container
        className="relative flex min-h-[100svh] flex-col justify-end pb-12 pt-[calc(var(--hp-header-h)+2rem)] md:pb-16"
        style={{
          transform:
            "translate3d(calc(var(--hero-px) * 7px), calc(var(--hero-py) * 5px), 0)",
        }}
      >
        <div className="max-w-3xl space-y-6">
          <div className="hp-fade-up overflow-hidden">
            <Text
              key={active.name}
              as="p"
              variant="label"
              tone="citrus"
              className="hp-slide-in"
            >
              {String(index + 1).padStart(2, "0")} — {active.name}
            </Text>
          </div>
          <Text as="h1" variant="hero" tone="inverse" className="hp-fade-up hp-fade-up-delay-1">
            Island life, designed for joy.
          </Text>
          <div className="min-h-[3.5rem] overflow-hidden">
            <Text
              key={active.tagline}
              variant="lede"
              tone="inverse"
              className="max-w-xl opacity-85 hp-slide-in"
            >
              {active.tagline}
            </Text>
          </div>
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
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[length:var(--hp-text-2xl)] leading-[var(--hp-leading-tight)] tracking-[var(--hp-tracking-display)]">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  pad={stat.pad}
                  start={mounted}
                />
              </p>
              <p className="mt-1 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] opacity-70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
