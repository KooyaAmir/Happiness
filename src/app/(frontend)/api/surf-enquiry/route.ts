import { NextResponse } from "next/server";
import { notifyTeam } from "@/lib/email";
import { honeypotTripped } from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  const form = await request.formData();
  const fullName = String(form.get("fullName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const country = String(form.get("country") || "").trim();
  const startDate = String(form.get("startDate") || "").trim();
  const message = String(form.get("message") || "").trim();
  const returnTo = String(form.get("returnTo") || "/surf-retreat").trim() || "/surf-retreat";

  const redirectWith = (status: "sent" | "error") => {
    const url = new URL(returnTo, request.url);
    url.searchParams.set("enquiry", status);
    return NextResponse.redirect(url, 303);
  };

  if (honeypotTripped(form)) return redirectWith("sent");

  if (!fullName || !phone || !country || !startDate) {
    return redirectWith("error");
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "surf-enquiries",
      data: {
        fullName,
        email: email || undefined,
        phone,
        country,
        startDate,
        message: message || undefined,
        status: "new",
      },
      overrideAccess: false,
    });
    await notifyTeam({
      subject: `Surf enquiry: ${startDate}`,
      body: `${fullName} (${email || "no email"}, ${phone}) — ${country}\n${message}`,
    });
    return redirectWith("sent");
  } catch {
    return redirectWith("error");
  }
}
