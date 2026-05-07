import Link from "next/link";
import { notFound } from "next/navigation";

import { createProgramInquiryAction } from "@/app/programs/actions";
import { ProgramInquiryForm } from "@/components/programs/program-inquiry-form";
import { getProgramBySlug } from "@/lib/marketplace-store";

export const dynamic = "force-dynamic";

export default async function ProgramDetailPage({ params }) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="page-shell programs-page">
      <section className="program-detail-grid">
        <article className="program-detail-card">
          <span className="section-kicker">{program.company?.name}</span>
          <h1 className="auth-title">{program.title}</h1>
          <p className="auth-copy">{program.description}</p>

          <div className="program-detail-meta">
            <div className="program-detail-item">
              <span>نافذة الإقلاع</span>
              <strong>{program.flightWindow}</strong>
            </div>
            <div className="program-detail-item">
              <span>المدة</span>
              <strong>{program.duration}</strong>
            </div>
            <div className="program-detail-item">
              <span>نقطة الالتقاء</span>
              <strong>{program.meetingPoint}</strong>
            </div>
            <div className="program-detail-item">
              <span>السعة</span>
              <strong>{program.capacity} مقعد</strong>
            </div>
            <div className="program-detail-item">
              <span>سعر البالغ</span>
              <strong>${program.priceAdult}</strong>
            </div>
            <div className="program-detail-item">
              <span>سعر الطفل</span>
              <strong>${program.priceChild}</strong>
            </div>
          </div>

          <div className="hero-actions">
            <Link className="button secondary" href="/programs">
              العودة لكل البرامج
            </Link>
          </div>
        </article>

        <article className="program-detail-card">
          <div className="dashboard-panel-head">
            <div>
              <h4>أرسل طلبك إلى الشركة</h4>
              <p className="dashboard-subtitle">
                سيصل الطلب مباشرة إلى لوحة الشركة لتتواصل معك وتؤكد الحجز.
              </p>
            </div>
          </div>

          <ProgramInquiryForm action={createProgramInquiryAction} programId={program.id} />
        </article>
      </section>
    </main>
  );
}
