import Link from "next/link";

const sections = [
  {
    titleAr: "نطاق الأعمال",
    titleEn: "Business scope",
    bodyAr:
      "المنصة تخدم عدة شركات بالون في الأقصر داخل نظام موحد، مع فصل بيانات كل شركة، وتقارير مركزية، وإدارة شركاء، ومسار حجز موحد.",
    bodyEn:
      "The platform serves multiple Luxor balloon operators through one shared system with isolated company workspaces, common reporting, partner management, and unified booking workflows.",
  },
  {
    titleAr: "الدومينات الأساسية",
    titleEn: "Core domains",
    bodyAr:
      "المخزون، التسعير، الحجوزات، التذاكر، المدفوعات، الوكالات، المستخدمون، الصلاحيات، والتقارير صُممت كمساحات مستقلة قابلة للتوسع لاحقًا عبر API وتطبيقات الهاتف.",
    bodyEn:
      "Inventory, pricing, reservations, ticketing, payments, agencies, users, permissions, and reporting are designed as separate domains that can later support APIs and mobile applications.",
  },
  {
    titleAr: "الاتجاه التقني",
    titleEn: "Technology direction",
    bodyAr:
      "يمكن أن يقود Next.js تجربة الويب ولوحات الإدارة، بينما يوفر PostgreSQL مع Prisma قاعدة علائقية قوية لتعدد الشركات والتقارير المالية.",
    bodyEn:
      "Next.js can power the web experience and admin tools, while PostgreSQL plus Prisma provide a strong relational base for multi-tenant operations and financial reporting.",
  },
];

export default function ArchitecturePage() {
  return (
    <main className="page-shell docs-shell">
      <header className="topbar">
        <div>
          <p className="brand-kicker">Architecture note / ملاحظة معمارية</p>
          <h1 className="brand-title">Platform direction / توجه المنصة</h1>
        </div>
        <Link className="button secondary" href="/">
          العودة للرئيسية
        </Link>
      </header>

      <section className="section-block compact">
        <div className="section-heading">
          <span className="section-kicker">Overview / نظرة عامة</span>
          <h2>كيف بُنيت النسخة الأولى مبدئيًا</h2>
        </div>
        <div className="pillar-grid">
          {sections.map((section) => (
            <article key={section.titleEn} className="feature-card">
              <h3>
                {section.titleAr} / {section.titleEn}
              </h3>
              <p>{section.bodyAr}</p>
              <p>{section.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
