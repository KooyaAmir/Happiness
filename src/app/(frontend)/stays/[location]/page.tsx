import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationExperience } from "@/components/stays/LocationExperience";
import { getLocation, locations } from "@/content/site";

type Props = {
  params: Promise<{ location: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ location: location.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) return { title: "Stay" };
  return {
    title: `${location.name} stays`,
    description: location.summary,
    openGraph: {
      title: `${location.name} · Happiness Philippines`,
      description: location.summary,
      images: [{ url: location.heroImage }],
    },
  };
}

export default async function LocationStayPage({ params }: Props) {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return <LocationExperience location={location} />;
}
