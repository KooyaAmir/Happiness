import type { Destination, Tour } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";
import { resolveTourImage } from "@/lib/tour-images";

export type TourCard = {
  id: number;
  title: string;
  slug: string;
  destinationSlug: string;
  destinationName: string;
  duration?: string | null;
  priceFrom?: number | null;
  priceOnEnquiry?: boolean | null;
  image?: string;
  popular?: boolean | null;
  kind: Tour["kind"];
  summary?: string | null;
};

function mapTour(tour: Tour): TourCard {
  const destination =
    typeof tour.destination === "object" && tour.destination
      ? (tour.destination as Destination)
      : null;
  const destinationSlug = destination?.slug || "philippines";

  const uploadedUrl =
    tour.image && typeof tour.image === "object" && tour.image.url
      ? tour.image.url
      : tour.imageUrl;

  return {
    id: tour.id,
    title: tour.title,
    slug: tour.slug,
    destinationSlug,
    destinationName: destination?.name || "Philippines",
    duration: tour.duration,
    priceFrom: tour.priceFrom,
    priceOnEnquiry: tour.priceOnEnquiry,
    image: resolveTourImage({ slug: tour.slug, destinationSlug, uploadedUrl }),
    popular: tour.popular,
    kind: tour.kind,
    summary: tour.summary,
  };
}

export async function getPublishedTours(options?: {
  destinationSlug?: string;
  limit?: number;
}) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "tours",
    depth: 1,
    limit: options?.limit ?? 100,
    where: {
      _status: { equals: "published" },
    },
    sort: "-popular",
  });

  const tours = result.docs.map(mapTour);
  if (!options?.destinationSlug) return tours;
  return tours.filter((tour) => tour.destinationSlug === options.destinationSlug);
}

export async function getTourBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "tours",
    depth: 1,
    limit: 1,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
  });

  const tour = result.docs[0];
  if (!tour) return null;
  return {
    ...mapTour(tour),
    startsAt: tour.startsAt,
    endsAt: tour.endsAt,
    inclusions: tour.inclusions || [],
    whatToBring: tour.whatToBring || [],
    notes: tour.notes || [],
    itinerary: tour.itinerary || [],
    sourceUrl: tour.sourceUrl,
  };
}

export async function getDestinationsWithTours() {
  const payload = await getPayloadClient();
  const destinations = await payload.find({
    collection: "destinations",
    limit: 100,
    sort: "name",
  });

  const tours = await getPublishedTours();
  const counts = new Map<string, number>();
  for (const tour of tours) {
    counts.set(tour.destinationSlug, (counts.get(tour.destinationSlug) || 0) + 1);
  }

  return destinations.docs.map((destination) => ({
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    summary: destination.summary,
    count: counts.get(destination.slug) || 0,
  }));
}
