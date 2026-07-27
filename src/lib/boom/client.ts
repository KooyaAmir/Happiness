/**
 * Boom Channel Manager client stub.
 * Wire live availability once Boom API credentials are provided.
 */

export type BoomSearchParams = {
  location: "boracay" | "el-nido" | "siargao";
  checkIn: string;
  checkOut: string;
  guests?: number;
};

export type BoomAvailabilityResult = {
  configured: boolean;
  message: string;
  rooms: Array<{
    id: string;
    name: string;
    rateFrom?: number;
    currency?: string;
  }>;
};

export function isBoomConfigured() {
  return Boolean(process.env.BOOM_API_KEY && process.env.BOOM_PROPERTY_IDS);
}

export async function searchBoomAvailability(
  params: BoomSearchParams,
): Promise<BoomAvailabilityResult> {
  if (!isBoomConfigured()) {
    return {
      configured: false,
      message:
        "Boom API is not configured yet. Add BOOM_API_KEY and BOOM_PROPERTY_IDS to enable live availability.",
      rooms: [],
    };
  }

  // Placeholder until Boom credentials + endpoint docs are available.
  void params;
  return {
    configured: true,
    message: "Boom client scaffolded — implement endpoint mapping next.",
    rooms: [],
  };
}
