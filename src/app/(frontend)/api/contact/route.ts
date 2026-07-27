import { NextResponse } from "next/server";
import { notifyTeam } from "@/lib/email";
import { honeypotTripped } from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";

const LOCATIONS = new Set(["boracay", "el-nido", "siargao", "general"]);

export async function POST(request: Request) {
  const form = await request.formData();
  const fullName = String(form.get("fullName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const locationRaw = String(form.get("location") || "general").trim();
  const location = LOCATIONS.has(locationRaw) ? locationRaw : "general";
  const message = String(form.get("message") || "").trim();
  const returnTo = String(form.get("returnTo") || "/contact").trim() || "/contact";

  const redirectWith = (status: "sent" | "error") => {
    const url = new URL(returnTo, request.url);
    url.searchParams.set("contact", status);
    return NextResponse.redirect(url, 303);
  };

  if (honeypotTripped(form)) return redirectWith("sent");

  if (!fullName || !email || !message) {
    return redirectWith("error");
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "contact-enquiries",
      data: {
        fullName,
        email,
        location: location as "boracay" | "el-nido" | "siargao" | "general",
        message,
        status: "new",
      },
      overrideAccess: false,
    });
    await notifyTeam({
      subject: `Contact: ${location}`,
      body: `${fullName} (${email})\n${message}`,
    });
    return redirectWith("sent");
  } catch {
    return redirectWith("error");
  }
}
