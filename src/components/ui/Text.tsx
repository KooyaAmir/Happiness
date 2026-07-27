import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "muted" | "inverse" | "citrus" | "lagoon";
type Variant =
  | "hero"
  | "display"
  | "title"
  | "heading"
  | "body"
  | "lede"
  | "label"
  | "caption";

const variants: Record<Variant, string> = {
  hero: "font-display text-[length:var(--hp-text-hero)] font-semibold leading-[var(--hp-leading-tight)] tracking-[var(--hp-tracking-display)]",
  display:
    "font-display text-[length:var(--hp-text-3xl)] font-semibold leading-[var(--hp-leading-tight)] tracking-[var(--hp-tracking-display)]",
  title:
    "font-display text-[length:var(--hp-text-2xl)] font-semibold leading-[var(--hp-leading-snug)] tracking-[var(--hp-tracking-display)]",
  heading:
    "font-display text-[length:var(--hp-text-xl)] font-medium leading-[var(--hp-leading-snug)]",
  body: "font-body text-[length:var(--hp-text-base)] font-normal leading-[var(--hp-leading-normal)]",
  lede: "font-body text-[length:var(--hp-text-lg)] font-normal leading-[var(--hp-leading-normal)]",
  label:
    "font-mono text-[length:var(--hp-text-xs)] font-medium uppercase tracking-[var(--hp-tracking-label)]",
  caption: "font-body text-[length:var(--hp-text-sm)] leading-[var(--hp-leading-normal)]",
};

const tones: Record<Tone, string> = {
  default: "text-hp-text",
  muted: "text-hp-text-muted",
  inverse: "text-hp-text-inverse",
  citrus: "text-hp-citrus",
  lagoon: "text-hp-lagoon",
};

type TextProps = {
  as?: ElementType;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function Text({
  as: Tag = "p",
  variant = "body",
  tone = "default",
  className,
  children,
}: TextProps) {
  return (
    <Tag className={cn(variants[variant], tones[tone], className)}>{children}</Tag>
  );
}
