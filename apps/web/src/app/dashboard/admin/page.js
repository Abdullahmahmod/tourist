import { DashboardStatus } from "@/components/dashboard/dashboard-status";
import { DashboardTable } from "@/components/dashboard/dashboard-table";
import { adminDashboardContent } from "@/content/dashboard-content";
import { requireSectionAccess } from "@/lib/auth/session";

function renderMetricCard(card) {
  return (
    <article
      key={card.label}
      className={`dashboard-card dashboard-kpi dashboard-kpi-${card.tone}`}
    >
      <span>{card.label}</span>
      <strong>{card.value}</strong>
      <small>{card.trend}</small>
    </article>
  );
}

export default async function AdminDashboardPage() {
  const session = await requireSectionAccess("admin");

  const companyColumns = [
    { key: "company", label: "الشركة" },
    { key: "occupancy", label: "الإشغال" },
    { key: "revenue", label: "الإيراد" },
    { key: "payout", label: "مستحقات الشركة" },
    { key: "status", label: "الحالة" },
  ];

  const companyRows = adminDashboardContent.companyRows.map((row) => ({
    id: row.id,
    company: (
      <div className="dashboard-entity">
        <strong>{row.company}</strong>
        <span>{row.manager}</span>
        <small>{row.note}</small>
      </div>
    ),
    occupancy: (
      <div className="dashboard-entity">
        <strong>{row.occupancy}</strong>
        <span>{row.seats}</span>
      </div>
    ),
    revenue: <strong>{row.revenue}</strong>,
    payout: <strong>{row.payout}</strong>,
    status: <DashboardStatus tone={row.tone}>{row.status}</DashboardStatus>,
  }));

  return (
    <div className="dashboard-page">
      <section className="dashboard-banner dashboard-banner-hero">
        <div className="dashboard-banner-copy">
          <span className="section-kicker">{adminDashboardContent.banner.kicker}</span>
          <h3>{adminDashboardContent.banner.title}</h3>
          <p>
            {session.organizationName}: {adminDashboardContent.banner.description}
          </p>
        </div>

        <div className="dashboard-chip-row">
          {adminDashboardContent.banner.chips.map((chip) => (
            <span key={chip} className="dashboard-filter-chip">
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="dashboard-grid">
        {adminDashboardContent.kpis.map(renderMetricCard)}
      </section>

      <section className="dashboard-columns-3">
        <article className="dashboard-card dashboard-surface">
          <div className="dashboard-panel-head">
            <div>
              <h4>توزيع قنوات الحجز</h4>
              <p className="dashboard-subtitle">
                صورة سريعة لمزيج المبيعات عبر المنصة اليوم.
              </p>
            </div>
          </div>

          <div className="dashboard-progress-list">
            {adminDashboardContent.channelMix.map((channel) => (
              <div key={channel.label} className="dashboard-progress-item">
                <div className="dashboard-progress-top">
                  <span>{channel.label}</span>
                  <strong>{channel.value}</strong>
                </div>
                <div className="dashboard-progress-track">
                  <span style={{ width: `${channel.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card dashboard-surface">
          <div className="dashboard-panel-head">
            <div>
              <h4>قائمة الاعتمادات العاجلة</h4>
              <p className="dashboard-subtitle">أكثر العناصر التي تحتاج قرارًا من الإدارة.</p>
            </div>
          </div>

          <div className="dashboard-stack">
            {adminDashboardContent.approvals.map((item) => (
              <div key={item.title} className="dashboard-note-card">
                <DashboardStatus tone={item.tone}>{item.title}</DashboardStatus>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card dashboard-surface">
          <div className="dashboard-panel-head">
            <div>
              <h4>حالة الربط الخارجي</h4>
              <p className="dashboard-subtitle">نظرة على مدى جاهزية التكاملات الأساسية.</p>
            </div>
          </div>

          <div className="dashboard-stack">
            {adminDashboardContent.integrations.map((item) => (
              <div key={item.name} className="dashboard-inline-card">
                <div className="dashboard-inline-head">
                  <strong>{item.name}</strong>
                  <DashboardStatus tone={item.tone}>{item.status}</DashboardStatus>
                </div>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-split dashboard-split-wide">
        <DashboardTable
          title="أداء الشركات اليوم"
          caption="إشغال الرحلات، الإيراد، والحالة التشغيلية لكل شركة."
          columns={companyColumns}
          rows={companyRows}
        />

        <article className="dashboard-card dashboard-surface">
          <div className="dashboard-panel-head">
            <div>
              <h4>تنبيهات المنصة</h4>
              <p className="dashboard-subtitle">
                التنبيهات التي يجب متابعتها قبل الإقفال اليومي.
              </p>
            </div>
          </div>

          <ul className="dashboard-list">
            {adminDashboardContent.alerts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="dashboard-divider" />

          <div className="dashboard-panel-head">
            <div>
              <h4>قائمة التنفيذ</h4>
              <p className="dashboard-subtitle">مهام الإدارة المطلوبة خلال الوردية الحالية.</p>
            </div>
          </div>

          <ul className="dashboard-checklist">
            {adminDashboardContent.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
