import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "foam" | "ink" | "mist" | "transparent";
};

const tones = {
  foam: "bg-hp-foam text-hp-text",
  ink: "bg-hp-ink text-hp-text-inverse",
  mist: "bg-hp-mist text-hp-text",
  transparent: "bg-transparent",
};

export function Section({
  children,
  className,
  id,
  tone = "transparent",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-[var(--hp-space-9)]", tones[tone], className)}>
      {children}
    </section>
  );
}
