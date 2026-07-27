# Payload CMS dashboard

Admin URL: [http://localhost:3000/admin](http://localhost:3000/admin)

## Local setup

1. Copy `.env.example` to `.env`
2. `npm install`
3. `npm run dev`
4. Open `/admin` and create the first admin user
5. Seed content:

```bash
npm run seed:all
```

Or individually:

```bash
npm run seed:tours
npm run seed:events
npm run seed:jobs
npm run seed:posts
```

## Collections

- **Users** — dashboard login
- **Media** — uploads
- **Destinations** — tour destinations
- **Tours** — TREVL catalog + vacation packages (draft/publish)
- **Tour enquiries** — `/api/tour-enquiry`
- **Events** — island events with location filter
- **Jobs** / **Job applications** — careers board
- **Contact enquiries** — `/api/contact`
- **Surf enquiries** — `/api/surf-enquiry`
- **Lead enquiries** — wellness/package/misc via `/api/lead`
- **Posts** — journal / blog

## Notes

- SQLite DB file: `happiness.db` (gitignored)
- Stop `npm run dev` before seed scripts if schema push conflicts appear
- Public pages read published documents from Payload
