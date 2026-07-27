import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  style?: CSSProperties;
};

export function Container({ children, className, wide, style }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--hp-gutter)]",
        wide ? "max-w-[var(--hp-container-wide)]" : "max-w-[var(--hp-container)]",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
