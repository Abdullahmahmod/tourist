import { requireSectionAccess } from "@/lib/auth/session";

const agencyCards = [
  { label: "طلبات جديدة", value: "18" },
  { label: "رصيد متاح", value: "$5.2k" },
  { label: "حجوزات قيد التأكيد", value: "7" },
  { label: "فاوتشرات قابلة للتحميل", value: "23" },
];

const partnerTasks = [
  "إنشاء حجوزات B2B مع التسعير المخصص للوكالة.",
  "تحميل الفاوتشرات المؤكدة ومتابعة حالة كل طلب.",
  "مراجعة الرصيد أو حد الائتمان قبل تأكيد الحجوزات الجديدة.",
];

const permissions = [
  "الوصول إلى حجوزات الوكالة نفسها فقط.",
  "عدم تعديل إعدادات الشركات أو أسعارهم العامة.",
  "الاطلاع على الفاوتشرات، الرصيد، وحالة المدفوعات الخاصة بالوكالة.",
];

export default async function AgencyDashboardPage() {
  const session = await requireSectionAccess("agency");

  return (
    <div className="dashboard-page">
      <section className="dashboard-banner">
        <div>
          <span className="section-kicker">Agency workspace</span>
          <h3>لوحة الوكالات والشركاء</h3>
          <p>
            من هنا يمكن لـ {session.organizationName} إدارة حجوزات الشركاء والأسعار
            المتعاقد عليها وسحب الفاوتشرات المؤكدة.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        {agencyCards.map((card) => (
          <article key={card.label} className="dashboard-card dashboard-kpi">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-split">
        <article className="dashboard-card dashboard-surface">
          <h4>مهام الشريك</h4>
          <ul className="dashboard-list">
            {partnerTasks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="dashboard-card dashboard-surface">
          <h4>حدود الوصول</h4>
          <ul className="dashboard-list">
            {permissions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
