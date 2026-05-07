"use client";

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
      {pending ? "جارٍ إرسال الطلب..." : "إرسال طلب الحجز"}
    </button>
  );
}

export function ProgramInquiryForm({ action, programId }) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="program-form">
      <input type="hidden" name="programId" value={programId} />

      <div className="program-form-grid">
        <label className="auth-field">
          <span>الاسم الكامل</span>
          <input name="customerName" type="text" />
        </label>

        <label className="auth-field">
          <span>البريد الإلكتروني</span>
          <input name="customerEmail" type="email" />
        </label>
      </div>

      <div className="program-form-grid program-form-grid-3">
        <label className="auth-field">
          <span>الهاتف</span>
          <input name="customerPhone" type="text" />
        </label>

        <label className="auth-field">
          <span>تاريخ الرحلة</span>
          <input name="travelDate" type="date" />
        </label>

        <label className="auth-field">
          <span>البالغون</span>
          <input name="adults" type="number" min="1" defaultValue="1" />
        </label>
      </div>

      <div className="program-form-grid">
        <label className="auth-field">
          <span>الأطفال</span>
          <input name="children" type="number" min="0" defaultValue="0" />
        </label>

        <label className="auth-field">
          <span>ملاحظات إضافية</span>
          <textarea className="auth-textarea" name="notes" rows={3} />
        </label>
      </div>

      {state.message ? (
        <p
          className={state.status === "success" ? "auth-success" : "auth-alert"}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
