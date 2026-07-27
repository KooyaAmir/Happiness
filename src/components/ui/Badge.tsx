import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "foam" | "citrus" | "lagoon";
};

const tones = {
  foam: "border-white/40 text-hp-foam",
  citrus: "border-hp-citrus/50 text-hp-citrus",
  lagoon: "border-hp-lagoon/40 text-hp-lagoon",
};

export function Badge({ children, className, tone = "foam" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--hp-radius-pill)] border px-3 py-1 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
