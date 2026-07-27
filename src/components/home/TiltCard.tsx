"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const MAX_TILT_DEG = 9;

/**
 * Wraps a card in a perspective container that tilts toward the pointer,
 * with a moving light sheen. No-ops on touch devices and reduced motion.
 */
export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--tilt-x", `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
      el.style.setProperty("--sheen-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--sheen-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--sheen-o", "1");
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--sheen-o", "0");
  }, []);

  return (
    <div style={{ perspective: "900px" }} className={className}>
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={cn(
          "relative rounded-[var(--hp-radius-lg)] transition-transform duration-200 ease-out will-change-transform",
        )}
        style={{
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[var(--hp-radius-lg)] transition-opacity duration-300"
          style={{
            opacity: "var(--sheen-o, 0)",
            background:
              "radial-gradient(420px circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgb(255 255 255 / 0.16), transparent 55%)",
          }}
        />
      </div>
    </div>
  );
}
