import { NextResponse } from "next/server";
import { notifyTeam } from "@/lib/email";
import { honeypotTripped } from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  const form = await request.formData();
  const fullName = String(form.get("fullName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const travellers = Number(form.get("travellers") || 0);
  const preferredDate = String(form.get("preferredDate") || "").trim();
  const tourId = String(form.get("tourId") || "").trim();
  const tourTitle = String(form.get("tourTitle") || "").trim();
  const message = String(form.get("message") || "").trim();
  const returnTo = String(form.get("returnTo") || "/tours").trim() || "/tours";

  const redirectWith = (status: "sent" | "error") => {
    const url = new URL(returnTo, request.url);
    url.searchParams.set("enquiry", status);
    return NextResponse.redirect(url, 303);
  };

  if (honeypotTripped(form)) return redirectWith("sent");

  if (!fullName || !email || !phone || !Number.isFinite(travellers) || travellers < 1) {
    return redirectWith("error");
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "tour-enquiries",
      data: {
        fullName,
        email,
        phone,
        travellers,
        preferredDate: preferredDate || undefined,
        tour: tourId ? Number(tourId) : undefined,
        tourTitle: tourTitle || undefined,
        message: message || undefined,
        status: "new",
      },
      overrideAccess: false,
    });
    await notifyTeam({
      subject: `Tour enquiry: ${tourTitle || "Tour"}`,
      body: `${fullName} (${email}, ${phone}) — ${travellers} travellers — ${preferredDate || "no date"}\n${message}`,
    });
    return redirectWith("sent");
  } catch {
    return redirectWith("error");
  }
}
