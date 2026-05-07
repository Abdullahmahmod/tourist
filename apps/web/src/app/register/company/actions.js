"use server";

import { redirect } from "next/navigation";

import { setSessionCookie } from "@/lib/auth/session";
import { createCompanyAccount } from "@/lib/marketplace-store";

function validateInput(data) {
  if (
    !data.companyName ||
    !data.fullName ||
    !data.email ||
    !data.phone ||
    !data.password
  ) {
    return "من فضلك أكمل كل الحقول المطلوبة.";
  }

  if (data.password.length < 8) {
    return "كلمة المرور يجب أن تكون 8 أحرف على الأقل.";
  }

  return null;
}

export async function registerCompanyAction(previousState, formData) {
  const payload = {
    companyName: formData.get("companyName")?.toString().trim() || "",
    companyDescription:
      formData.get("companyDescription")?.toString().trim() || "",
    fullName: formData.get("fullName")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    city: formData.get("city")?.toString().trim() || "Luxor",
    password: formData.get("password")?.toString() || "",
  };

  const validationError = validateInput(payload);

  if (validationError) {
    return {
      status: "error",
      message: validationError,
    };
  }

  const result = await createCompanyAccount(payload);

  if (result.error) {
    return {
      status: "error",
      message: result.error,
    };
  }

  await setSessionCookie(result.user);
  redirect("/dashboard/operator");
}
