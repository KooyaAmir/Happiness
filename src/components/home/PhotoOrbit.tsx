"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PHOTOS = [
  {
    src: "/images/reference/27-boracay-24.jpg",
    label: "Boracay",
    x: 8,
    y: 18,
    w: 22,
    depth: 0.55,
    rotate: -6,
  },
  {
    src: "/images/locations/el-nido-lagoon.png",
    label: "El Nido",
    x: 38,
    y: 8,
    w: 28,
    depth: 0.9,
    rotate: 3,
  },
  {
    src: "/images/reference/11-iao-activity-2.jpg",
    label: "Siargao",
    x: 68,
    y: 22,
    w: 24,
    depth: 0.4,
    rotate: 7,
  },
  {
    src: "/images/experiences/surf-wave.png",
    label: "Surf",
    x: 14,
    y: 55,
    w: 20,
    depth: 0.7,
    rotate: 5,
  },
  {
    src: "/images/food/restaurant.png",
    label: "Food",
    x: 42,
    y: 52,
    w: 18,
    depth: 0.35,
    rotate: -4,
  },
  {
    src: "/images/experiences/wellness-yoga.png",
    label: "Wellness",
    x: 66,
    y: 58,
    w: 22,
    depth: 0.8,
    rotate: -8,
  },
];

/**
 * Floating photo constellation — the whole deck tilts with the mouse,
 * each frame drifts at a different depth. Feels like a living moodboard.
 */
export function PhotoOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-orbit-card]"),
    );
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let scrollFactor = 0;

    const paint = () => {
      raf = 0;
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;

      stage.style.transform = `perspective(1200px) rotateY(${mx * 7}deg) rotateX(${-my * 5}deg)`;

      cards.forEach((card) => {
        const depth = Number(card.dataset.depth || 0.5);
        const baseRotate = Number(card.dataset.rotate || 0);
        const x = mx * depth * 48;
        const y = my * depth * 36 + scrollFactor * depth * 40;
        card.style.transform = `translate3d(${x}px, ${y}px, ${depth * 80}px) rotate(${baseRotate + mx * depth * 4}deg)`;
      });

      if (Math.abs(tx - mx) > 0.001 || Math.abs(ty - my) > 0.001) {
        raf = requestAnimationFrame(paint);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const onScroll = () => {
      const rect = stage.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      scrollFactor = Math.max(-1, Math.min(1, mid / window.innerHeight));
      schedule();
    };

    schedule();
    stage.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section className="relative overflow-hidden bg-hp-ink py-[var(--hp-space-9)] text-hp-foam">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(15_92_102/0.35),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-[var(--hp-container)] px-[var(--hp-gutter)] text-center">
        <p className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus">
          Move through the islands
        </p>
        <h2 className="mt-3 font-display text-[length:var(--hp-text-3xl)] font-semibold leading-[var(--hp-leading-tight)] tracking-[var(--hp-tracking-display)]">
          A living moodboard.
        </h2>
        <p className="mx-auto mt-3 max-w-xl opacity-75">
          Memories from Boracay, El Nido, and Siargao — pinned above the water.
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative mx-auto mt-10 h-[min(72vh,40rem)] w-full max-w-[88rem] origin-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            data-orbit-card
            data-depth={photo.depth}
            data-rotate={photo.rotate}
            className="absolute overflow-hidden rounded-[var(--hp-radius-lg)] shadow-[var(--hp-shadow-soft)] will-change-transform"
            style={{
              left: `${photo.x}%`,
              top: `${photo.y}%`,
              width: `${photo.w}%`,
              aspectRatio: "4 / 5",
              transform: `rotate(${photo.rotate}deg)`,
            }}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              className="object-cover"
              sizes="30vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hp-ink/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-foam">
              {photo.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
