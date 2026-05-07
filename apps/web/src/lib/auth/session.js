import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hasSectionAccess } from "@/lib/auth/roles";

const SESSION_COOKIE_NAME = "lb_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const SESSION_SECRET =
  process.env.AUTH_SECRET || "dev-only-secret-change-in-production";

function encodePayload(payload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(value) {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function signValue(value) {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createSessionToken(user) {
  const payload = {
    sub: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    organizationName: user.organizationName,
    dashboardPath: user.dashboardPath,
    companyId: user.companyId || null,
    companySlug: user.companySlug || null,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const encodedPayload = encodePayload(payload);
  const signature = signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [payloadSegment, signature] = token.split(".");
  const expectedSignature = signValue(payloadSegment);

  if (!signature || !safeCompare(signature, expectedSignature)) {
    return null;
  }

  const payload = decodePayload(payloadSegment);

  if (!payload || !payload.exp || payload.exp < Date.now()) {
    return null;
  }

  return payload;
}

export async function setSessionCookie(user) {
  const cookieStore = await cookies();
  const token = createSessionToken(user);

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return verifySessionToken(token);
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireSectionAccess(sectionKey) {
  const session = await requireAuth();

  if (!hasSectionAccess(session.role, sectionKey)) {
    redirect("/unauthorized");
  }

  return session;
}
