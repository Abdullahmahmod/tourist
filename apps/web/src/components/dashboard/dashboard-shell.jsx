import Link from "next/link";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { LogoutForm } from "@/components/dashboard/logout-form";
import { getDashboardNavigation, getRoleLabel } from "@/lib/auth/roles";

export function DashboardShell({ session, children }) {
  const navItems = getDashboardNavigation(session.role, "ar");

  return (
    <div className="page-shell dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <p className="brand-kicker">Luxor Balloon Hub</p>
          <h1 className="brand-title">بوابة التشغيل</h1>
          <p className="dashboard-copy">
            لوحات تحكم مخصصة للإدارة والشركات والشركاء، مع وصول مضبوط حسب الدور.
          </p>
        </div>

        <div className="dashboard-user-card">
          <span className="user-role-tag">{getRoleLabel(session.role, "ar")}</span>
          <strong>{session.fullName}</strong>
          <p>{session.organizationName}</p>
          <span>{session.email}</span>
        </div>

        <DashboardNav items={navItems} />

        <div className="dashboard-side-actions">
          <Link className="button secondary" href="/">
            العودة للموقع
          </Link>
          <LogoutForm />
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="section-kicker">Workspace</span>
            <h2 className="dashboard-title">مرحبًا، {session.fullName}</h2>
          </div>
          <div className="dashboard-header-meta">
            <span className="status-chip">Session active</span>
            <span className="status-chip status-chip-muted">
              {getRoleLabel(session.role, "en")}
            </span>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
