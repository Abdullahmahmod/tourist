import { redirect } from "next/navigation";

import { getDefaultDashboardPath } from "@/lib/auth/roles";
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardEntryPage() {
  const session = await requireAuth();
  redirect(getDefaultDashboardPath(session.role));
}
