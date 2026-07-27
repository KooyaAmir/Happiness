import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { JsonLd, jobPostingJsonLd } from "@/components/seo/JsonLd";
import { getJobBySlug, jobLocationLabel } from "@/lib/jobs";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ application?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Role" };
  return {
    title: `${job.title} · Careers`,
    description: job.summary || `Apply for ${job.title} at Happiness Philippines.`,
  };
}

export default async function JobDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { application } = await searchParams;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const returnTo = `/careers/${job.slug}`;

  return (
    <>
      <JsonLd
        data={jobPostingJsonLd({
          ...job,
          locationLabel: jobLocationLabel(job.location),
        })}
      />
      <PageHero
        eyebrow={`${jobLocationLabel(job.location)} · ${job.venue}`}
        title={job.title}
        description={job.summary || "Join the Happiness team."}
        image="/images/experiences/community.png"
        compact
      />
      <Section tone="foam">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <Text as="h2" variant="title">
              About the role
            </Text>
            <Text tone="muted">
              {job.description ||
                `${job.title} at ${job.venue} in ${jobLocationLabel(job.location)}.`}
            </Text>
            <Text tone="muted">
              Employment type: {job.employmentType?.replace("-", " ") || "full time"}
            </Text>
            <Link href="/careers" className="inline-block underline">
              ← All open roles
            </Link>
          </div>

          <form
            className="space-y-4 rounded-[var(--hp-radius-lg)] border border-hp-border bg-white p-6"
            action="/api/job-application"
            method="post"
            encType="multipart/form-data"
          >
            <Text as="h3" variant="heading">
              Apply
            </Text>

            {application === "sent" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-lagoon/30 bg-[color-mix(in_oklab,var(--hp-lagoon)_8%,white)] px-3 py-2 text-[length:var(--hp-text-sm)] text-hp-lagoon">
                Application received. We will be in touch.
              </p>
            ) : null}
            {application === "error" ? (
              <p className="rounded-[var(--hp-radius-md)] border border-hp-coral/40 bg-[color-mix(in_oklab,var(--hp-coral)_10%,white)] px-3 py-2 text-[length:var(--hp-text-sm)]">
                Something went wrong. Please try again or{" "}
                <Link href="/contact" className="underline">
                  contact us
                </Link>
                .
              </p>
            ) : null}

            <input type="hidden" name="jobId" value={job.id} />
            <input type="hidden" name="jobTitle" value={job.title} />
            <input type="hidden" name="returnTo" value={returnTo} />
            <label className="absolute left-[-10000px] h-px w-px overflow-hidden">
              Company website
              <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </label>

            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Full name
              </span>
              <input
                name="fullName"
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Phone / WhatsApp
              </span>
              <input
                name="phone"
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[length:var(--hp-text-xs)] uppercase tracking-[var(--hp-tracking-label)]">
                CV (PDF or Word)
              </span>
              <input
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="w-full rounded-[var(--hp-radius-md)] border border-hp-border px-3 py-2"
              />
            </label>
            <Button type="submit" className="w-full">
              Submit application
            </Button>
          </form>
        </Container>
      </Section>
    </>
  );
}
