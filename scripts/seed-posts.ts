import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";

const posts = [
  {
    title: "How to spend 5 perfect days in Boracay",
    slug: "5-perfect-days-in-boracay",
    category: "guides" as const,
    publishedAt: "2026-06-01",
    coverImage: "/images/locations/boracay-white-beach.png",
    excerpt:
      "White Beach mornings, Bulabog afternoons, and Happiness nights — a practical Boracay itinerary.",
    content: `Boracay rewards travelers who mix beach time with local rhythm.

Start on White Beach for sunrise walks, then cross to Bulabog for wind sports and café culture. Stay near Happiness Hostel if you want walkable nights without losing the island calm.

Day three is for a boat trip and sunset dinner. Day four: wellness reset. Day five: one last swim before you leave with sand still in your shoes.`,
    seoTitle: "5 Perfect Days in Boracay | Happiness Philippines",
    seoDescription:
      "A practical 5-day Boracay itinerary covering White Beach, Bulabog, food, wellness, and where to stay.",
  },
  {
    title: "El Nido lagoons: which tour is right for you?",
    slug: "el-nido-lagoons-which-tour",
    category: "travel" as const,
    publishedAt: "2026-06-05",
    coverImage: "/images/locations/el-nido-lagoon.png",
    excerpt:
      "Tour A, B, C, D — what each El Nido island-hopping day actually feels like.",
    content: `El Nido’s island tours are iconic for a reason: limestone cliffs, lagoons, and snorkeling stops that look unreal in person.

Tour A is the classic Big Lagoon route. Tour B leans caves and beaches. Tour C and D trade some crowds for quieter coves.

If you are unsure, enquire with our TREVL team — we match groups to energy level, swim comfort, and timing.`,
    seoTitle: "El Nido Lagoon Tours Compared | Happiness Philippines",
    seoDescription:
      "Compare El Nido Tours A–D and choose the island-hopping day that fits your trip.",
  },
  {
    title: "Siargao for first-time surfers",
    slug: "siargao-for-first-time-surfers",
    category: "surf" as const,
    publishedAt: "2026-06-10",
    coverImage: "/images/experiences/surf-wave.png",
    excerpt:
      "Where beginners learn, when the winds behave, and how a surf retreat week actually runs.",
    content: `Siargao is generous to beginners when you pick the right beach and the right coach.

Cloud Nine gets the fame, but first timers usually learn on softer nearby breaks. A retreat format helps: morning lessons, afternoon recovery, and evenings that still feel like island life.

Bring reef-safe sunscreen, patience, and a willingness to laugh when you wipe out.`,
    seoTitle: "Siargao Surf for Beginners | Happiness Philippines",
    seoDescription:
      "A beginner’s guide to surfing Siargao, including lessons, recovery, and retreat-style weeks.",
  },
  {
    title: "Where to stay in El Nido without the stress",
    slug: "where-to-stay-in-el-nido",
    category: "stays" as const,
    publishedAt: "2026-06-14",
    coverImage: "/images/stays/boutique-room.png",
    excerpt:
      "Town convenience vs quiet corners — how Happiness guests usually choose.",
    content: `El Nido town puts you close to boats, food, and last-minute tour desks. Quieter pockets trade a short ride for better sleep.

Happiness stays are built for travelers who want clean rooms, social energy when they want it, and easy help booking the next day’s adventure.

Book early in peak months; shoulder season often means softer rates and calmer lagoons.`,
    seoTitle: "Where to Stay in El Nido | Happiness Philippines",
    seoDescription:
      "Tips for choosing an El Nido stay: town access, quiet nights, and booking timing.",
  },
  {
    title: "Island food worth planning your day around",
    slug: "island-food-worth-planning-around",
    category: "food" as const,
    publishedAt: "2026-06-18",
    coverImage: "/images/food/happiness-dining.png",
    excerpt:
      "From skate-café bites to sunset happy hours — eat like a Happiness regular.",
    content: `Happiness started in food, and it still shows.

Think long happy hours, shareable plates, and venues that feel social without trying too hard. On Boracay, the skate café sets the tone. In Siargao, Goodies and BBar keep nights easy. In El Nido, restaurant tables become the trip debrief.

Ask staff for the day’s special — island kitchens move with the catch and the crowd.`,
    seoTitle: "Best Island Food Stops | Happiness Philippines",
    seoDescription:
      "Where to eat and drink across Happiness venues in Boracay, El Nido, and Siargao.",
  },
  {
    title: "A wellness reset between boat days",
    slug: "wellness-reset-between-boat-days",
    category: "wellness" as const,
    publishedAt: "2026-06-22",
    coverImage: "/images/experiences/wellness-yoga.png",
    excerpt:
      "Yoga, ice baths, and quiet mornings that make multi-island trips sustainable.",
    content: `Adventure trips fall apart when recovery is an afterthought.

Build one soft morning into every three active days: yoga, breathwork, or a spa hour. Ice baths sound intense until your legs thank you after canyon and boat days.

Wellness is not a separate vacation — it is how you keep the joy going.`,
    seoTitle: "Island Wellness Reset Tips | Happiness Philippines",
    seoDescription:
      "How to add yoga, recovery, and soft mornings into a Philippines island trip.",
  },
  {
    title: "Boracay vs Siargao vs El Nido: which island first?",
    slug: "boracay-vs-siargao-vs-el-nido",
    category: "guides" as const,
    publishedAt: "2026-06-26",
    coverImage: "/images/heroes/home-hero.png",
    excerpt:
      "Beach social, surf capital, or lagoon drama — pick your first Happiness island with intent.",
    content: `Choose Boracay for beach energy and easy nights. Choose Siargao for surf and slow island cool. Choose El Nido for cliffs, lagoons, and boat days.

Many guests do two islands. If you only have one, match the island to your main verb: swim, surf, or explore.

Our teams can help sequence flights and stays so the logistics stay quiet.`,
    seoTitle: "Boracay vs Siargao vs El Nido | Happiness Philippines",
    seoDescription:
      "Compare Boracay, Siargao, and El Nido to choose the right first island for your trip.",
  },
  {
    title: "How Happiness vacation packages actually work",
    slug: "how-vacation-packages-work",
    category: "travel" as const,
    publishedAt: "2026-07-01",
    coverImage: "/images/heroes/tours-hero.png",
    excerpt:
      "Enquiry-based packages, what gets customized, and how our travel team follows up.",
    content: `Our vacation packages are not rigid shopping-cart products. You enquire with dates and preferences; specialists confirm availability, transfers, and pacing.

That keeps multi-day trips human — group size, fitness, and hotel preferences matter.

Start on the Tours page, filter for packages, and send an enquiry. We reply with a clear outline and next steps.`,
    seoTitle: "Happiness Vacation Packages Explained",
    seoDescription:
      "Learn how Happiness Philippines vacation packages are customized through enquiry.",
  },
  {
    title: "What to pack for a Philippines island week",
    slug: "what-to-pack-philippines-island-week",
    category: "guides" as const,
    publishedAt: "2026-07-08",
    coverImage: "/images/stays/private-room.png",
    excerpt:
      "Light layers, reef-safe sunscreen, and the underrated items guests always wish they brought.",
    content: `Pack light, dry-fast clothing, a compact rain shell, and reef-safe sunscreen. Add aqua shoes for rocky entries, a dry bag for boat days, and a small first-aid kit.

Power banks matter more than fancy outfits. So does a reusable bottle.

If you are surfing, ask your retreat host what boards and rash guards are included before you overpack.`,
    seoTitle: "Philippines Island Packing List | Happiness Philippines",
    seoDescription:
      "A practical packing list for Boracay, El Nido, and Siargao island weeks.",
  },
  {
    title: "Night out, Happiness style: events worth catching",
    slug: "happiness-events-worth-catching",
    category: "food" as const,
    publishedAt: "2026-07-15",
    coverImage: "/images/experiences/events-nightlife.png",
    excerpt:
      "Happy hours, bingo, and funky Wednesdays — the weekly rhythm across our islands.",
    content: `Happiness nights are social by design: happy hours that start early, bingo that gets competitive, and midweek music that does not need a guest list.

Check the Events page and filter by island before you arrive. Plans change with weather and season, so ask the venue team the day you land.

The best nights usually start as “just one drink.”`,
    seoTitle: "Happiness Island Events Guide",
    seoDescription:
      "Happy hours and weekly events across Happiness venues in Boracay, El Nido, and Siargao.",
  },
];

async function main() {
  const payload = await getPayload({ config });

  for (const post of posts) {
    const existing = await payload.find({
      collection: "posts",
      draft: true,
      where: { slug: { equals: post.slug } },
      limit: 1,
    });

    const data = {
      ...post,
      _status: "published" as const,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "posts",
        id: existing.docs[0].id,
        data,
        draft: false,
      });
      console.log(`Updated: ${post.title}`);
    } else {
      await payload.create({
        collection: "posts",
        data,
        draft: false,
      });
      console.log(`Created: ${post.title}`);
    }
  }

  console.log(`Seeded ${posts.length} posts.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
