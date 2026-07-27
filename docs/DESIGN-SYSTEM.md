# Happiness Philippines — Design System

Living reference: [`/design-system`](/design-system)

## Direction

**Cinematic tropical.** Deep lagoon, foam light, citrus spark.  
Inspired by spatial craft (Lusion), destination clarity (Masar), brand-as-hero (Virgin Galactic), and atmospheric artistry (2050.earth) — without copying any of them.

## Foundations

| Layer | Choice |
|---|---|
| Display font | Syne |
| Body font | Figtree |
| Mono / labels | IBM Plex Mono |
| Primary action | Citrus `#C6D94E` on ink |
| Surfaces | Foam `#F4F7F5`, Mist `#D7E4DF`, Ink `#07171C` |
| Accent lagoon | `#0F5C66` → `#1A8A96` |

Tokens live in `src/styles/tokens.css` and are wired into Tailwind via `@theme inline`.

## Components

- `Button` — primary / secondary / ghost / inverse
- `Text` — hero → caption scale
- `Container`, `Section`, `Badge`
- `SiteHeader`, `SiteFooter`

Utility: `src/lib/cn.ts`

## Motion

1. **Fade up** — hero and section entrances  
2. **Ken Burns** — slow hero image drift  
3. **Button press** — slight scale on active  

All honor `prefers-reduced-motion`.

## Usage rules

- First viewport: brand, one headline, one supporting sentence, one CTA group, one dominant image.
- No hero cards, floating badges-on-media, or stat strips.
- Prefer venue F&B content nested under stays for SEO focus.
- English now; keep copy keys/simple structure ready for HE / ES / DE / FR later.
