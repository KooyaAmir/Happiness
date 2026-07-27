import type { Event } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export const EVENT_LOCATIONS = [
  { value: "all", label: "All" },
  { value: "boracay", label: "Boracay" },
  { value: "el-nido", label: "El Nido" },
  { value: "siargao", label: "Siargao" },
] as const;

export type EventLocationFilter = (typeof EVENT_LOCATIONS)[number]["value"];

export function locationLabel(value: Event["location"] | string) {
  return EVENT_LOCATIONS.find((row) => row.value === value)?.label || value;
}

export function isEventLocationFilter(value: string | undefined): value is EventLocationFilter {
  return EVENT_LOCATIONS.some((row) => row.value === value);
}

export async function getPublishedEvents(location: EventLocationFilter = "all") {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "events",
    depth: 0,
    limit: 100,
    sort: "title",
    where: {
      and: [
        { _status: { equals: "published" } },
        ...(location === "all" ? [] : [{ location: { equals: location } }]),
      ],
    },
  });

  return result.docs;
}
