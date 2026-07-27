import { NextResponse } from "next/server";
import { notifyTeam } from "@/lib/email";
import { honeypotTripped } from "@/lib/forms";
import { getPayloadClient } from "@/lib/payload";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request: Request) {
  const form = await request.formData();
  const fullName = String(form.get("fullName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const jobId = String(form.get("jobId") || "").trim();
  const jobTitle = String(form.get("jobTitle") || "").trim();
  const message = String(form.get("message") || "").trim();
  const returnTo = String(form.get("returnTo") || "/careers").trim() || "/careers";
  const cv = form.get("cv");

  const redirectWith = (status: "sent" | "error") => {
    const url = new URL(returnTo, request.url);
    url.searchParams.set("application", status);
    return NextResponse.redirect(url, 303);
  };

  if (honeypotTripped(form)) return redirectWith("sent");

  if (!fullName || !email) {
    return redirectWith("error");
  }

  try {
    const payload = await getPayloadClient();
    let cvId: number | undefined;

    if (cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_CV_BYTES || (cv.type && !ALLOWED_CV_TYPES.has(cv.type))) {
        return redirectWith("error");
      }
      const bytes = Buffer.from(await cv.arrayBuffer());
      const media = await payload.create({
        collection: "media",
        data: {
          alt: `CV — ${fullName}`,
        },
        file: {
          data: bytes,
          mimetype: cv.type || "application/pdf",
          name: cv.name || `${fullName.replace(/\s+/g, "-").toLowerCase()}-cv.pdf`,
          size: bytes.byteLength,
        },
        overrideAccess: true,
      });
      cvId = media.id as number;
    }

    await payload.create({
      collection: "job-applications",
      data: {
        fullName,
        email,
        phone: phone || undefined,
        job: jobId ? Number(jobId) : undefined,
        jobTitle: jobTitle || undefined,
        message: message || undefined,
        cv: cvId,
        status: "new",
      },
      overrideAccess: false,
    });
    await notifyTeam({
      subject: `Job application: ${jobTitle || "Role"}`,
      body: `${fullName} (${email}, ${phone || "no phone"})\n${message}`,
    });
    return redirectWith("sent");
  } catch {
    return redirectWith("error");
  }
}
