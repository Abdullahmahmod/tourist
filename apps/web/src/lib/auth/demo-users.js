import { getDefaultDashboardPath, USER_ROLES } from "@/lib/auth/roles";

const demoUsers = [
  {
    id: "platform-admin-1",
    fullName: "Ahmed Hassan",
    email: "admin@luxorballoon.test",
    password: "Admin@123",
    role: USER_ROLES.PLATFORM_ADMIN,
    organizationName: "Luxor Balloon Hub",
    summaryAr: "إدارة المنصة بالكامل ومتابعة جميع الشركات.",
    companyId: null,
  },
  {
    id: "platform-finance-1",
    fullName: "Mona Khaled",
    email: "finance@luxorballoon.test",
    password: "Finance@123",
    role: USER_ROLES.PLATFORM_FINANCE,
    organizationName: "Luxor Balloon Hub",
    summaryAr: "مراجعة المدفوعات والتسويات والتقارير المالية.",
    companyId: null,
  },
  {
    id: "company-admin-1",
    fullName: "Omar Abdelrahman",
    email: "operator.admin@luxorballoon.test",
    password: "Operator@123",
    role: USER_ROLES.COMPANY_ADMIN,
    organizationName: "Nile Sunrise Balloons",
    summaryAr: "إدارة برامج الرحلات والحجوزات الخاصة بالشركة.",
    companyId: "company-nile-sunrise",
  },
  {
    id: "company-agent-1",
    fullName: "Sara Fathy",
    email: "ops@luxorballoon.test",
    password: "Ops@123",
    role: USER_ROLES.COMPANY_AGENT,
    organizationName: "Golden Sky Balloons",
    summaryAr: "تشغيل الرحلات اليومية ومتابعة طلبات العملاء.",
    companyId: "company-golden-sky",
  },
  {
    id: "agency-agent-1",
    fullName: "Nada Youssef",
    email: "agency@luxorballoon.test",
    password: "Agency@123",
    role: USER_ROLES.AGENCY_AGENT,
    organizationName: "Pharaoh Travel",
    summaryAr: "إنشاء حجوزات B2B وتحميل الفاوتشرات للضيوف.",
    companyId: null,
  },
  {
    id: "support-agent-1",
    fullName: "Karim Adel",
    email: "support@luxorballoon.test",
    password: "Support@123",
    role: USER_ROLES.CUSTOMER_SUPPORT,
    organizationName: "Luxor Balloon Hub",
    summaryAr: "خدمة العملاء وإعادة إرسال التذاكر ومعالجة الإلغاءات.",
    companyId: null,
  },
];

function toSessionUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    organizationName: user.organizationName,
    dashboardPath: getDefaultDashboardPath(user.role),
    companyId: user.companyId,
    companySlug: null,
  };
}

export function authenticateDemoUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = demoUsers.find(
    (item) =>
      item.email.toLowerCase() === normalizedEmail && item.password === password,
  );

  return user ? toSessionUser(user) : null;
}

export function getLoginDemoAccounts() {
  return demoUsers.map((user) => ({
    email: user.email,
    password: user.password,
    fullName: user.fullName,
    organizationName: user.organizationName,
    role: user.role,
    summaryAr: user.summaryAr,
  }));
}

export function isDemoEmailReserved(email) {
  const normalizedEmail = email.trim().toLowerCase();
  return demoUsers.some((user) => user.email.toLowerCase() === normalizedEmail);
}
