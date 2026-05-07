import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import { isDemoEmailReserved } from "@/lib/auth/demo-users";
import { getDefaultDashboardPath, USER_ROLES } from "@/lib/auth/roles";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "marketplace.json");

const EMPTY_STORE = {
  companies: [],
  users: [],
  programs: [],
  subscriptions: [],
};

async function ensureDataFile() {
  await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });

  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    await fs.writeFile(
      DATA_FILE_PATH,
      JSON.stringify(EMPTY_STORE, null, 2),
      "utf8",
    );
  }
}

async function readStore() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE_PATH, "utf8");
  return JSON.parse(raw);
}

async function writeStore(store) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(store, null, 2), "utf8");
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function createPasswordHash(password) {
  return scryptSync(password, "luxor-balloon-salt", 64).toString("hex");
}

function verifyPassword(password, passwordHash) {
  const expectedHash = Buffer.from(passwordHash, "hex");
  const candidateHash = Buffer.from(
    createPasswordHash(password),
    "hex",
  );

  if (expectedHash.length !== candidateHash.length) {
    return false;
  }

  return timingSafeEqual(expectedHash, candidateHash);
}

export function slugify(value) {
  const normalized = value
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalized || `item-${Date.now()}`;
}

function ensureUniqueSlug(baseSlug, items) {
  let candidate = baseSlug;
  let counter = 2;

  while (items.some((item) => item.slug === candidate)) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return candidate;
}

function toSessionUser(user, company) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    organizationName: company?.name || user.organizationName || "Luxor Balloon Hub",
    dashboardPath: getDefaultDashboardPath(user.role),
    companyId: user.companyId || null,
    companySlug: company?.slug || null,
  };
}

export async function getAllCompanies() {
  const store = await readStore();

  return [...store.companies].sort((left, right) =>
    left.name.localeCompare(right.name),
  );
}

export async function getPublishedPrograms() {
  const store = await readStore();
  const companiesById = new Map(store.companies.map((company) => [company.id, company]));

  return store.programs
    .filter((program) => program.status === "published")
    .map((program) => ({
      ...program,
      company: companiesById.get(program.companyId) || null,
    }))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function getFeaturedPrograms(limit = 3) {
  const programs = await getPublishedPrograms();
  return programs.slice(0, limit);
}

export async function getProgramBySlug(slug) {
  const programs = await getPublishedPrograms();
  return programs.find((program) => program.slug === slug) || null;
}

export async function getCompanyPrograms(companyId) {
  const store = await readStore();

  return store.programs
    .filter((program) => program.companyId === companyId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function getCompanySubscriptions(companyId) {
  const store = await readStore();
  const programsById = new Map(store.programs.map((program) => [program.id, program]));

  return store.subscriptions
    .filter((item) => item.companyId === companyId)
    .map((item) => ({
      ...item,
      programTitle: programsById.get(item.programId)?.title || "برنامج غير معروف",
    }))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function getCompanyById(companyId) {
  const store = await readStore();
  return store.companies.find((company) => company.id === companyId) || null;
}

export async function authenticateStoredUser(email, password) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(email);
  const user = store.users.find((item) => item.email === normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  const company = store.companies.find((item) => item.id === user.companyId) || null;
  return toSessionUser(user, company);
}

export async function createCompanyAccount(input) {
  const store = await readStore();
  const email = normalizeEmail(input.email);
  const companySlug = ensureUniqueSlug(
    slugify(input.companyName),
    store.companies,
  );

  const emailExists =
    store.users.some((user) => user.email === email) || isDemoEmailReserved(email);

  if (emailExists) {
    return {
      error: "البريد الإلكتروني مستخدم بالفعل. جرّب بريدًا آخر أو سجّل الدخول.",
    };
  }

  const companyId = randomUUID();
  const userId = randomUUID();
  const company = {
    id: companyId,
    slug: companySlug,
    name: input.companyName.trim(),
    description: input.companyDescription.trim(),
    phone: input.phone.trim(),
    email,
    city: input.city.trim() || "Luxor",
    status: "active",
    createdAt: new Date().toISOString(),
  };

  const user = {
    id: userId,
    companyId,
    fullName: input.fullName.trim(),
    email,
    phone: input.phone.trim(),
    passwordHash: createPasswordHash(input.password),
    role: USER_ROLES.COMPANY_ADMIN,
    organizationName: company.name,
    createdAt: new Date().toISOString(),
  };

  store.companies.push(company);
  store.users.push(user);
  await writeStore(store);

  return {
    user: toSessionUser(user, company),
  };
}

export async function createProgramForCompany(companyId, input) {
  const store = await readStore();
  const company = store.companies.find((item) => item.id === companyId);

  if (!company) {
    return {
      error: "تعذر العثور على الشركة المرتبطة بالحساب الحالي.",
    };
  }

  const baseSlug = slugify(input.title);
  const slug = ensureUniqueSlug(baseSlug, store.programs);

  const program = {
    id: randomUUID(),
    companyId,
    slug,
    title: input.title.trim(),
    shortDescription: input.shortDescription.trim(),
    description: input.description.trim(),
    meetingPoint: input.meetingPoint.trim(),
    flightWindow: input.flightWindow.trim(),
    duration: input.duration.trim(),
    priceAdult: Number(input.priceAdult),
    priceChild: Number(input.priceChild || 0),
    capacity: Number(input.capacity),
    status: input.status,
    createdAt: new Date().toISOString(),
  };

  store.programs.push(program);
  await writeStore(store);

  return {
    program,
  };
}

export async function createSubscriptionForProgram(programId, input) {
  const store = await readStore();
  const program = store.programs.find((item) => item.id === programId);

  if (!program || program.status !== "published") {
    return {
      error: "هذا البرنامج غير متاح للحجز حاليًا.",
    };
  }

  const subscription = {
    id: randomUUID(),
    programId: program.id,
    companyId: program.companyId,
    customerName: input.customerName.trim(),
    customerEmail: normalizeEmail(input.customerEmail),
    customerPhone: input.customerPhone.trim(),
    travelDate: input.travelDate,
    adults: Number(input.adults),
    children: Number(input.children || 0),
    notes: input.notes.trim(),
    status: "new",
    createdAt: new Date().toISOString(),
  };

  store.subscriptions.push(subscription);
  await writeStore(store);

  return {
    subscription,
  };
}

export async function updateSubscriptionStatus(companyId, subscriptionId, status) {
  const store = await readStore();
  const subscription = store.subscriptions.find(
    (item) => item.id === subscriptionId && item.companyId === companyId,
  );

  if (!subscription) {
    return {
      error: "الطلب غير موجود أو لا يخص هذه الشركة.",
    };
  }

  subscription.status = status;
  await writeStore(store);

  return {
    subscription,
  };
}

export async function getCompanyDashboardSnapshot(companyId) {
  const [company, programs, subscriptions] = await Promise.all([
    getCompanyById(companyId),
    getCompanyPrograms(companyId),
    getCompanySubscriptions(companyId),
  ]);

  const publishedPrograms = programs.filter((program) => program.status === "published");
  const newSubscriptions = subscriptions.filter((item) => item.status === "new");
  const confirmedSubscriptions = subscriptions.filter(
    (item) => item.status === "confirmed",
  );

  return {
    company,
    programs,
    subscriptions,
    stats: {
      totalPrograms: programs.length,
      publishedPrograms: publishedPrograms.length,
      newSubscriptions: newSubscriptions.length,
      confirmedSubscriptions: confirmedSubscriptions.length,
    },
  };
}
