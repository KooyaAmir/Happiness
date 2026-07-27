"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Giant masked wordmark — the letters are cut from a living island image
 * that pans as you scroll. Pure typography-as-window wow.
 */
export function HappinessMask() {
  const pinRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const pin = pinRef.current;
    const word = wordRef.current;
    const sub = subRef.current;
    if (!pin || !word) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = pin.getBoundingClientRect();
      const total = pin.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;

      // Pan the image inside the letterforms.
      const pos = 20 + progress * 60;
      word.style.backgroundPosition = `${50 + progress * 20}% ${pos}%`;

      if (!reduced) {
        word.style.letterSpacing = `${-0.04 + progress * 0.08}em`;
        word.style.transform = `scale(${1 + progress * 0.12})`;
      }

      if (sub) {
        sub.style.opacity = String(Math.min(1, Math.max(0, (progress - 0.15) * 2.2)));
        sub.style.transform = `translateY(${(1 - Math.min(1, Math.max(0, (progress - 0.15) * 2.2))) * 24}px)`;
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
  }, [reduced]);

  return (
    <section ref={pinRef} className="relative h-[220vh] bg-hp-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-[var(--hp-gutter)] text-center">
        <p className="mb-6 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-hp-citrus">
          One word. Three islands.
        </p>
        <h2
          ref={wordRef}
          className="hp-mask-word w-full max-w-[96vw] select-none font-display text-[clamp(3.25rem,14vw,11rem)] font-extrabold leading-[0.85] tracking-[-0.05em]"
          style={{
            backgroundImage: "url('/images/heroes/home-hero.png')",
            backgroundSize: "160% 160%",
            backgroundPosition: "50% 20%",
            backgroundRepeat: "no-repeat",
          }}
        >
          HAPPINESS
        </h2>
        <p
          ref={subRef}
          className="mt-8 max-w-md font-body text-[length:var(--hp-text-lg)] text-hp-foam/80 opacity-0"
          style={{ transform: "translateY(24px)" }}
        >
          Three islands. One feeling.
        </p>
      </div>
    </section>
  );
}
