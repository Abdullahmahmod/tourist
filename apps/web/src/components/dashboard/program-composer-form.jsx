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
    <button className="button primary" type="submit" disabled={pending}>
      {pending ? "جارٍ حفظ البرنامج..." : "حفظ البرنامج"}
    </button>
  );
}

export function ProgramComposerForm({ action, disabled = false }) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <article className="dashboard-card dashboard-surface">
      <div className="dashboard-panel-head">
        <div>
          <h4>إضافة برنامج جديد</h4>
          <p className="dashboard-subtitle">
            أنشئ برنامج البالون ليظهر في واجهة الموقع ويستطيع العملاء إرسال طلباتهم.
          </p>
        </div>
      </div>

      {disabled ? (
        <p className="auth-alert">
          هذا العرض مخصص للمتابعة الإدارية فقط. سجّل بحساب شركة لإضافة برامج جديدة.
        </p>
      ) : null}

      <form action={formAction} className="program-form">
        <div className="program-form-grid">
          <label className="auth-field">
            <span>اسم البرنامج</span>
            <input name="title" type="text" disabled={disabled} />
          </label>

          <label className="auth-field">
            <span>ساعات الإقلاع</span>
            <input name="flightWindow" type="text" placeholder="04:30 - 06:00" disabled={disabled} />
          </label>
        </div>

        <label className="auth-field">
          <span>وصف مختصر</span>
          <input
            name="shortDescription"
            type="text"
            placeholder="رحلة فجر لمدة 45 دقيقة مع نقل من الفندق"
            disabled={disabled}
          />
        </label>

        <label className="auth-field">
          <span>تفاصيل البرنامج</span>
          <textarea
            className="auth-textarea"
            name="description"
            rows={5}
            placeholder="اكتب ما يتضمنه البرنامج بالتفصيل..."
            disabled={disabled}
          />
        </label>

        <div className="program-form-grid program-form-grid-3">
          <label className="auth-field">
            <span>سعر البالغ</span>
            <input name="priceAdult" type="number" min="1" step="1" disabled={disabled} />
          </label>

          <label className="auth-field">
            <span>سعر الطفل</span>
            <input name="priceChild" type="number" min="0" step="1" defaultValue="0" disabled={disabled} />
          </label>

          <label className="auth-field">
            <span>السعة</span>
            <input name="capacity" type="number" min="1" step="1" disabled={disabled} />
          </label>
        </div>

        <div className="program-form-grid">
          <label className="auth-field">
            <span>مدة الرحلة</span>
            <input name="duration" type="text" placeholder="45 دقيقة" disabled={disabled} />
          </label>

          <label className="auth-field">
            <span>نقطة الالتقاء</span>
            <input name="meetingPoint" type="text" placeholder="الاستقبال من الفندق" disabled={disabled} />
          </label>
        </div>

        <label className="auth-field">
          <span>الحالة</span>
          <select className="auth-select" name="status" defaultValue="published" disabled={disabled}>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </label>

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
    </article>
  );
}
