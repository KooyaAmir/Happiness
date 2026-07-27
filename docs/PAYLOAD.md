# Payload CMS dashboard

Admin URL: [http://localhost:3000/admin](http://localhost:3000/admin)

## Local setup

1. Copy `.env.example` to `.env` (already present for local)
2. `npm install`
3. `npm run dev`
4. Open `/admin` and create the first admin user
5. Seed TREVL tours:

```bash
npm run seed:tours
```

## Collections

- **Users** — dashboard login
- **Media** — uploads
- **Destinations** — tour destinations
- **Tours** — full TREVL catalog (draft/publish)
- **Tour enquiries** — leads from tour detail forms

## Notes

- SQLite DB file: `happiness.db` (gitignored)
- Re-run `npm run seed:tours` to refresh/update migrated tours
- Public `/tours` pages read published tours from Payload
