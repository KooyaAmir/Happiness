"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Text } from "@/components/ui/Text";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const islands = [
  {
    name: "Boracay",
    slug: "boracay",
    copy: "Beach life. Skate café. Island nights.",
    image: "/images/locations/boracay-white-beach.png",
  },
  {
    name: "El Nido",
    slug: "el-nido",
    copy: "Lagoons. Limestone. Boutique calm.",
    image: "/images/locations/el-nido-lagoon.png",
  },
  {
    name: "Siargao",
    slug: "siargao",
    copy: "Surf capital. Palm roads. Slow sunsets.",
    image: "/images/locations/siargao-palm-road.png",
  },
];

/**
 * Sticky scroll story: as you scroll through ~300vh, three island scenes
 * crossfade and their images drift at different speeds — unmistakable parallax.
 */
export function IslandCinematic() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!pin || !stage) return;

    const layers = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-island-layer]"),
    );
    const labels = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-island-label]"),
    );
    const progressBar = stage.querySelector<HTMLElement>("[data-progress]");
    const counter = stage.querySelector<HTMLElement>("[data-counter]");

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = pin.getBoundingClientRect();
      const total = pin.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;

      // Keep active index in 0..2 for the full scroll range.
      const segment = Math.min(progress * islands.length, islands.length - 0.001);
      const active = Math.min(islands.length - 1, Math.max(0, Math.round(segment)));
      const local = Math.min(1, Math.max(0, segment - Math.floor(segment)));

      layers.forEach((layer, index) => {
        const media = layer.querySelector<HTMLElement>("[data-media]");
        const distance = index - segment;
        const visibility = Math.max(0, 1 - Math.abs(distance) * 1.15);

        layer.style.opacity = String(visibility);
        layer.style.visibility = visibility > 0.02 ? "visible" : "hidden";

        if (media && !reduced) {
          // Far layers drift slower; active layer zooms slightly as you advance.
          const drift = distance * 90;
          const scale = 1.08 + local * 0.06 * (index === active ? 1 : 0);
          media.style.transform = `translate3d(0, ${drift}px, 0) scale(${scale})`;
        }
      });

      labels.forEach((label, index) => {
        const on = index === active;
        label.style.opacity = on ? "1" : "0.35";
        label.dataset.active = on ? "true" : "false";
      });

      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }
      if (counter) {
        counter.textContent = String(active + 1).padStart(2, "0");
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section ref={pinRef} className="relative h-[300vh] bg-hp-ink">
      <div
        ref={stageRef}
        className="sticky top-0 flex h-[100svh] overflow-hidden text-hp-foam"
      >
        {islands.map((island, index) => (
          <div
            key={island.slug}
            data-island-layer
            className="absolute inset-0"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <div
              data-media
              className="absolute -inset-[8%] will-change-transform"
              style={{ transform: "translate3d(0,0,0) scale(1.08)" }}
            >
              <Image
                src={island.image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/45 to-hp-ink/25" />

            <div className="relative z-10 flex h-full flex-col justify-end px-[var(--hp-gutter)] pb-16 pt-[calc(var(--hp-header-h)+2rem)] md:pb-20">
              <div className="mx-auto w-full max-w-[var(--hp-container)]">
                <p className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus">
                  Island {String(index + 1).padStart(2, "0")} of 03
                </p>
                <Text as="h2" variant="hero" tone="inverse" className="mt-3 max-w-3xl">
                  {island.name}
                </Text>
                <Text
                  variant="lede"
                  tone="inverse"
                  className="mt-4 max-w-xl opacity-85"
                >
                  {island.copy}
                </Text>
                <Link
                  href={`/stays/${island.slug}`}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus transition-opacity hover:opacity-80"
                >
                  Explore {island.name}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Side rail */}
        <div className="pointer-events-none absolute right-[var(--hp-gutter)] top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 md:flex">
          {islands.map((island) => (
            <div
              key={island.slug}
              data-island-label
              className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] transition-opacity duration-300"
            >
              {island.name}
            </div>
          ))}
        </div>

        {/* Progress + counter */}
        <div className="absolute inset-x-[var(--hp-gutter)] bottom-6 z-20 mx-auto flex max-w-[var(--hp-container)] items-end justify-between gap-6">
          <div className="h-px flex-1 overflow-hidden bg-hp-foam/20">
            <div
              data-progress
              className="h-full origin-left bg-hp-citrus transition-none will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <p className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-foam/70">
            <span data-counter>01</span>
            <span className="opacity-40"> / 03</span>
          </p>
        </div>
      </div>
    </section>
  );
}
