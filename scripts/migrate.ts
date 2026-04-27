import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const onVercel = process.env.VERCEL === "1";

  // On Vercel without Turso configured: skip silently so the build still succeeds.
  // The safe wrappers in lib/db/queries.ts let the public site render with empty data.
  if (onVercel && !url) {
    console.log(
      "[migrate] No TURSO_DATABASE_URL on Vercel — skipping migrations.",
    );
    return;
  }

  const finalUrl = url ?? "file:./local.db";
  const client = createClient({ url: finalUrl, authToken });
  const db = drizzle(client);
  console.log(`[migrate] Running migrations on ${finalUrl}...`);
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("[migrate] Done.");
  client.close();
}

main().catch((err) => {
  console.error("[migrate] Failed:", err);
  process.exit(1);
});
