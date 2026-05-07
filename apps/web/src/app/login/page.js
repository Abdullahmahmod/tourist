import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { loginAction } from "@/app/login/actions";
import { getLoginDemoAccounts } from "@/lib/auth/demo-users";
import { getSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect(session.dashboardPath || "/dashboard");
  }

  return (
    <main className="page-shell auth-page">
      <LoginForm
        action={loginAction}
        demoAccounts={getLoginDemoAccounts()}
        locale={process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "ar"}
      />
    </main>
  );
}
