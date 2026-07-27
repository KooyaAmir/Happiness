import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";

export default function Home() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden text-hp-foam">
      <div aria-hidden className="absolute inset-0 hp-grain" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 hp-kenburns"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-hp-ink via-hp-ink/55 to-hp-ink/25"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-[calc(var(--hp-header-h)+2rem)] md:pb-20">
        <div className="max-w-3xl space-y-6">
          <Badge className="hp-fade-up">Happiness Philippines</Badge>
          <Text as="h1" variant="hero" tone="inverse" className="hp-fade-up hp-fade-up-delay-1">
            Island life, designed for joy.
          </Text>
          <Text
            variant="lede"
            tone="inverse"
            className="max-w-xl opacity-85 hp-fade-up hp-fade-up-delay-2"
          >
            Stays, tours, and soulful spaces across Boracay, El Nido, and
            Siargao — one brand, three islands, endless reasons to stay longer.
          </Text>
          <div className="flex flex-wrap gap-3 pt-2 hp-fade-up hp-fade-up-delay-3">
            <Button href="/book" size="lg">
              Book your stay
            </Button>
            <Button href="/tours" size="lg" variant="ghost" className="border-hp-foam text-hp-foam">
              Explore tours
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
