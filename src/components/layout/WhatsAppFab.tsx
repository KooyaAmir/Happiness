"use client";

import Link from "next/link";

const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "639673763265";

export function WhatsAppFab() {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi Happiness! I have a question about stays / tours.",
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-[var(--hp-radius-pill)] bg-[#25D366] px-4 py-3 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] text-white shadow-[var(--hp-shadow-soft)] transition-transform hover:scale-[1.03]"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </Link>
  );
}
