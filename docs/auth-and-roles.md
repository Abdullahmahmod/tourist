# Auth and Roles

## Current implementation

- Signed cookie session using `AUTH_SECRET`
- Login and logout flow inside the Next.js app
- Protected dashboards with server-side access checks
- Demo users used as a temporary identity source until the database-backed user model is connected

## Available roles

- Platform admin
- Platform finance
- Company admin
- Company operator
- Agency partner
- Customer support

## Current access model

- `/dashboard/admin`: platform-level administration and finance users
- `/dashboard/operator`: company admin and company operator users
- `/dashboard/agency`: agency users
- `/dashboard/support`: customer support users

Platform admins can also access the operator, agency, and support workspaces for oversight.

## Next production step

- Replace demo users with Prisma-backed users and password hashes
- Add password reset and invite flows
- Connect roles to database permissions and audit logs
