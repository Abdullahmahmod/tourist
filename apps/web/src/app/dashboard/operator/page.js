import Link from "next/link";

import {
  createProgramAction,
  updateSubscriptionStatusAction,
} from "@/app/dashboard/operator/actions";
import { ProgramComposerForm } from "@/components/dashboard/program-composer-form";
import { DashboardStatus } from "@/components/dashboard/dashboard-status";
import { DashboardTable } from "@/components/dashboard/dashboard-table";
import { requireSectionAccess } from "@/lib/auth/session";
import {
  getAllCompanies,
  getCompanyDashboardSnapshot,
  getPublishedPrograms,
} from "@/lib/marketplace-store";

export const dynamic = "force-dynamic";

function formatPrice(program) {
  return `$${program.priceAdult}`;
}

function formatSubscriptionStatus(status) {
  switch (status) {
    case "confirmed":
      return { label: "مؤكد", tone: "success" };
    case "contacted":
      return { label: "تم التواصل", tone: "warning" };
    case "cancelled":
      return { label: "ملغي", tone: "danger" };
    default:
      return { label: "جديد", tone: "neutral" };
  }
}

export default async function OperatorDashboardPage() {
  const session = await requireSectionAccess("operator");
  const companies = await getAllCompanies();
  const fallbackCompanyId = session.companyId || companies[0]?.id || null;
  const snapshot = fallbackCompanyId
    ? await getCompanyDashboardSnapshot(fallbackCompanyId)
    : null;
  const allPublishedPrograms = await getPublishedPrograms();
  const isCompanyAccount = Boolean(session.companyId);

  if (!snapshot || !snapshot.company) {
    return (
      <div className="dashboard-page">
        <article className="dashboard-card dashboard-surface">
          <h4>لا توجد شركة مرتبطة بالحساب الحالي</h4>
          <p className="dashboard-subtitle">
            أنشئ شركة جديدة أولًا أو سجّل الدخول بحساب شركة قائم.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/register/company">
              تسجيل شركة جديدة
            </Link>
            <Link className="button secondary" href="/programs">
              تصفح البرامج المنشورة
            </Link>
          </div>
        </article>
      </div>
    );
  }

  const summaryCards = [
    {
      label: "إجمالي البرامج",
      value: String(snapshot.stats.totalPrograms),
      note: "كل برامج الشركة المحفوظة",
    },
    {
      label: "برامج منشورة",
      value: String(snapshot.stats.publishedPrograms),
      note: "ظاهرة الآن للزوار",
    },
    {
      label: "طلبات جديدة",
      value: String(snapshot.stats.newSubscriptions),
      note: "تحتاج تواصلًا أو تأكيدًا",
    },
    {
      label: "طلبات مؤكدة",
      value: String(snapshot.stats.confirmedSubscriptions),
      note: "جاهزة للتشغيل",
    },
  ];

  const programColumns = [
    { key: "program", label: "البرنامج" },
    { key: "window", label: "الإقلاع" },
    { key: "price", label: "السعر" },
    { key: "capacity", label: "السعة" },
    { key: "status", label: "الحالة" },
  ];

  const programRows = snapshot.programs.map((program) => ({
    id: program.id,
    program: (
      <div className="dashboard-entity">
        <strong>{program.title}</strong>
        <span>{program.shortDescription}</span>
        <small>{program.meetingPoint}</small>
      </div>
    ),
    window: <strong>{program.flightWindow}</strong>,
    price: <strong>{formatPrice(program)}</strong>,
    capacity: <strong>{program.capacity}</strong>,
    status: (
      <DashboardStatus tone={program.status === "published" ? "success" : "neutral"}>
        {program.status === "published" ? "منشور" : "مسودة"}
      </DashboardStatus>
    ),
  }));

  const requestColumns = [
    { key: "guest", label: "العميل" },
    { key: "program", label: "البرنامج" },
    { key: "travelDate", label: "تاريخ الرحلة" },
    { key: "party", label: "الأفراد" },
    { key: "status", label: "الحالة" },
    { key: "actions", label: "إجراءات" },
  ];

  const requestRows = snapshot.subscriptions.map((subscription) => {
    const status = formatSubscriptionStatus(subscription.status);

    return {
      id: subscription.id,
      guest: (
        <div className="dashboard-entity">
          <strong>{subscription.customerName}</strong>
          <span>{subscription.customerEmail}</span>
          <small>{subscription.customerPhone}</small>
        </div>
      ),
      program: (
        <div className="dashboard-entity">
          <strong>{subscription.programTitle}</strong>
          <small>{subscription.notes || "لا توجد ملاحظات"}</small>
        </div>
      ),
      travelDate: <strong>{subscription.travelDate}</strong>,
      party: (
        <span>
          {subscription.adults} بالغ / {subscription.children} طفل
        </span>
      ),
      status: <DashboardStatus tone={status.tone}>{status.label}</DashboardStatus>,
      actions: isCompanyAccount ? (
        <div className="dashboard-action-row">
          <form action={updateSubscriptionStatusAction}>
            <input type="hidden" name="subscriptionId" value={subscription.id} />
            <input type="hidden" name="status" value="contacted" />
            <button className="table-action-button" type="submit">
              تم التواصل
            </button>
          </form>
          <form action={updateSubscriptionStatusAction}>
            <input type="hidden" name="subscriptionId" value={subscription.id} />
            <input type="hidden" name="status" value="confirmed" />
            <button className="table-action-button success" type="submit">
              تأكيد
            </button>
          </form>
        </div>
      ) : (
        <span className="dashboard-subtitle">عرض فقط</span>
      ),
    };
  });

  const relatedPrograms = allPublishedPrograms.filter(
    (program) => program.companyId === snapshot.company.id,
  );

  return (
    <div className="dashboard-page">
      <section className="dashboard-banner dashboard-banner-hero">
        <div className="dashboard-banner-copy">
          <span className="section-kicker">Company workspace</span>
          <h3>إدارة برامج شركة {snapshot.company.name}</h3>
          <p>
            من هنا تنشئ الشركة برامج البالون، تنشرها على الموقع العام، وتستقبل طلبات
            العملاء من نفس الداشبورد.
          </p>
        </div>

        <div className="dashboard-chip-row">
          <span className="dashboard-filter-chip">{snapshot.company.city}</span>
          <span className="dashboard-filter-chip">{snapshot.company.phone}</span>
          <span className="dashboard-filter-chip">
            {isCompanyAccount ? "حساب شركة" : "عرض إداري"}
          </span>
        </div>
      </section>

      <section className="dashboard-grid">
        {summaryCards.map((card) => (
          <article key={card.label} className="dashboard-card dashboard-kpi">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </article>
        ))}
      </section>

      <section className="dashboard-split dashboard-split-wide">
        <ProgramComposerForm action={createProgramAction} disabled={!isCompanyAccount} />

        <article className="dashboard-card dashboard-surface">
          <div className="dashboard-panel-head">
            <div>
              <h4>رابط الواجهة العامة للشركة</h4>
              <p className="dashboard-subtitle">
                هذه البرامج المعروضة الآن للزوار على الموقع العام.
              </p>
            </div>
          </div>

          <div className="dashboard-stack">
            {relatedPrograms.length ? (
              relatedPrograms.map((program) => (
                <div key={program.id} className="dashboard-inline-card">
                  <div className="dashboard-inline-head">
                    <strong>{program.title}</strong>
                    <DashboardStatus tone="success">منشور</DashboardStatus>
                  </div>
                  <p>{program.shortDescription}</p>
                  <Link className="inline-link" href={`/programs/${program.slug}`}>
                    فتح صفحة البرنامج
                  </Link>
                </div>
              ))
            ) : (
              <p className="dashboard-subtitle">
                لا توجد برامج منشورة بعد. أضف أول برنامج من النموذج المقابل.
              </p>
            )}
          </div>

          <div className="dashboard-divider" />

          <div className="hero-actions">
            <Link className="button secondary" href="/programs">
              فتح الواجهة العامة
            </Link>
          </div>
        </article>
      </section>

      <section className="dashboard-split dashboard-split-wide">
        <DashboardTable
          title="برامج الشركة"
          caption="كل البرامج التي تم إنشاؤها من هذا الحساب."
          columns={programColumns}
          rows={programRows}
        />

        <DashboardTable
          title="طلبات العملاء"
          caption="الطلبات الواردة من صفحة الموقع العامة لكل برنامج."
          columns={requestColumns}
          rows={requestRows}
        />
      </section>
    </div>
  );
}
