import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import {
  getPostBySlug,
  paragraphsFromContent,
  postCategoryLabel,
} from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = paragraphsFromContent(post.content);

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <section className="relative min-h-[48vh] overflow-hidden bg-hp-ink text-hp-foam">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            className="object-cover opacity-55"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/55 to-hp-ink/20" />
        <Container className="relative flex min-h-[48vh] flex-col justify-end gap-4 py-16">
          <Text as="p" variant="label" tone="citrus">
            {postCategoryLabel(post.category)}
          </Text>
          <Text as="h1" variant="display" tone="inverse">
            {post.title}
          </Text>
          <Text tone="inverse" className="max-w-2xl opacity-85">
            {post.excerpt}
          </Text>
        </Container>
      </section>

      <Section tone="foam">
        <Container className="max-w-3xl space-y-6">
          <Text tone="muted">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-PH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : null}
          </Text>
          {paragraphs.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} tone="muted">
              {paragraph}
            </Text>
          ))}
          <Link href="/blog" className="inline-block underline">
            ← Back to journal
          </Link>
        </Container>
      </Section>
    </>
  );
}
