/**
 * Xendit payments client stub.
 * Connect checkout after Boom holds inventory and Xendit keys are available.
 */

export function isXenditConfigured() {
  return Boolean(process.env.XENDIT_SECRET_KEY);
}

export async function createStayPaymentIntent(input: {
  amount: number;
  currency?: string;
  externalId: string;
  description: string;
}) {
  if (!isXenditConfigured()) {
    return {
      configured: false as const,
      message: "Xendit is not configured. Add XENDIT_SECRET_KEY to enable checkout.",
    };
  }

  void input;
  return {
    configured: true as const,
    message: "Xendit client scaffolded — create invoice/payment request next.",
  };
}
