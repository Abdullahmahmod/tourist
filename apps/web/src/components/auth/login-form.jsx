"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  status: "idle",
  message: "",
};

function SubmitButton({ locale }) {
  const { pending } = useFormStatus();
  const label =
    locale === "en"
      ? pending
        ? "Signing in..."
        : "Sign in"
      : pending
        ? "جارٍ تسجيل الدخول..."
        : "تسجيل الدخول";

  return (
    <button className="button primary auth-submit" type="submit" disabled={pending}>
      {label}
    </button>
  );
}

export function LoginForm({ action, demoAccounts, locale = "ar" }) {
  const [state, formAction] = useActionState(action, initialState);
  const [credentials, setCredentials] = useState({
    email: demoAccounts[0]?.email || "",
    password: demoAccounts[0]?.password || "",
  });

  const isArabic = locale !== "en";

  return (
    <div className="auth-grid">
      <section className="auth-panel auth-panel-primary">
        <span className="section-kicker">
          {isArabic ? "تسجيل الدخول" : "Access portal"}
        </span>
        <h1 className="auth-title">
          {isArabic
            ? "دخول الشركات وإدارة برامج البالون"
            : "Company access and balloon program management"}
        </h1>
        <p className="auth-copy">
          {isArabic
            ? "سجّل الدخول بحساب شركتك لإضافة البرامج واستقبال طلبات العملاء، أو استخدم أحد الحسابات التجريبية لمراجعة النظام."
            : "Sign in with your company account to publish programs and receive booking requests, or use a demo account to explore the system."}
        </p>

        <form action={formAction} className="auth-form">
          <input type="hidden" name="locale" value={locale} />

          <label className="auth-field">
            <span>{isArabic ? "البريد الإلكتروني" : "Email"}</span>
            <input
              autoComplete="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={(event) =>
                setCredentials((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="owner@company.com"
            />
          </label>

          <label className="auth-field">
            <span>{isArabic ? "كلمة المرور" : "Password"}</span>
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={(event) =>
                setCredentials((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="••••••••"
            />
          </label>

          {state.message ? (
            <p className="auth-alert" role="alert">
              {state.message}
            </p>
          ) : null}

          <SubmitButton locale={locale} />
        </form>

        <div className="auth-secondary-actions">
          <span>{isArabic ? "ليس لديك حساب شركة بعد؟" : "No company account yet?"}</span>
          <Link href="/register/company">
            {isArabic ? "سجّل شركتك الآن" : "Register your company"}
          </Link>
        </div>
      </section>

      <section className="auth-panel">
        <div className="section-heading compact-heading">
          <span className="section-kicker">
            {isArabic ? "حسابات تجريبية" : "Demo accounts"}
          </span>
          <h2>{isArabic ? "اختر حسابًا لتجربة الصلاحيات" : "Pick an account to test roles"}</h2>
        </div>

        <div className="demo-grid">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              className="demo-account-card"
              type="button"
              onClick={() =>
                setCredentials({
                  email: account.email,
                  password: account.password,
                })
              }
            >
              <strong>{account.fullName}</strong>
              <span>{account.organizationName}</span>
              <code>{account.email}</code>
              <code>{account.password}</code>
              <p>{account.summaryAr}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
