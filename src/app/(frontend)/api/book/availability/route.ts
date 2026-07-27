import { NextResponse } from "next/server";
import { searchBoomAvailability, type BoomSearchParams } from "@/lib/boom/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "boracay";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number(searchParams.get("guests") || 2);

  if (!["boracay", "el-nido", "siargao"].includes(location) || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: "Provide location, checkIn, and checkOut query params." },
      { status: 400 },
    );
  }

  const result = await searchBoomAvailability({
    location: location as BoomSearchParams["location"],
    checkIn,
    checkOut,
    guests: Number.isFinite(guests) ? guests : 2,
  });

  return NextResponse.json(result, {
    status: result.configured ? 200 : 503,
  });
}
