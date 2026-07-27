import { NextResponse } from "next/server";
import { notifyTeam } from "@/lib/email";
import { honeypotTripped } from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";

const SOURCES = new Set(["vacation-package", "wellness", "other"]);

export async function POST(request: Request) {
  const form = await request.formData();
  const fullName = String(form.get("fullName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const sourceRaw = String(form.get("source") || "other").trim();
  const source = SOURCES.has(sourceRaw) ? sourceRaw : "other";
  const subject = String(form.get("subject") || "").trim();
  const message = String(form.get("message") || "").trim();
  const returnTo = String(form.get("returnTo") || "/contact").trim() || "/contact";

  const redirectWith = (status: "sent" | "error") => {
    const url = new URL(returnTo, request.url);
    url.searchParams.set("lead", status);
    return NextResponse.redirect(url, 303);
  };

  if (honeypotTripped(form)) return redirectWith("sent");

  if (!fullName || !email || !message) {
    return redirectWith("error");
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "lead-enquiries",
      data: {
        fullName,
        email,
        phone: phone || undefined,
        source: source as "vacation-package" | "wellness" | "other",
        subject: subject || undefined,
        message,
        status: "new",
      },
      overrideAccess: false,
    });
    await notifyTeam({
      subject: `Lead (${source}): ${subject || fullName}`,
      body: `${fullName} (${email}, ${phone || "no phone"})\n${message}`,
    });
    return redirectWith("sent");
  } catch {
    return redirectWith("error");
  }
}
