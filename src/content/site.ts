export type LocationSlug = "boracay" | "el-nido" | "siargao";

export type Venue = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  vibe?: string;
  amenities?: string[];
  dining?: string[];
};

export type LocationMoment = {
  title: string;
  copy: string;
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
  foodScene?: string;
  atmosphere: string;
  moments: LocationMoment[];
  gallery: string[];
};

export const locations: Location[] = [
  {
    slug: "boracay",
    name: "Boracay",
    tagline: "Beach life, skate café, and island nights",
    atmosphere: "White sand mornings. Bowl sessions. Happy hour that starts early.",
    summary:
      "Our newest and largest location — thoughtfully designed dorms and private rooms, skate café, pool, shop, restaurant, bar, and wellness space on iconic Boracay.",
    heroImage: "/images/locations/boracay-sunset.png",
    cardImage: "/images/locations/boracay-white-beach.png",
    foodScene:
      "Skate café all day, Middle Eastern plates at night, and a happy hour that starts early.",
    moments: [
      {
        title: "White Beach light",
        copy: "Powder sand, turquoise shallows, and the long walk that somehow never gets old.",
        image: "/images/locations/boracay-white-beach.png",
      },
      {
        title: "Skate café culture",
        copy: "Coffee, bites, and the bowl between beach sessions — the social heart of Happiness Boracay.",
        image: "/images/experiences/skate-cafe.png",
      },
      {
        title: "Island nights",
        copy: "Happy hour energy, Middle Eastern plates, and the soft gold of a Boracay sunset.",
        image: "/images/locations/boracay-sunset.png",
      },
    ],
    gallery: [
      "/images/reference/27-boracay-24.jpg",
      "/images/locations/boracay-white-beach.png",
      "/images/experiences/skate-cafe.png",
      "/images/stays/hostel-pool.png",
      "/images/locations/boracay-sunset.png",
      "/images/reference/53-atv-boracay-1.jpg",
    ],
    venues: [
      {
        slug: "happiness-hostel",
        name: "Happiness Hostel Boracay",
        blurb: "Dorms and private rooms with pool, skate café, and full island lifestyle.",
        image: "/images/stays/hostel-pool.png",
        vibe: "Social basecamp with room to reset between beach days.",
        amenities: [
          "Dorms and private rooms",
          "Pool and skate bowl",
          "Starlink Wi‑Fi",
          "Wellness space",
          "On-site shop",
        ],
        dining: ["Skate café", "Restaurant & bar", "Daily happy hour"],
      },
    ],
    highlights: ["Skate café & bowl", "Middle Eastern cuisine", "Daily happy hour", "Starlink Wi‑Fi"],
  },
  {
    slug: "el-nido",
    name: "El Nido",
    tagline: "Limestone cliffs, lagoons, and boutique stays",
    atmosphere: "Boat mornings. Lagoon blue. Jungle evenings that stretch long.",
    summary:
      "Hostel in town plus boutique villas and resort in Corong Corong — the gateway to island hopping, lagoons, and slow evenings in Palawan.",
    heroImage: "/images/locations/el-nido-lagoon.png",
    cardImage: "/images/locations/el-nido-lagoon.png",
    foodScene:
      "Town restaurant energy, Hama Street food truck bites, and jungle resort dining.",
    moments: [
      {
        title: "Big Lagoon mornings",
        copy: "Karst cliffs, glass water, and the hush that hits the moment the boat engines cut.",
        image: "/images/reference/34-big-lagoon-.jpg",
      },
      {
        title: "Town pulse",
        copy: "Sirena Street energy — walk out the door into boats, cafés, and night buzz.",
        image: "/images/locations/location-el-nido.jpg",
      },
      {
        title: "Boutique calm",
        copy: "Villas and jungle resort nights when you want the lagoons without the noise.",
        image: "/images/stays/boutique-villa.png",
      },
    ],
    gallery: [
      "/images/locations/el-nido-lagoon.png",
      "/images/heroes/home-hero.png",
      "/images/reference/34-big-lagoon-.jpg",
      "/images/reference/43-nacpan.webp",
      "/images/experiences/el-nido-tour.png",
      "/images/stays/boutique-villa.png",
    ],
    venues: [
      {
        slug: "happiness-hostel",
        name: "Happiness Hostel El Nido",
        blurb: "Central Sirena Street base for explorers and social travelers.",
        image: "/images/stays/dorm-room.png",
        vibe: "Walk-out-the-door access to boats, cafés, and night energy.",
        amenities: ["Social dorms", "Private rooms", "Tour desk help", "Shared chill spaces"],
        dining: ["Happiness Restaurant", "Hama Street food truck"],
      },
      {
        slug: "boutique-villas",
        name: "Happiness Boutique Villas",
        blurb: "Private villa comfort minutes from town.",
        image: "/images/stays/boutique-villa.png",
        vibe: "Quieter nights with villa privacy after lagoon days.",
        amenities: ["Private villas", "Garden setting", "Short ride to town", "Couple-friendly"],
        dining: ["Resort dining nearby", "In-room / villa breakfast options"],
      },
      {
        slug: "boutique-resort",
        name: "Happiness Boutique Resort",
        blurb: "Jungle resort dining and romantic evenings — formerly Blue Mango.",
        image: "/images/stays/boutique-villa.png",
        vibe: "Lush, slower, made for longer dinners.",
        amenities: ["Boutique rooms", "Jungle setting", "Event-friendly spaces"],
        dining: ["Resort restaurant", "Sunset drinks"],
      },
    ],
    highlights: ["Tours A–D", "Boutique resort dining", "Food truck on Hama Street", "Jungle villas"],
  },
  {
    slug: "siargao",
    name: "Siargao",
    tagline: "Surf capital energy, slow island living",
    atmosphere: "Palm roads. Glassy waves. The kind of sunset you plan your day around.",
    summary:
      "Hostel and beach resort along Tourism Road — Goodies, HResto, beach bar, food truck, and the Happiness Surf Retreat base.",
    heroImage: "/images/locations/siargao-palm-road.png",
    cardImage: "/images/stays/siargao-beach-resort.png",
    foodScene: "Goodies all day, HResto plates, BBar nights, and beach-bar sundowners.",
    moments: [
      {
        title: "Palm road arrivals",
        copy: "That first drive under the canopy — Tourism Road, salt air, and the island slowing you down.",
        image: "/images/locations/siargao-palm-road.png",
      },
      {
        title: "Surf weeks",
        copy: "Zero-to-hero sessions, oceanfront mornings, and the Happiness Surf Retreat rhythm.",
        image: "/images/experiences/surf-wave.png",
      },
      {
        title: "Goodies & nights",
        copy: "Café days, BBar energy, bingo Mondays, and Funky Wednesdays that keep the island social.",
        image: "/images/experiences/events-nightlife.png",
      },
    ],
    gallery: [
      "/images/locations/siargao-palm-road.png",
      "/images/reference/11-iao-activity-2.jpg",
      "/images/experiences/surf-wave.png",
      "/images/stays/siargao-beach-resort.png",
      "/images/locations/location-siargao-activity-1.jpg",
      "/images/experiences/community.png",
    ],
    venues: [
      {
        slug: "happiness-hostel",
        name: "Happiness Hostel Siargao",
        blurb: "Social stays powered by Starlink, steps from island life.",
        image: "/images/stays/hostel-pool.png",
        vibe: "Surf town social — easy mornings, busy evenings.",
        amenities: ["Dorms and privates", "Starlink Wi‑Fi", "Close to Tourism Road", "Surf retreat access"],
        dining: ["Goodies", "HResto", "BBar"],
      },
      {
        slug: "beach-resort",
        name: "Happiness Beach Resort",
        blurb: "Oceanfront resort energy for surf weeks and longer escapes.",
        image: "/images/stays/siargao-beach-resort.png",
        vibe: "Ocean air, slower mornings, beach-bar nights.",
        amenities: ["Oceanfront rooms", "Beach access", "Resort facilities", "Ideal for longer stays"],
        dining: ["Beach bar", "Resort dining", "Food truck"],
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
    href: "/food",
    title: "Eat & drink",
    copy: "Cafés, restaurants, bars, and happy hours across three islands.",
    image: "/images/food/restaurant.png",
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
];

export const foodVenues = [
  {
    location: "Boracay",
    name: "Happiness Skate Café",
    copy: "Coffee, bites, and bowl culture between beach sessions.",
    image: "/images/experiences/skate-cafe.png",
  },
  {
    location: "El Nido",
    name: "Happiness Restaurant",
    copy: "Town tables for post-lagoon dinners and long happy hours.",
    image: "/images/food/middle-eastern-plate.png",
  },
  {
    location: "Siargao",
    name: "Goodies",
    copy: "Café, shop, and community hub on Tourism Road.",
    image: "/images/food/food-truck.png",
  },
  {
    location: "Siargao",
    name: "BBar",
    copy: "Evening drinks and midweek music energy.",
    image: "/images/experiences/events-nightlife.png",
  },
];
