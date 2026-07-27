import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";

const events = [
  {
    title: "Daily Happy Hour",
    location: "boracay" as const,
    venue: "Happiness Skate Cafe",
    scheduleLabel: "Daily · 12:00 pm – 8:00 pm",
    description: "Island drinks and skate-café energy on Boracay.",
    featured: true,
  },
  {
    title: "Happy Hour",
    location: "el-nido" as const,
    venue: "Happiness Restaurant",
    scheduleLabel: "Daily · 12:00 pm – 8:00 pm",
    description: "Unwind after lagoon days at Happiness Restaurant.",
    featured: true,
  },
  {
    title: "Bingo Night",
    location: "siargao" as const,
    venue: "Goodies",
    scheduleLabel: "Every Monday · 4:00 pm – 9:00 pm",
    description: "Weekly bingo with Goodies hospitality.",
    featured: false,
  },
  {
    title: "Funky Wednesdays",
    location: "siargao" as const,
    venue: "Goodies",
    scheduleLabel: "Every Wednesday · 8:00 pm – 12:00 am",
    description: "Midweek music and island nights at Goodies.",
    featured: true,
  },
];

async function main() {
  const payload = await getPayload({ config });

  for (const event of events) {
    const existing = await payload.find({
      collection: "events",
      draft: true,
      where: {
        and: [
          { title: { equals: event.title } },
          { location: { equals: event.location } },
        ],
      },
      limit: 1,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "events",
        id: existing.docs[0].id,
        data: {
          ...event,
          _status: "published",
        },
        draft: false,
      });
      console.log(`Updated: ${event.title} (${event.location})`);
    } else {
      await payload.create({
        collection: "events",
        data: {
          ...event,
          _status: "published",
        },
        draft: false,
      });
      console.log(`Created: ${event.title} (${event.location})`);
    }
  }

  console.log(`Seeded ${events.length} events.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
