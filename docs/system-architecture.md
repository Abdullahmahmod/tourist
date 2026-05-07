# System Architecture

## Recommended stack

- Frontend: Next.js web application for website, dashboards, and future admin tools
- Backend: Next.js route handlers initially, with a clean path to dedicated services if scale requires it
- Database: PostgreSQL
- ORM: Prisma
- Auth direction: role-based access with platform admin, operator admin, operator staff, agency, and support roles
- Payments: abstraction layer that can support multiple providers

## Core bounded domains

1. Identity and access
2. Company onboarding
3. Flight inventory and availability
4. Pricing and contracts
5. Reservations and ticket issuance
6. Payments and reconciliation
7. Reporting and audit logs
8. Integrations and external APIs

## Multi-tenant model

- One platform database
- Shared core tables with `companyId` isolation
- Platform-level admins can view all companies
- Company users only see their own inventory, bookings, and partners
- Agencies can be attached to one or more companies with dedicated pricing rules

## Integration roadmap

- Phase 1: payment gateways, email or WhatsApp notifications, PDF vouchers
- Phase 2: Shopify storefront modules and partner APIs
- Phase 3: Amadeus, Booking.com, and other travel-distribution integrations
- Phase 4: temple, transport, and sound-and-light ticketing bundles
