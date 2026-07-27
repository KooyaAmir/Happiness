/**
 * Local images for tours migrated from TREVL/WordPress.
 * The migration scraped a chevron icon as every tour's imageUrl, so until
 * real photos are uploaded per-tour in the CMS we resolve images here:
 * matched reference photo by slug → destination fallback → generic hero.
 */

const TOUR_IMAGE_BY_SLUG: Record<string, string> = {
  "mactan-island-hopping-private-tour": "/images/experiences/island-hopping.png",
  "port-barton-private-land-tour": "/images/reference/65-long-beach.jpg",
  "port-barton-island-tour-a": "/images/reference/58-port-barton.jpg",
  "port-barton-island-hopping-tour-b": "/images/reference/54-coconut-beach-819x1024-1.jpg",
  "alicia-panoramic-view-sunrise-trek": "/images/reference/62-alicia-2.jpg",
  "atv-adventure-at-boracay-newcoast": "/images/reference/53-atv-boracay-1.jpg",
  "boracay-sunset-paraw-sailing": "/images/locations/boracay-sunset.png",
  "boracay-helicopter-adventure-20-minute-vip-ride": "/images/heroes/hero-island-aerial.jpg",
  "boracay-private-island-hopping-adventure": "/images/reference/27-boracay-24.jpg",
  "boracay-helmet-dive-experience": "/images/reference/45-helmetdiving1of1.jpg",
  "el-nido-zipline-adventure": "/images/reference/61-zip.jpg",
  "el-nido-canopy-walk-view-deck-experience": "/images/experiences/el-nido-tour.png",
  "happiness-land-tour-adventure-a-journey-through-el-nidos-natural-wonders":
    "/images/reference/40-bulalacao.jpg",
  "happiness-deluxe-tour-a-a-journey-through-el-nidos-stunning-beaches-and-lagoons":
    "/images/reference/34-big-lagoon-.jpg",
  "happiness-deluxe-tour-b-explore-the-iconic-caves-and-beaches-of-el-nido":
    "/images/heroes/tours-hero.png",
  "happiness-deluxe-tour-c-a-day-of-relaxation-in-el-nidos-hidden-gems":
    "/images/reference/43-nacpan.webp",
  "happiness-deluxe-tour-d-discover-the-relaxing-lagoons-and-coves-of-el-nido":
    "/images/locations/el-nido-lagoon.png",
  "balicasag-virgin-island-hopping-tour": "/images/experiences/island-hopping.png",
  "bohol-country-side-tour-package": "/images/reference/42-mansilawit.jpg",
  "corregidor-naked-island-and-guyam-islands-tour": "/images/reference/12-iao-activity-3.jpg",
  "siargao-land-tour": "/images/reference/10-iao-activity-1.jpg",
  "happiness-tri-island-tour": "/images/locations/location-siargao-activity-1.jpg",
  "happiness-booz-cruise-siargao": "/images/experiences/events-nightlife.png",
  "sohoton-cove-adventure": "/images/reference/60-tiktikan-lake2.jpg",
  "5-days-4-nights-batanes-land-island-tour": "/images/reference/63-homoron-blue-lagoon.jpg",
  "3-days-2-nights-complete-batanes-land-tour": "/images/reference/63-homoron-blue-lagoon.jpg",
  "4-days-3-nights-complete-batanes-land-tour": "/images/reference/63-homoron-blue-lagoon.jpg",
  "manila-half-day-city-tour": "/images/reference/56-manila-city-tour-5.jpg",
  "mt-pinatubo-day-tour-package": "/images/reference/57-pinatubo-2.jpg",
  "puning-hot-springs-private-day-tour": "/images/reference/59-puning.jpg",
  "puerto-princesa-underground-river-tour": "/images/heroes/hero-island-aerial.jpg",
  "coron-ultimate-island-hopping-tour": "/images/reference/64-img-20250708-wa0017.jpg",
  "guimaras-land-island-tour-culture-coastlines-and-mangoes":
    "/images/reference/44-20250511_110034.jpg",
  "gigantes-islands-adventure-secluded-beaches-saltwater-lagoons-local-flavors":
    "/images/reference/52-antonia-beach.jpg",
  "pescador-island-and-sardine-run-moalboal": "/images/experiences/snorkeling.png",
  "osmena-peak-cancalanog-falls-tour": "/images/reference/42-mansilawit.jpg",
  "oslob-whale-shark-watching-and-canyoneering-at-kawasan-falls":
    "/images/reference/35-canyoneering-kawasan-falls-2-900x600-1.jpg",
  "hiwang-native-village-hungduan-rice-terraces-bogyah-hot-springs-tour":
    "/images/reference/55-hanging_coffin_sagada_2.jpg",
  "happiness-land-tour-waterfall-and-beaches": "/images/reference/40-bulalacao.jpg",
};

const DESTINATION_FALLBACK: Record<string, string> = {
  boracay: "/images/locations/boracay-white-beach.png",
  "el-nido": "/images/locations/el-nido-lagoon.png",
  siargao: "/images/locations/siargao-palm-road.png",
  cebu: "/images/experiences/snorkeling.png",
  "port-barton": "/images/reference/58-port-barton.jpg",
  batanes: "/images/reference/63-homoron-blue-lagoon.jpg",
  manila: "/images/reference/56-manila-city-tour-5.jpg",
  bohol: "/images/experiences/island-hopping.png",
  coron: "/images/reference/64-img-20250708-wa0017.jpg",
  iloilo: "/images/reference/52-antonia-beach.jpg",
  "puerto-princesa": "/images/heroes/hero-island-aerial.jpg",
};

export function resolveTourImage(options: {
  slug: string;
  destinationSlug: string;
  uploadedUrl?: string | null;
}): string {
  const { slug, destinationSlug, uploadedUrl } = options;
  // Uploaded CMS media always wins; scraped .svg icons are never real photos.
  if (uploadedUrl && !uploadedUrl.endsWith(".svg")) return uploadedUrl;
  return (
    TOUR_IMAGE_BY_SLUG[slug] ||
    DESTINATION_FALLBACK[destinationSlug] ||
    "/images/heroes/tours-hero.png"
  );
}
