import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { phones, phoneImages } from "@/lib/db/schema";
import { buildPhoneSlug } from "@/lib/slug";
import { eq } from "drizzle-orm";

const phoneCreateSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  storage: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  condition: z.enum(["sifir", "ikinci_el"]),
  priceTry: z.number().int().nonnegative(),
  description: z.string().optional().nullable(),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  slug: z.string().optional(),
  imageUrls: z.array(z.string().url().or(z.string().startsWith("/"))).default([]),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = phoneCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Geçersiz veri", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const baseSlug =
    data.slug?.trim() ||
    buildPhoneSlug({
      brand: data.brand,
      model: data.model,
      storage: data.storage,
      color: data.color,
    });
  const slug = await uniqueSlug(baseSlug);

  const inserted = await db
    .insert(phones)
    .values({
      slug,
      brand: data.brand,
      model: data.model,
      storage: data.storage ?? null,
      color: data.color ?? null,
      condition: data.condition,
      priceTry: data.priceTry,
      description: data.description ?? null,
      inStock: data.inStock,
      featured: data.featured,
    })
    .returning({ id: phones.id });

  const phoneId = inserted[0].id;

  if (data.imageUrls.length) {
    await db.insert(phoneImages).values(
      data.imageUrls.map((url, i) => ({ phoneId, url, position: i })),
    );
  }

  return NextResponse.json({ id: phoneId, slug }, { status: 201 });
}

async function uniqueSlug(base: string): Promise<string> {
  let candidate = base;
  let i = 2;
  while (true) {
    const exists = await db
      .select({ id: phones.id })
      .from(phones)
      .where(eq(phones.slug, candidate))
      .limit(1);
    if (exists.length === 0) return candidate;
    candidate = `${base}-${i++}`;
    if (i > 50) return `${base}-${Date.now()}`;
  }
}
