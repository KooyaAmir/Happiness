import type { Post } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export function postCategoryLabel(value: Post["category"] | string) {
  const labels: Record<string, string> = {
    travel: "Travel",
    stays: "Stays",
    food: "Food",
    wellness: "Wellness",
    surf: "Surf",
    guides: "Guides",
  };
  return labels[value] || value;
}

export function paragraphsFromContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export const POST_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "travel", label: "Travel" },
  { value: "stays", label: "Stays" },
  { value: "food", label: "Food" },
  { value: "wellness", label: "Wellness" },
  { value: "surf", label: "Surf" },
  { value: "guides", label: "Guides" },
] as const;

export type PostCategoryFilter = (typeof POST_CATEGORIES)[number]["value"];

export function isPostCategoryFilter(
  value: string | undefined,
): value is PostCategoryFilter {
  return POST_CATEGORIES.some((row) => row.value === value);
}

export async function getPublishedPosts(
  limit = 50,
  category: PostCategoryFilter = "all",
) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    depth: 0,
    limit,
    sort: "-publishedAt",
    where: {
      and: [
        { _status: { equals: "published" } },
        ...(category === "all" ? [] : [{ category: { equals: category } }]),
      ],
    },
  });
  return result.docs;
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    depth: 0,
    limit: 1,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
  });
  return result.docs[0] || null;
}
