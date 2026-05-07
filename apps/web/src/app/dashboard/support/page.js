import { requireSectionAccess } from "@/lib/auth/session";

const supportCards = [
  { label: "تذاكر تحتاج إعادة إرسال", value: "9" },
  { label: "طلبات إلغاء", value: "6" },
  { label: "استفسارات جديدة", value: "14" },
  { label: "متوسط زمن الرد", value: "11m" },
];

const supportFlows = [
  "إعادة إرسال الفاوتشرات ورسائل الرحلة للضيوف أو الوكالات.",
  "تسجيل أسباب الإلغاء وتحويل الحالات المالية للمراجعة.",
  "متابعة الشكاوى التشغيلية وربطها بالحجز والشركة المعنية.",
];

const permissions = [
  "الوصول إلى بيانات خدمة العملاء اللازمة فقط.",
  "لا يمكن تعديل إعدادات التسعير أو الشركات.",
  "يمكن تحديث حالات التواصل والملاحظات المتعلقة بالحجز.",
];

export default async function SupportDashboardPage() {
  const session = await requireSectionAccess("support");

  return (
    <div className="dashboard-page">
      <section className="dashboard-banner">
        <div>
          <span className="section-kicker">Support workspace</span>
          <h3>لوحة خدمة العملاء</h3>
          <p>
            مساحة مخصصة لـ {session.fullName} لمتابعة الإلغاءات، إعادة الإرسال، ومشكلات
            ما بعد الحجز دون الوصول إلى الإعدادات الحساسة.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        {supportCards.map((card) => (
          <article key={card.label} className="dashboard-card dashboard-kpi">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-split">
        <article className="dashboard-card dashboard-surface">
          <h4>مسار العمل</h4>
          <ul className="dashboard-list">
            {supportFlows.map((item) => (
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
