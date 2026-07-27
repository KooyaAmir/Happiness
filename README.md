# Happiness Philippines

Next.js rebuild of [happinessphilippines.com](https://happinessphilippines.com/) — stays, tours, wellness, events, and a central dashboard. Not WordPress.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS v4
- Design tokens + UI primitives in `src/`
- Boom (rooms) + Xendit (payments) + Payload CMS — coming next

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin).  
Design system: [http://localhost:3000/design-system](http://localhost:3000/design-system).

Seed TREVL tours into Payload:

```bash
npm run seed:tours
```

## Project docs

- [Design system](./docs/DESIGN-SYSTEM.md)
- [Images](./docs/IMAGES.md)
- [Payload dashboard](./docs/PAYLOAD.md)

## Git

Remote: `git@github.com:KooyaAmir/Happiness.git` (branch `main`)

Portable Git is available at `%LOCALAPPDATA%\Programs\portable-git\bin\git.exe` if system Git is not on PATH.
