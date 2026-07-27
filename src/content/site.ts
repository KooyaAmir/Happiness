export type LocationSlug = "boracay" | "el-nido" | "siargao";

export type Venue = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Location = {
  slug: LocationSlug;
  name: string;
  tagline: string;
  summary: string;
  heroImage: string;
  cardImage: string;
  venues: Venue[];
  highlights: string[];
};

export const locations: Location[] = [
  {
    slug: "boracay",
    name: "Boracay",
    tagline: "Beach life, skate café, and island nights",
    summary:
      "Our newest and largest location — thoughtfully designed dorms and private rooms, skate café, pool, shop, restaurant, bar, and wellness space on iconic Boracay.",
    heroImage: "/images/locations/boracay-sunset.png",
    cardImage: "/images/locations/boracay-white-beach.png",
    venues: [
      {
        slug: "happiness-hostel",
        name: "Happiness Hostel Boracay",
        blurb: "Dorms and private rooms with pool, skate café, and full island lifestyle.",
        image: "/images/stays/hostel-pool.png",
      },
    ],
    highlights: ["Skate café & bowl", "Middle Eastern cuisine", "Daily happy hour", "Starlink Wi‑Fi"],
  },
  {
    slug: "el-nido",
    name: "El Nido",
    tagline: "Limestone cliffs, lagoons, and boutique stays",
    summary:
      "Hostel in town plus boutique villas and resort in Corong Corong — the gateway to island hopping, lagoons, and slow evenings in Palawan.",
    heroImage: "/images/locations/el-nido-lagoon.png",
    cardImage: "/images/locations/el-nido-lagoon.png",
    venues: [
      {
        slug: "happiness-hostel",
        name: "Happiness Hostel El Nido",
        blurb: "Central Sirena Street base for explorers and social travelers.",
        image: "/images/stays/dorm-room.png",
      },
      {
        slug: "boutique-villas",
        name: "Happiness Boutique Villas",
        blurb: "Private villa comfort minutes from town.",
        image: "/images/stays/boutique-villa.png",
      },
      {
        slug: "boutique-resort",
        name: "Happiness Boutique Resort",
        blurb: "Jungle resort dining and romantic evenings — formerly Blue Mango.",
        image: "/images/stays/boutique-villa.png",
      },
    ],
    highlights: ["Tours A–D", "Boutique resort dining", "Food truck on Hama Street", "Jungle villas"],
  },
  {
    slug: "siargao",
    name: "Siargao",
    tagline: "Surf capital energy, slow island living",
    summary:
      "Hostel and beach resort along Tourism Road — Goodies, HResto, beach bar, food truck, and the Happiness Surf Retreat base.",
    heroImage: "/images/locations/siargao-palm-road.png",
    cardImage: "/images/stays/siargao-beach-resort.png",
    venues: [
      {
        slug: "happiness-hostel",
        name: "Happiness Hostel Siargao",
        blurb: "Social stays powered by Starlink, steps from island life.",
        image: "/images/stays/hostel-pool.png",
      },
      {
        slug: "beach-resort",
        name: "Happiness Beach Resort",
        blurb: "Oceanfront resort energy for surf weeks and longer escapes.",
        image: "/images/stays/siargao-beach-resort.png",
      },
    ],
    highlights: ["Surf retreats", "Beach bar", "Goodies café & shop", "Island hopping"],
  },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export const experiences = [
  {
    href: "/tours",
    title: "Travel & tours",
    copy: "Day trips and tailor-made packages across the Philippines.",
    image: "/images/heroes/tours-hero.png",
  },
  {
    href: "/wellness",
    title: "Wellness",
    copy: "Yoga, sound healing, ice baths, and spa rituals.",
    image: "/images/experiences/wellness-yoga.png",
  },
  {
    href: "/surf-retreat",
    title: "Surf retreat",
    copy: "Zero-to-hero surf weeks in Siargao.",
    image: "/images/experiences/surf-wave.png",
  },
  {
    href: "/events",
    title: "Events",
    copy: "Happy hours, bingo nights, and island parties.",
    image: "/images/experiences/events-nightlife.png",
  },
];

export const featuredTours = [
  {
    slug: "el-nido-zipline-adventure",
    destination: "El Nido",
    title: "El Nido Zipline Adventure",
    duration: "25m",
    from: "₱600",
    image: "/images/experiences/zipline.png",
  },
  {
    slug: "happiness-deluxe-tour-a",
    destination: "El Nido",
    title: "Happiness Deluxe Tour A",
    duration: "8h",
    from: "₱1,600",
    image: "/images/experiences/el-nido-tour.png",
  },
  {
    slug: "boracay-sunset-paraw-sailing",
    destination: "Boracay",
    title: "Boracay Sunset Paraw Sailing",
    duration: "30m",
    from: "₱3,000",
    image: "/images/locations/boracay-sunset.png",
  },
  {
    slug: "happiness-tri-island-tour",
    destination: "Siargao",
    title: "Happiness Tri-Island Tour",
    duration: "7h",
    from: "₱2,000",
    image: "/images/experiences/island-hopping.png",
  },
];
