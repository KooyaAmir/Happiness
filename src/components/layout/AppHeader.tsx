"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function AppHeader() {
  const pathname = usePathname();
  const transparent = pathname === "/";

  return <SiteHeader transparent={transparent} />;
}
