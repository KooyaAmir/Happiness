/** Shared lead-form helpers */

export function honeypotTripped(form: FormData) {
  return String(form.get("companyWebsite") || "").trim().length > 0;
}

export function honeypotFieldClassName() {
  return "absolute left-[-10000px] top-auto h-px w-px overflow-hidden";
}

export function redirectWithStatus(
  request: Request,
  returnTo: string,
  param: string,
  status: "sent" | "error",
) {
  const url = new URL(returnTo || "/", request.url);
  url.searchParams.set(param, status);
  return Response.redirect(url, 303);
}
