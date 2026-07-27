import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { getPublishedTours } from "@/lib/tours";
import { getOpenJobs } from "@/lib/jobs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/stays",
    "/stays/boracay",
    "/stays/el-nido",
    "/stays/siargao",
    "/tours",
    "/food",
    "/events",
    "/wellness",
    "/surf-retreat",
    "/story",
    "/blog",
    "/careers",
    "/contact",
    "/book",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const venueRoutes = [
    "/stays/boracay/happiness-hostel",
    "/stays/el-nido/happiness-hostel",
    "/stays/el-nido/boutique-villas",
    "/stays/el-nido/boutique-resort",
    "/stays/siargao/happiness-hostel",
    "/stays/siargao/beach-resort",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const [posts, tours, jobs] = await Promise.all([
    getPublishedPosts(100).catch(() => []),
    getPublishedTours({ limit: 200 }).catch(() => []),
    getOpenJobs().catch(() => []),
  ]);

  return [
    ...staticRoutes,
    ...venueRoutes,
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    })),
    ...tours.map((tour) => ({
      url: `${siteUrl}/tours/${tour.destinationSlug}/${tour.slug}`,
      lastModified: new Date(),
    })),
    ...jobs.map((job) => ({
      url: `${siteUrl}/careers/${job.slug}`,
      lastModified: new Date(),
    })),
  ];
}
