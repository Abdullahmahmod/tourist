import { redirect } from "next/navigation";

import { registerCompanyAction } from "@/app/register/company/actions";
import { CompanyRegisterForm } from "@/components/auth/company-register-form";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function RegisterCompanyPage() {
  const session = await getSession();

  if (session) {
    redirect(session.dashboardPath || "/dashboard");
  }

  return (
    <main className="page-shell auth-page">
      <CompanyRegisterForm action={registerCompanyAction} />
    </main>
  );
}
