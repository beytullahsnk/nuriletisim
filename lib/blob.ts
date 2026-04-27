import { put } from "@vercel/blob";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type UploadResult = { url: string };

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function uploadImage(
  file: File,
  folder = "phones",
): Promise<UploadResult> {
  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const key = `${folder}/${Date.now()}-${randomUUID()}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, file, {
      access: "public",
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { url: blob.url };
  }

  // Local dev fallback: write to public/uploads/<folder>/...
  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = path.join(LOCAL_UPLOAD_DIR, folder);
  await mkdir(dir, { recursive: true });
  const filename = path.basename(key);
  await writeFile(path.join(dir, filename), buffer);
  return { url: `/uploads/${folder}/${filename}` };
}
