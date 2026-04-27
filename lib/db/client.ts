import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;
const onVercel = process.env.VERCEL === "1";

/**
 * Pick the database URL based on environment:
 * - Turso configured → use it (production case).
 * - Local dev → use a SQLite file at ./local.db.
 * - On Vercel without Turso → use in-memory SQLite. The filesystem is
 *   read-only outside /tmp, so we MUST NOT default to a file URL there.
 *   Queries will fail (no tables) but `safe()` in lib/db/queries.ts catches
 *   that and the public site still renders.
 */
const url = tursoUrl ?? (onVercel ? ":memory:" : "file:./local.db");

export const dbConfigured = Boolean(tursoUrl);

let client: Client;
try {
  client = createClient({ url, authToken: tursoToken });
} catch (err) {
  console.error("[db] createClient failed, falling back to :memory:", err);
  client = createClient({ url: ":memory:" });
}

export const db = drizzle(client, { schema });
