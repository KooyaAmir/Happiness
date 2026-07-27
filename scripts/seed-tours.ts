import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "../payload.config";

type CatalogTour = {
  title: string;
  slug: string;
  destination: string;
  sourceUrl: string;
  imageUrl?: string;
  priceFrom: number | null;
  priceOnEnquiry: boolean;
  duration?: string;
  startsAt?: string;
  endsAt?: string;
  popular?: boolean;
  kind: "tour" | "vacation-package";
  summary?: string;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(__dirname, "../src/data/trevl-catalog.json");

function slugifyDestination(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function enrichTour(sourceUrl: string) {
  try {
    const res = await fetch(sourceUrl, {
      headers: { "user-agent": "Mozilla/5.0 HappinessSeedBot" },
    });
    if (!res.ok) return { summary: "", inclusions: [] as string[], whatToBring: [] as string[] };
    const html = await res.text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const summaryMatch = text.match(/What to Expect:([\s\S]{0,500}?)\s*(Summary|Itinerary|Inclusions|Operation Hours)/i);
    const summary =
      summaryMatch?.[1]?.trim().slice(0, 500) ||
      text.slice(text.indexOf("For thrill") >= 0 ? text.indexOf("For thrill") : 0, 450);

    const inclusions: string[] = [];
    const inclBlock = text.match(/Inclusions([\s\S]{0,800}?)(What to bring|Please note|Let's do this|Thank You)/i)?.[1] || "";
    for (const line of inclBlock.split(/(?<=\.)\s+/)) {
      const clean = line.trim();
      if (clean.length > 12 && clean.length < 180) inclusions.push(clean);
      if (inclusions.length >= 6) break;
    }

    const bring: string[] = [];
    const bringBlock = text.match(/What to bring([\s\S]{0,500}?)(Please note|Let's do this|Thank You|Inclusions)/i)?.[1] || "";
    for (const line of bringBlock.split(/(?<=\.)\s+|\s{2,}/)) {
      const clean = line.replace(/^[-•]\s*/, "").trim();
      if (clean.length > 3 && clean.length < 120) bring.push(clean);
      if (bring.length >= 6) break;
    }

    return { summary: summary.slice(0, 600), inclusions, whatToBring: bring };
  } catch {
    return { summary: "", inclusions: [] as string[], whatToBring: [] as string[] };
  }
}

async function main() {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as CatalogTour[];
  const payload = await getPayload({ config });

  const destinationIds = new Map<string, number>();

  for (const name of [...new Set(catalog.map((t) => t.destination))]) {
    const slug = slugifyDestination(name);
    const existing = await payload.find({
      collection: "destinations",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs[0]) {
      destinationIds.set(name, existing.docs[0].id as number);
      continue;
    }

    const created = await payload.create({
      collection: "destinations",
      data: {
        name,
        slug,
        summary: `Tours and experiences in ${name}.`,
      },
    });
    destinationIds.set(name, created.id as number);
    console.log(`Destination: ${name}`);
  }

  let createdCount = 0;
  let updatedCount = 0;

  for (const tour of catalog) {
    const destination = destinationIds.get(tour.destination);
    if (!destination) continue;

    const details = await enrichTour(tour.sourceUrl);
    const data = {
      title: tour.title,
      slug: tour.slug,
      destination,
      kind: tour.kind,
      popular: Boolean(tour.popular),
      startsAt: tour.startsAt || undefined,
      endsAt: tour.endsAt || undefined,
      duration: tour.duration || undefined,
      priceFrom: tour.priceFrom ?? undefined,
      priceOnEnquiry: Boolean(tour.priceOnEnquiry),
      summary: details.summary || tour.summary || undefined,
      inclusions: details.inclusions.map((item) => ({ item })),
      whatToBring: details.whatToBring.map((item) => ({ item })),
      imageUrl: tour.imageUrl || undefined,
      sourceUrl: tour.sourceUrl,
      _status: "published" as const,
    };

    const existing = await payload.find({
      collection: "tours",
      where: { slug: { equals: tour.slug } },
      limit: 1,
      draft: true,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "tours",
        id: existing.docs[0].id,
        data,
        draft: false,
      });
      updatedCount += 1;
      console.log(`Updated: ${tour.title}`);
    } else {
      await payload.create({
        collection: "tours",
        data,
        draft: false,
      });
      createdCount += 1;
      console.log(`Created: ${tour.title}`);
    }
  }

  console.log(`Done. Created ${createdCount}, updated ${updatedCount}.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
