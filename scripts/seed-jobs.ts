import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";

const jobs = [
  {
    title: "Restaurant Manager",
    slug: "restaurant-manager-boracay",
    location: "boracay" as const,
    venue: "Happiness Hostel Boracay",
    employmentType: "full-time" as const,
    summary: "Lead the Boracay F&B floor and keep the Happiness energy high.",
    description:
      "Own service standards, team scheduling, and guest experience at Happiness Hostel Boracay.",
  },
  {
    title: "Bartenders",
    slug: "bartenders-siargao",
    location: "siargao" as const,
    venue: "Goodies & HResto",
    employmentType: "full-time" as const,
    summary: "Craft drinks and island nights across Goodies and HResto.",
    description: "Bar service, cocktail prep, and guest hospitality in General Luna.",
  },
  {
    title: "Receptionist",
    slug: "receptionist-siargao",
    location: "siargao" as const,
    venue: "HResto",
    employmentType: "full-time" as const,
    summary: "Be the first smile guests meet in Siargao.",
    description: "Front desk, bookings support, and guest coordination at HResto.",
  },
  {
    title: "Shift Manager",
    slug: "shift-manager-siargao",
    location: "siargao" as const,
    venue: "BBar",
    employmentType: "full-time" as const,
    summary: "Run smooth evening shifts at BBar.",
    description: "Lead service flow, staff coordination, and closing routines.",
  },
];

async function main() {
  const payload = await getPayload({ config });

  for (const job of jobs) {
    const existing = await payload.find({
      collection: "jobs",
      draft: true,
      where: { slug: { equals: job.slug } },
      limit: 1,
    });

    const data = {
      ...job,
      open: true,
      _status: "published" as const,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "jobs",
        id: existing.docs[0].id,
        data,
        draft: false,
      });
      console.log(`Updated: ${job.title}`);
    } else {
      await payload.create({
        collection: "jobs",
        data,
        draft: false,
      });
      console.log(`Created: ${job.title}`);
    }
  }

  console.log(`Seeded ${jobs.length} jobs.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
