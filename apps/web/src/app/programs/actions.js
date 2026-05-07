"use server";

import { revalidatePath } from "next/cache";

import { createSubscriptionForProgram } from "@/lib/marketplace-store";

export async function createProgramInquiryAction(previousState, formData) {
  const payload = {
    programId: formData.get("programId")?.toString() || "",
    customerName: formData.get("customerName")?.toString().trim() || "",
    customerEmail: formData.get("customerEmail")?.toString().trim() || "",
    customerPhone: formData.get("customerPhone")?.toString().trim() || "",
    travelDate: formData.get("travelDate")?.toString() || "",
    adults: formData.get("adults")?.toString() || "1",
    children: formData.get("children")?.toString() || "0",
    notes: formData.get("notes")?.toString().trim() || "",
  };

  if (
    !payload.programId ||
    !payload.customerName ||
    !payload.customerEmail ||
    !payload.customerPhone ||
    !payload.travelDate
  ) {
    return {
      status: "error",
      message: "من فضلك أكمل بيانات الطلب الأساسية قبل الإرسال.",
    };
  }

  const result = await createSubscriptionForProgram(payload.programId, payload);

  if (result.error) {
    return {
      status: "error",
      message: result.error,
    };
  }

  revalidatePath("/dashboard/operator");

  return {
    status: "success",
    message: "تم إرسال طلبك بنجاح، وستتواصل معك الشركة لتأكيد البرنامج.",
  };
}
