import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-hp-citrus text-hp-ink hover:bg-[color-mix(in_oklab,var(--hp-citrus)_88%,white)] shadow-[var(--hp-shadow-glow)]",
  secondary:
    "bg-hp-lagoon text-hp-foam hover:bg-hp-lagoon-bright",
  ghost:
    "border border-current/70 bg-transparent text-inherit hover:bg-white/10",
  inverse:
    "bg-hp-foam text-hp-ink hover:bg-hp-mist",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-[3.25rem] px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--hp-radius-pill)] font-body font-medium tracking-wide transition-[transform,background-color,box-shadow,border-color] duration-[var(--hp-duration)] ease-[var(--hp-ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hp-focus)] active:scale-[0.98]";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "className" | "children">)
  | ({ href?: undefined } & ComponentProps<"button">)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ComponentProps<"button">;
  return (
    <button className={classes} type={buttonProps.type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
