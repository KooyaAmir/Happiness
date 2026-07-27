import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden text-hp-foam",
        compact ? "min-h-[56svh]" : "min-h-[72svh]",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/55 to-hp-ink/20" />
      <div className="relative mx-auto flex h-full min-h-[inherit] max-w-[var(--hp-container)] flex-col justify-end px-[var(--hp-gutter)] pb-14 pt-[calc(var(--hp-header-h)+2rem)]">
        <div className="max-w-3xl space-y-4">
          {eyebrow ? (
            <Text as="p" variant="label" tone="citrus">
              {eyebrow}
            </Text>
          ) : null}
          <Text as="h1" variant={compact ? "display" : "hero"} tone="inverse">
            {title}
          </Text>
          <Text variant="lede" tone="inverse" className="max-w-2xl opacity-85">
            {description}
          </Text>
        </div>
      </div>
    </section>
  );
}

type ImageCardProps = {
  href: string;
  image: string;
  title: string;
  copy: string;
  meta?: string;
};

export function ImageCard({ href, image, title, copy, meta }: ImageCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[var(--hp-radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hp-focus)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-[var(--hp-duration-slow)] ease-[var(--hp-ease-out)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hp-ink/90 via-hp-ink/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-hp-foam">
          {meta ? (
            <Text as="p" variant="label" tone="citrus">
              {meta}
            </Text>
          ) : null}
          <Text as="h3" variant="heading" tone="inverse" className="line-clamp-3">
            {title}
          </Text>
          <Text tone="inverse" className="line-clamp-2 opacity-80">
            {copy}
          </Text>
        </div>
      </div>
    </Link>
  );
}
