# Booking integrations (Boom + Xendit)

Room booking is scaffolded and waiting on credentials.

## Status

| Piece | Status |
|---|---|
| `/book` search UI | Ready |
| `GET /api/book/availability` | Stub — returns 503 until Boom keys exist |
| `src/lib/boom/client.ts` | Stub client |
| `src/lib/xendit/client.ts` | Stub client |

## Required env

```bash
BOOM_API_KEY=
BOOM_PROPERTY_IDS=
BOOM_API_BASE_URL=
XENDIT_SECRET_KEY=
XENDIT_WEBHOOK_TOKEN=
NEXT_PUBLIC_XENDIT_PUBLIC_KEY=
```

## Next implementation steps (after credentials)

1. Map Boom property IDs to Boracay / El Nido / Siargao
2. Implement availability + rate fetch in `searchBoomAvailability`
3. Create hold/reservation before payment
4. Create Xendit invoice and webhook handler
5. Confirm booking in Boom after successful payment
