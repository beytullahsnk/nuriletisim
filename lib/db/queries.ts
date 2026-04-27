import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "./client";
import {
  phoneImages,
  phones,
  type Phone,
  type PhoneImage,
  type PhoneWithImages,
} from "./schema";

async function attachImages(rows: Phone[]): Promise<PhoneWithImages[]> {
  if (rows.length === 0) return [];
  const ids = rows.map((p) => p.id);
  const images = await db
    .select()
    .from(phoneImages)
    .where(inArray(phoneImages.phoneId, ids))
    .orderBy(asc(phoneImages.position), asc(phoneImages.id));
  const byPhone = new Map<number, PhoneImage[]>();
  for (const img of images) {
    const list = byPhone.get(img.phoneId) ?? [];
    list.push(img);
    byPhone.set(img.phoneId, list);
  }
  return rows.map((p) => ({ ...p, images: byPhone.get(p.id) ?? [] }));
}

export async function getAllPhones(opts?: {
  brand?: string;
  condition?: "sifir" | "ikinci_el";
}): Promise<PhoneWithImages[]> {
  const conditions = [];
  if (opts?.brand) conditions.push(eq(phones.brand, opts.brand));
  if (opts?.condition) conditions.push(eq(phones.condition, opts.condition));
  const rows = await db
    .select()
    .from(phones)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(phones.featured), desc(phones.createdAt));
  return attachImages(rows);
}

export async function getFeaturedPhones(
  limit = 4,
): Promise<PhoneWithImages[]> {
  const rows = await db
    .select()
    .from(phones)
    .where(eq(phones.featured, true))
    .orderBy(desc(phones.createdAt))
    .limit(limit);
  const withImages = await attachImages(rows);
  if (withImages.length >= limit) return withImages;
  // Fallback: top in-stock phones if not enough featured
  const filler = await db
    .select()
    .from(phones)
    .where(eq(phones.inStock, true))
    .orderBy(desc(phones.createdAt))
    .limit(limit);
  const seen = new Set(withImages.map((p) => p.id));
  const extras = filler.filter((p) => !seen.has(p.id));
  const merged = [...withImages, ...(await attachImages(extras))];
  return merged.slice(0, limit);
}

export async function getPhoneBySlug(
  slug: string,
): Promise<PhoneWithImages | null> {
  const rows = await db
    .select()
    .from(phones)
    .where(eq(phones.slug, slug))
    .limit(1);
  if (rows.length === 0) return null;
  const [withImages] = await attachImages(rows);
  return withImages;
}

export async function getPhoneById(
  id: number,
): Promise<PhoneWithImages | null> {
  const rows = await db
    .select()
    .from(phones)
    .where(eq(phones.id, id))
    .limit(1);
  if (rows.length === 0) return null;
  const [withImages] = await attachImages(rows);
  return withImages;
}
