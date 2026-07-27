/**
 * Email notify stub — writes to console until an email adapter is configured.
 * Set CONTACT_NOTIFY_EMAIL to control the destination address in logs.
 */

export async function notifyTeam(input: {
  subject: string;
  body: string;
}) {
  const to = process.env.CONTACT_NOTIFY_EMAIL || "ops@happinessphilippines.com";
  console.info(`[notify] to=${to} subject=${input.subject}`);
  console.info(input.body);
  return { delivered: false as const, mode: "console" as const, to };
}
