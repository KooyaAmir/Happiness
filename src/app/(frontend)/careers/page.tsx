import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getOpenJobs, jobLocationLabel } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Happiness Philippines team across Boracay, El Nido, and Siargao.",
};

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const jobs = await getOpenJobs();

  return (
    <>
      <PageHero
        eyebrow="Join our team"
        title="Join the Happiness family."
        description="Open roles across Boracay, El Nido, and Siargao — apply from the dashboard-managed jobs board."
        image="/images/experiences/community.png"
        compact
      />
      <Section tone="foam">
        <Container className="space-y-8">
          {jobs.length === 0 ? (
            <Text tone="muted">
              No open roles right now.{" "}
              <Link href="/contact" className="underline">
                Send us a message
              </Link>{" "}
              anyway — we keep good people in mind.
            </Text>
          ) : (
            <div className="divide-y divide-hp-border border-y border-hp-border">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <Text as="h2" variant="heading">
                      {job.title}
                    </Text>
                    <Text tone="muted">
                      {jobLocationLabel(job.location)} · {job.venue}
                    </Text>
                    {job.summary ? <Text tone="muted">{job.summary}</Text> : null}
                  </div>
                  <Button href={`/careers/${job.slug}`}>Apply</Button>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
