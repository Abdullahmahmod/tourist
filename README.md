# Luxor Balloon Hub

Monorepo starter for a multi-company booking platform serving hot air balloon operators in Luxor.

## Workspace

- `apps/web`: Next.js marketing site and platform prototype
- `packages/db`: Prisma schema for the multi-tenant booking system
- `docs`: business and technical discovery notes

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Current scope

- Bilingual Arabic/English landing experience
- Portal preview for platform dashboards
- Multi-tenant data model for companies, trips, bookings, tickets, payments, and partner agencies
- Discovery documentation for MVP scope and phased delivery
- Prototype login flow with signed sessions and role-based dashboard access
- Company self-registration, public program listings, and booking request capture

## Demo auth accounts

- Platform admin: `admin@luxorballoon.test` / `Admin@123`
- Platform finance: `finance@luxorballoon.test` / `Finance@123`
- Company admin: `operator.admin@luxorballoon.test` / `Operator@123`
- Company operations: `ops@luxorballoon.test` / `Ops@123`
- Agency partner: `agency@luxorballoon.test` / `Agency@123`
- Customer support: `support@luxorballoon.test` / `Support@123`
