import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sessionOptions, type AdminSession } from "./session";

export type { AdminSession } from "./session";
export { sessionOptions } from "./session";

export async function getSession() {
  const store = await cookies();
  return getIronSession<AdminSession>(store, sessionOptions);
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session.isAdmin === true;
}

export async function verifyPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    if (process.env.NODE_ENV !== "production") {
      return plain === "admin";
    }
    return false;
  }
  return bcrypt.compare(plain, hash);
}
