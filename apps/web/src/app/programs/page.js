import Link from "next/link";

import { ProgramCard } from "@/components/programs/program-card";
import { getPublishedPrograms } from "@/lib/marketplace-store";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const programs = await getPublishedPrograms();

  return (
    <main className="page-shell programs-page">
      <section className="programs-hero">
        <div>
          <span className="section-kicker">Public marketplace</span>
          <h1 className="auth-title">برامج البالون المنشورة من الشركات</h1>
          <p className="auth-copy">
            هذه هي الواجهة التي يدخلها العميل ليشاهد برامج الشركات، يقارن بينها،
            ويرسل طلبه مباشرة للشركة المالكة للبرنامج.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button secondary" href="/">
            العودة للرئيسية
          </Link>
          <Link className="button primary" href="/register/company">
            سجّل شركتك وانشر برامجك
          </Link>
        </div>
      </section>

      <section className="programs-grid">
        {programs.length ? (
          programs.map((program) => <ProgramCard key={program.id} program={program} />)
        ) : (
          <article className="dashboard-card dashboard-surface">
            <h3>لا توجد برامج منشورة بعد</h3>
            <p className="dashboard-subtitle">
              بمجرد أن تضيف الشركات برامجها من الداشبورد، ستظهر هنا مباشرة.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}
