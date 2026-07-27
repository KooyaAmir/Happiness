import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { isBoomConfigured, searchBoomAvailability } from "@/lib/boom/client";
import { isXenditConfigured } from "@/lib/xendit/client";

export const metadata: Metadata = {
  title: "Book your stay",
  description: "Search Happiness stays across Boracay, El Nido, and Siargao.",
};

type Props = {
  searchParams: Promise<{
    location?: string;
    checkIn?: string;
    checkOut?: string;
    status?: string;
  }>;
};

export default async function BookPage({ searchParams }: Props) {
  const params = await searchParams;
  const boomReady = isBoomConfigured();
  const xenditReady = isXenditConfigured();

  let availabilityMessage =
    "Live availability connects once Boom credentials are added.";
  let rooms: Array<{ id: string; name: string; rateFrom?: number }> = [];

  if (
    params.checkIn &&
    params.checkOut &&
    params.location &&
    ["boracay", "el-nido", "siargao"].includes(params.location)
  ) {
    const data = await searchBoomAvailability({
      location: params.location as "boracay" | "el-nido" | "siargao",
      checkIn: params.checkIn,
      checkOut: params.checkOut,
    });
    availabilityMessage = data.message;
    rooms = data.rooms;
  }

  return (
    <>
      <PageHero
        eyebrow="Book stay"
        title="Find your room."
        description="Search Happiness stays across Boracay, El Nido, and Siargao. Checkout uses Xendit once Boom inventory is live."
        image="/images/stays/private-room.png"
        compact
      />
      <Section tone="foam">
        <Container className="space-y-6">
          <form
            className="grid gap-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
            method="get"
          >
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Location
              </span>
              <select
                name="location"
                defaultValue={params.location || "boracay"}
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-3"
              >
                <option value="boracay">Boracay</option>
                <option value="el-nido">El Nido</option>
                <option value="siargao">Siargao</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Check-in
              </span>
              <input
                name="checkIn"
                type="date"
                required
                defaultValue={params.checkIn}
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-3"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Check-out
              </span>
              <input
                name="checkOut"
                type="date"
                required
                defaultValue={params.checkOut}
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-3"
              />
            </label>
            <Button type="submit" size="lg">
              Check availability
            </Button>
          </form>

          <div className="space-y-2 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-5">
            <Text as="h2" variant="heading">
              Integration status
            </Text>
            <Text tone="muted">
              Boom inventory: {boomReady ? "credentials detected" : "waiting for API keys"}
            </Text>
            <Text tone="muted">
              Xendit checkout: {xenditReady ? "credentials detected" : "waiting for API keys"}
            </Text>
            <Text tone="muted">{availabilityMessage}</Text>
          </div>

          {rooms.length ? (
            <div className="divide-y divide-hp-border border-y border-hp-border">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <Text as="h3" variant="heading">
                    {room.name}
                  </Text>
                  <Text>
                    {room.rateFrom != null ? `From ₱${room.rateFrom.toLocaleString()}` : "Rate on request"}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}

          <Text tone="muted">
            Prefer human help while booking goes live?{" "}
            <a href="/contact" className="underline">
              Contact the island team
            </a>
            .
          </Text>
        </Container>
      </Section>
    </>
  );
}
