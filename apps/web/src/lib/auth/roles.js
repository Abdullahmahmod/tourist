export const USER_ROLES = {
  PLATFORM_ADMIN: "PLATFORM_ADMIN",
  PLATFORM_FINANCE: "PLATFORM_FINANCE",
  COMPANY_ADMIN: "COMPANY_ADMIN",
  COMPANY_AGENT: "COMPANY_AGENT",
  AGENCY_AGENT: "AGENCY_AGENT",
  CUSTOMER_SUPPORT: "CUSTOMER_SUPPORT",
};

export const roleLabels = {
  [USER_ROLES.PLATFORM_ADMIN]: {
    ar: "مدير المنصة",
    en: "Platform admin",
  },
  [USER_ROLES.PLATFORM_FINANCE]: {
    ar: "الإدارة المالية",
    en: "Platform finance",
  },
  [USER_ROLES.COMPANY_ADMIN]: {
    ar: "مدير شركة",
    en: "Company admin",
  },
  [USER_ROLES.COMPANY_AGENT]: {
    ar: "مشغل شركة",
    en: "Company operator",
  },
  [USER_ROLES.AGENCY_AGENT]: {
    ar: "وكالة / شريك",
    en: "Agency partner",
  },
  [USER_ROLES.CUSTOMER_SUPPORT]: {
    ar: "خدمة العملاء",
    en: "Customer support",
  },
};

export const dashboardSections = [
  {
    key: "admin",
    href: "/dashboard/admin",
    label: {
      ar: "لوحة الإدارة",
      en: "Admin board",
    },
    roles: [USER_ROLES.PLATFORM_ADMIN, USER_ROLES.PLATFORM_FINANCE],
  },
  {
    key: "operator",
    href: "/dashboard/operator",
    label: {
      ar: "لوحة الشركات",
      en: "Company board",
    },
    roles: [
      USER_ROLES.PLATFORM_ADMIN,
      USER_ROLES.COMPANY_ADMIN,
      USER_ROLES.COMPANY_AGENT,
    ],
  },
  {
    key: "agency",
    href: "/dashboard/agency",
    label: {
      ar: "لوحة الوكالة",
      en: "Agency board",
    },
    roles: [USER_ROLES.PLATFORM_ADMIN, USER_ROLES.AGENCY_AGENT],
  },
  {
    key: "support",
    href: "/dashboard/support",
    label: {
      ar: "لوحة الدعم",
      en: "Support board",
    },
    roles: [USER_ROLES.PLATFORM_ADMIN, USER_ROLES.CUSTOMER_SUPPORT],
  },
];

export function getRoleLabel(role, locale = "ar") {
  return roleLabels[role]?.[locale] || role;
}

export function getDefaultDashboardPath(role) {
  switch (role) {
    case USER_ROLES.PLATFORM_ADMIN:
    case USER_ROLES.PLATFORM_FINANCE:
      return "/dashboard/admin";
    case USER_ROLES.COMPANY_ADMIN:
    case USER_ROLES.COMPANY_AGENT:
      return "/dashboard/operator";
    case USER_ROLES.AGENCY_AGENT:
      return "/dashboard/agency";
    case USER_ROLES.CUSTOMER_SUPPORT:
      return "/dashboard/support";
    default:
      return "/dashboard";
  }
}

export function hasSectionAccess(role, sectionKey) {
  const section = dashboardSections.find((item) => item.key === sectionKey);
  return Boolean(section && section.roles.includes(role));
}

export function getDashboardNavigation(role, locale = "ar") {
  return dashboardSections
    .filter((section) => section.roles.includes(role))
    .map((section) => ({
      key: section.key,
      href: section.href,
      label: section.label[locale],
    }));
}
