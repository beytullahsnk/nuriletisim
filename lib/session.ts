import type { SessionOptions } from "iron-session";

export type AdminSession = {
  isAdmin?: boolean;
};

const sessionPassword =
  process.env.SESSION_SECRET ??
  "dev-only-insecure-session-secret-change-me-please-1234567890";

export const sessionOptions: SessionOptions = {
  password: sessionPassword,
  cookieName: "nuriletisim_admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  },
};
