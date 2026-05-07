"use server";

import { redirect } from "next/navigation";

import { authenticateDemoUser } from "@/lib/auth/demo-users";
import { setSessionCookie } from "@/lib/auth/session";
import { authenticateStoredUser } from "@/lib/marketplace-store";

function getMessage(key, locale = "ar") {
  const messages = {
    missing: {
      ar: "من فضلك أدخل البريد الإلكتروني وكلمة المرور.",
      en: "Please enter your email and password.",
    },
    invalid: {
      ar: "بيانات الدخول غير صحيحة. يمكنك استخدام حساب تجريبي أو تسجيل شركة جديدة.",
      en: "Invalid credentials. Use a demo account or register a new company.",
    },
  };

  return messages[key]?.[locale] || messages[key]?.ar || "";
}

export async function loginAction(previousState, formData) {
  const locale = formData.get("locale") === "en" ? "en" : "ar";
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return {
      status: "error",
      message: getMessage("missing", locale),
    };
  }

  const user =
    (await authenticateStoredUser(email, password)) ||
    authenticateDemoUser(email, password);

  if (!user) {
    return {
      status: "error",
      message: getMessage("invalid", locale),
    };
  }

  await setSessionCookie(user);
  redirect(user.dashboardPath || "/dashboard");
}
