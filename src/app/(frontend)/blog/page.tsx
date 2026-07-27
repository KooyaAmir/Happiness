import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import {
  POST_CATEGORIES,
  getPublishedPosts,
  isPostCategoryFilter,
  postCategoryLabel,
} from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Travel guides, island tips, and Happiness stories from Boracay, El Nido, and Siargao.",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = isPostCategoryFilter(params.category) ? params.category : "all";
  const posts = await getPublishedPosts(50, category);

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Stories from the islands."
        description="Guides and notes to help you plan stays, tours, surf, and slow island days."
        image="/images/locations/el-nido-lagoon.png"
        compact
      />
      <Section tone="foam">
        <Container className="space-y-8">
          <div className="flex flex-wrap gap-2">
            {POST_CATEGORIES.map((filter) => {
              const href =
                filter.value === "all" ? "/blog" : `/blog?category=${filter.value}`;
              const active = category === filter.value;
              return (
                <Link
                  key={filter.value}
                  href={href}
                  className={cn(
                    "rounded-[var(--hp-radius-pill)] border px-4 py-2 font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] transition-colors",
                    active
                      ? "border-hp-ink bg-hp-ink text-hp-foam"
                      : "border-hp-border text-hp-ink hover:border-hp-ink",
                  )}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>

          {posts.length === 0 ? (
            <Text tone="muted">No posts in this category yet. Check back soon.</Text>
          ) : (
            <div className="divide-y divide-hp-border border-y border-hp-border">
              {posts.map((post) => (
                <article key={post.id} className="grid gap-3 py-6 md:grid-cols-[1fr_2fr]">
                  <div className="space-y-2">
                    <Text as="p" variant="label" tone="lagoon">
                      {postCategoryLabel(post.category)}
                    </Text>
                    <Text tone="muted">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-PH", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : null}
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text as="h2" variant="heading">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </Text>
                    <Text tone="muted">{post.excerpt}</Text>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)] underline"
                    >
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
