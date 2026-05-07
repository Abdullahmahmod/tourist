import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="page-shell auth-page">
      <section className="auth-panel auth-panel-primary narrow-panel">
        <span className="section-kicker">Unauthorized</span>
        <h1 className="auth-title">ليس لديك صلاحية للوصول إلى هذه الصفحة</h1>
        <p className="auth-copy">
          الحساب مسجّل بنجاح، لكن الدور الحالي لا يملك إذنًا لهذه المساحة. يمكنك
          العودة إلى لوحة التحكم المسموح بها أو تسجيل الدخول بحساب آخر.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/dashboard">
            الذهاب إلى لوحة التحكم
          </Link>
          <Link className="button secondary" href="/login">
            تسجيل الدخول بحساب آخر
          </Link>
        </div>
      </section>
    </main>
  );
}
