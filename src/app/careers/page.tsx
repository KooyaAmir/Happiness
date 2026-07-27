import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Happiness Philippines team across Boracay, El Nido, and Siargao.",
};

const roles = [
  { title: "Restaurant Manager", location: "Boracay", venue: "Happiness Hostel Boracay" },
  { title: "Bartenders", location: "Siargao", venue: "Goodies & HResto" },
  { title: "Receptionist", location: "Siargao", venue: "HResto" },
  { title: "Shift Manager", location: "Siargao", venue: "BBar" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Join our team"
        title="Join the Happiness family."
        description="A proper jobs board is coming in the dashboard. Browse open roles and apply below."
        image="/images/experiences/community.png"
        compact
      />
      <Section tone="foam">
        <Container className="space-y-8">
          <div className="divide-y divide-hp-border border-y border-hp-border">
            {roles.map((role) => (
              <div key={`${role.title}-${role.location}`} className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <Text as="h2" variant="heading">
                    {role.title}
                  </Text>
                  <Text tone="muted">
                    {role.location} · {role.venue}
                  </Text>
                </div>
                <Button href="/contact">Apply</Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
