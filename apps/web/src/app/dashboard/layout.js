import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardLayout({ children }) {
  const session = await requireAuth();

  return <DashboardShell session={session}>{children}</DashboardShell>;
}
