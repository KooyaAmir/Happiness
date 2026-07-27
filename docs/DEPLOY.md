# Staging & Hostinger deploy

Cutover target: end of September via staging → production domain.

## Prerequisites

- Hostinger plan / Node hosting or VPS details
- Domain DNS access for `happinessphilippines.com`
- Production secrets: `PAYLOAD_SECRET`, Boom, Xendit, analytics IDs

## Suggested flow

1. Deploy this Next.js app to a Hostinger staging subdomain
2. Use a dedicated SQLite file or move to Postgres if Hostinger prefers managed DB
3. Run seeds once on staging (`seed:tours`, `seed:events`, `seed:jobs`, `seed:posts`)
4. Create admin user at `/admin`
5. QA booking shell, tours, events, careers, blog, all lead forms
6. Point production domain after sign-off

## Build commands

```bash
npm ci
npm run build
npm run start
```

## Still needed from team

- Hostinger access / preferred deploy method (Node app vs VPS)
- Staging subdomain name
- Production env values
