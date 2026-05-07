"use server";

import { revalidatePath } from "next/cache";

import { requireSectionAccess } from "@/lib/auth/session";
import {
  createProgramForCompany,
  updateSubscriptionStatus,
} from "@/lib/marketplace-store";

const initialState = {
  status: "idle",
  message: "",
};

export async function createProgramAction(previousState = initialState, formData) {
  const session = await requireSectionAccess("operator");

  if (!session.companyId) {
    return {
      status: "error",
      message: "هذا الحساب لا يملك شركة مرتبطة لإضافة البرامج.",
    };
  }

  const payload = {
    title: formData.get("title")?.toString().trim() || "",
    shortDescription: formData.get("shortDescription")?.toString().trim() || "",
    description: formData.get("description")?.toString().trim() || "",
    meetingPoint: formData.get("meetingPoint")?.toString().trim() || "",
    flightWindow: formData.get("flightWindow")?.toString().trim() || "",
    duration: formData.get("duration")?.toString().trim() || "",
    priceAdult: formData.get("priceAdult")?.toString().trim() || "",
    priceChild: formData.get("priceChild")?.toString().trim() || "0",
    capacity: formData.get("capacity")?.toString().trim() || "",
    status: formData.get("status")?.toString() === "draft" ? "draft" : "published",
  };

  if (
    !payload.title ||
    !payload.shortDescription ||
    !payload.description ||
    !payload.meetingPoint ||
    !payload.flightWindow ||
    !payload.duration ||
    !payload.priceAdult ||
    !payload.capacity
  ) {
    return {
      status: "error",
      message: "من فضلك أكمل الحقول الأساسية للبرنامج قبل الحفظ.",
    };
  }

  const result = await createProgramForCompany(session.companyId, payload);

  if (result.error) {
    return {
      status: "error",
      message: result.error,
    };
  }

  revalidatePath("/");
  revalidatePath("/programs");
  revalidatePath("/dashboard/operator");

  return {
    status: "success",
    message: "تم حفظ البرنامج بنجاح وأصبح ظاهرًا في لوحة الشركة.",
  };
}

export async function updateSubscriptionStatusAction(formData) {
  const session = await requireSectionAccess("operator");

  if (!session.companyId) {
    return;
  }

  const subscriptionId = formData.get("subscriptionId")?.toString() || "";
  const status = formData.get("status")?.toString() || "new";

  await updateSubscriptionStatus(session.companyId, subscriptionId, status);

  revalidatePath("/dashboard/operator");
}
