"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Scroll-driven vertical drift for child media. Speed 0.2–0.5 feels natural.
 */
export function ParallaxMedia({
  children,
  className,
  speed = 0.28,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (center - viewCenter) * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.18)`;
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
  }, [reduced, speed]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        ref={ref}
        className="absolute -inset-[12%] will-change-transform"
        style={{ transform: "translate3d(0,0,0) scale(1.18)" }}
      >
        {children}
      </div>
    </div>
  );
}
