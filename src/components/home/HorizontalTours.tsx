"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Text } from "@/components/ui/Text";

type TourItem = {
  id: number;
  title: string;
  slug: string;
  destinationSlug: string;
  destinationName: string;
  duration?: string | null;
  priceOnEnquiry?: boolean | null;
  priceFrom?: number | null;
  image?: string;
};

/**
 * Drag-to-scroll horizontal tour strip — tangible motion on desktop & touch.
 */
export function HorizontalTours({ tours }: { tours: TourItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  return (
    <div
      ref={trackRef}
      className="flex cursor-grab gap-5 overflow-x-auto pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onPointerDown={(event) => {
        const el = trackRef.current;
        if (!el) return;
        drag.current = {
          active: true,
          startX: event.clientX,
          scrollLeft: el.scrollLeft,
        };
        el.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!drag.current.active) return;
        const el = trackRef.current;
        if (!el) return;
        el.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.startX);
      }}
      onPointerUp={() => {
        drag.current.active = false;
      }}
      onPointerCancel={() => {
        drag.current.active = false;
      }}
    >
      {tours.map((tour) => (
        <Link
          key={tour.id}
          href={`/tours/${tour.destinationSlug}/${tour.slug}`}
          className="group relative block w-[78vw] shrink-0 overflow-hidden rounded-[var(--hp-radius-lg)] sm:w-[42vw] lg:w-[22rem]"
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={tour.image || "/images/heroes/tours-hero.png"}
              alt=""
              fill
              className="object-cover transition-transform duration-[var(--hp-duration-slow)] ease-[var(--hp-ease-out)] group-hover:scale-105"
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 22rem"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hp-ink/90 via-hp-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-hp-foam">
              <Text as="p" variant="label" tone="citrus">
                {tour.destinationName}
              </Text>
              <Text as="h3" variant="heading" tone="inverse" className="line-clamp-3">
                {tour.title}
              </Text>
              <Text tone="inverse" className="opacity-80">
                {tour.priceOnEnquiry
                  ? `${tour.duration || "Flexible"} · Price on enquiry`
                  : `${tour.duration || "Flexible"} · from ₱${tour.priceFrom?.toLocaleString() || "—"}`}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
