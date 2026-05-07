"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  status: "idle",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button primary auth-submit" type="submit" disabled={pending}>
      {pending ? "جارٍ إنشاء الحساب..." : "إنشاء حساب الشركة"}
    </button>
  );
}

export function CompanyRegisterForm({ action }) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <div className="auth-grid auth-grid-single">
      <section className="auth-panel auth-panel-primary">
        <span className="section-kicker">تسجيل شركة</span>
        <h1 className="auth-title">ابدأ شركتك على المنصة</h1>
        <p className="auth-copy">
          أنشئ حساب شركتك أولًا، وبعدها ستحصل على داشبورد تضيف منه برامج البالون
          وتستقبل طلبات العملاء مباشرة.
        </p>

        <form action={formAction} className="auth-form">
          <label className="auth-field">
            <span>اسم الشركة</span>
            <input name="companyName" type="text" placeholder="مثال: Luxor Sunrise Balloons" />
          </label>

          <label className="auth-field">
            <span>وصف مختصر للشركة</span>
            <textarea
              className="auth-textarea"
              name="companyDescription"
              placeholder="شركة متخصصة في رحلات البالون بالأقصر..."
              rows={4}
            />
          </label>

          <div className="auth-two-columns">
            <label className="auth-field">
              <span>اسم المسؤول</span>
              <input name="fullName" type="text" placeholder="الاسم الكامل" />
            </label>

            <label className="auth-field">
              <span>المدينة</span>
              <input name="city" type="text" defaultValue="Luxor" />
            </label>
          </div>

          <div className="auth-two-columns">
            <label className="auth-field">
              <span>البريد الإلكتروني</span>
              <input name="email" type="email" placeholder="owner@company.com" />
            </label>

            <label className="auth-field">
              <span>رقم الهاتف</span>
              <input name="phone" type="text" placeholder="+20..." />
            </label>
          </div>

          <label className="auth-field">
            <span>كلمة المرور</span>
            <input name="password" type="password" placeholder="8 أحرف على الأقل" />
          </label>

          {state.message ? (
            <p className="auth-alert" role="alert">
              {state.message}
            </p>
          ) : null}

          <SubmitButton />
        </form>

        <div className="auth-secondary-actions">
          <span>لديك حساب بالفعل؟</span>
          <Link href="/login">اذهب إلى تسجيل الدخول</Link>
        </div>
      </section>
    </div>
  );
}
