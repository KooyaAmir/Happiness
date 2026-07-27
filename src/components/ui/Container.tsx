import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

export function Container({ children, className, wide }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--hp-gutter)]",
        wide ? "max-w-[var(--hp-container-wide)]" : "max-w-[var(--hp-container)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
