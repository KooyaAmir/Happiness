import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(__dirname, "../src/data/trevl-catalog.json");

const knownTitles: Record<string, string> = {
  "mactan-island-hopping-private-tour": "Mactan Island Hopping Private Tour",
  "port-barton-private-land-tour": "Port Barton Private Land Tour",
  "port-barton-island-tour-a": "Port Barton Private Island Tour A",
  "alicia-panoramic-view-sunrise-trek": "Alicia Panoramic View Sunrise Trek",
  "atv-adventure-at-boracay-newcoast": "ATV Adventure at Boracay Newcoast",
  "boracay-sunset-paraw-sailing": "Boracay Sunset Paraw Sailing",
  "boracay-helicopter-adventure-20-minute-vip-ride":
    "Boracay Helicopter Adventure – 20-Minute VIP Ride",
  "el-nido-zipline-adventure": "El Nido Zipline Adventure",
  "dolphin-watching-balicasag-island-snorkeling":
    "Dolphin Watching & Balicasag Island Snorkeling",
  "corregidor-naked-and-guyam-islands-day-tour":
    "Corregidor, Naked and Guyam Islands Day Tour",
  "siargao-land-tour": "Siargao Land Tour",
  "happiness-tri-island-tour": "Happiness Tri – Island Tour",
  "happiness-booz-cruise-siargao": "Happiness Booz Cruise – Siargao",
  "boracay-private-island-hopping-adventure":
    "Boracay Private Island Hopping Adventure",
  "happiness-land-tour-adventure-a-journey-through-el-nidos-natural-wonders":
    "Land Tour Adventure: A Journey Through El Nido Natural Wonders",
  "bohol-countryside-day-tour": "Bohol Countryside Day Tour",
  "happiness-deluxe-tour-c-a-day-of-relaxation-in-el-nidos-hidden-gems":
    "Happiness Deluxe Tour C",
  "happiness-deluxe-tour-a-a-journey-through-el-nidos-stunning-beaches-and-lagoons":
    "Happiness Deluxe Tour A",
  "port-barton-island-tour-b": "Port Barton Private Island Tour B",
  "5-days-4-nights-batanes-land-island-tour":
    "5 Days 4 Nights – Batanes Land & Island Tour",
  "3-days-2-nights-complete-batanes-land-tour":
    "3 Days 2 Nights – Complete Batanes Land Tour",
  "boracay-helmet-dive-experience": "Boracay Helmet Dive Experience",
  "el-nido-canopy-walk-view-deck-experience":
    "El Nido Canopy Walk & View Deck Experience",
  "manila-half-day-city-tour": "Manila Half-Day City Tour",
  "mt-pinatubo-day-tour-package": "Mt. Pinatubo Day Tour Package",
  "puning-hot-springs-private-day-tour": "Puning Hot Springs Private Day Tour",
  "pagsanjan-falls-private-day-tour": "Pagsanjan Falls Private Day Tour",
  "puerto-princesa-underground-river-tour":
    "Puerto Princesa Underground River Tour",
  "coron-ultimate-island-hopping-tour": "Coron Ultimate Island Hopping Tour",
  "guimaras-land-island-tour-culture-coastlines-and-mangoes":
    "Guimaras Land & Island Tour – Culture, Coastlines, and Mangoes",
  "gigantes-islands-adventure-secluded-beaches-saltwater-lagoons-local-flavors":
    "Gigantes Islands Adventure",
  "4-days-3-nights-batanes-land-tour": "4 Days / 3 Nights Batanes Land Tour",
  "pescador-island-and-sardine-run-moalboal":
    "Pescador Island and Sardine Run (Moalboal)",
  "sohoton-cove-adventure": "Sohoton Cove Adventure",
  "5-days-4-nights-ifugao-highlands-adventure-banaue-sagada-batad":
    "5 Days / 4 Nights: Ifugao Highlands Adventure",
  "osmena-peak-and-cancalanog-falls-tour":
    "Osmena Peak and Cancalanog Falls Tour",
  "happiness-land-tour-waterfall-and-beaches":
    "Happiness Land Tour – Waterfall and beaches",
  "oslob-whale-shark-watching-and-canyoneering-at-kawasan-falls":
    "Oslob Whale Shark Watching and Canyoneering at Kawasan Falls",
  "happiness-deluxe-tour-d": "Happiness Deluxe Tour D",
  "happiness-deluxe-tour-b": "Happiness Deluxe Tour B",
};

const destinationRules: Array<[RegExp, string]> = [
  [/el[- ]?nido/i, "El Nido"],
  [/boracay/i, "Boracay"],
  [/siargao|sohoton|alicia/i, "Siargao"],
  [/port[- ]?barton/i, "Port Barton"],
  [/bohol|balicasag/i, "Bohol"],
  [/cebu|mactan|moalboal|oslob|osmena|kawasan/i, "Cebu"],
  [/coron/i, "Coron"],
  [/manila|pinatubo|pagsanjan|puning/i, "Manila"],
  [/batanes/i, "Batanes"],
  [/banaue|sagada|ifugao|batad/i, "Banaue"],
  [/puerto[- ]?princesa|underground[- ]?river/i, "Puerto Princesa"],
  [/iloilo|guimaras|gigantes/i, "Iloilo"],
];

function guessDestination(slug: string, title: string) {
  const hay = `${slug} ${title}`;
  for (const [re, name] of destinationRules) {
    if (re.test(hay)) return name;
  }
  return "Philippines";
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

type RawCard = {
  title?: string;
  slug: string;
  sourceUrl: string;
  imageUrl?: string;
  priceFrom?: number | null;
  priceOnEnquiry?: boolean;
  duration?: string;
  startsAt?: string;
  endsAt?: string;
  popular?: boolean;
  raw?: string;
};

const raw = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as RawCard[];

const cleaned = raw.map((card) => {
  const title = knownTitles[card.slug] || titleFromSlug(card.slug);
  const text = card.raw || "";
  const priceMatch = text.match(/From\s*₱\s*([\d,]+)/i);
  const priceFrom = priceMatch
    ? Number(priceMatch[1].replace(/,/g, ""))
    : card.priceFrom && card.priceFrom > 500
      ? Number(card.priceFrom)
      : null;
  const priceOnEnquiry = /price on enquiry/i.test(text) || Boolean(card.priceOnEnquiry);
  const durationMatch = text.match(/Duration\s+(.+?)(?=\s+From|\s+Price|\s+Book|$)/i);
  const startsMatch = text.match(/Starts\s+(.+?)(?=\s+Ends|\s+Duration|$)/i);
  const endsMatch = text.match(/Ends\s+(.+?)(?=\s+Duration|\s+From|$)/i);

  return {
    title,
    slug: card.slug,
    destination: guessDestination(card.slug, title),
    sourceUrl: card.sourceUrl,
    imageUrl: card.imageUrl || "",
    priceFrom,
    priceOnEnquiry,
    duration: durationMatch?.[1]?.trim() || card.duration || "",
    startsAt: startsMatch?.[1]?.trim() || card.startsAt || "",
    endsAt: endsMatch?.[1]?.trim() || card.endsAt || "",
    popular: Boolean(card.popular),
    kind: /days|nights/i.test(title) ? "vacation-package" : "tour",
    summary: "",
  };
});

fs.writeFileSync(catalogPath, JSON.stringify(cleaned, null, 2));
console.log(`Cleaned ${cleaned.length} tours`);
