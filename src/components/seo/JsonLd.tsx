type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Happiness Philippines",
    url: siteUrl,
    logo: `${siteUrl}/brand/happiness-logo.png`,
    description:
      "Stays, tours, wellness, and island life across Boracay, El Nido, and Siargao.",
    sameAs: ["https://happinessphilippines.com"],
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt?: string | null;
  coverImage?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt || undefined,
    image: post.coverImage ? `${siteUrl}${post.coverImage}` : undefined,
    publisher: {
      "@type": "Organization",
      name: "Happiness Philippines",
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/happiness-logo.png` },
    },
  };
}

export function tourJsonLd(tour: {
  title: string;
  summary?: string | null;
  destinationSlug: string;
  destinationName: string;
  slug: string;
  priceFrom?: number | null;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary || `${tour.title} in ${tour.destinationName}.`,
    url: `${siteUrl}/tours/${tour.destinationSlug}/${tour.slug}`,
    touristType: "Leisure",
    image: tour.image,
    provider: { "@type": "Organization", name: "Happiness Philippines", url: siteUrl },
    ...(tour.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            price: tour.priceFrom,
            priceCurrency: "PHP",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  slug: string;
  summary?: string | null;
  description?: string | null;
  locationLabel: string;
  venue: string;
  employmentType?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.summary || `${job.title} at ${job.venue}.`,
    url: `${siteUrl}/careers/${job.slug}`,
    employmentType: (job.employmentType || "full-time").toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: "Happiness Philippines",
      sameAs: siteUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.locationLabel,
        addressCountry: "PH",
      },
    },
  };
}
