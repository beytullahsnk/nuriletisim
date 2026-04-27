import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { phones, phoneImages } from "@/lib/db/schema";

const phonePatchSchema = z.object({
  brand: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  storage: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  condition: z.enum(["sifir", "ikinci_el"]).optional(),
  priceTry: z.number().int().nonnegative().optional(),
  description: z.string().nullable().optional(),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  slug: z.string().min(1).optional(),
  imageUrls: z
    .array(z.string().url().or(z.string().startsWith("/")))
    .optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = phonePatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Geçersiz veri", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { imageUrls, ...rest } = parsed.data;
  const update: Record<string, unknown> = {
    ...rest,
    updatedAt: new Date().toISOString(),
  };
  if (Object.keys(update).length > 1) {
    await db.update(phones).set(update).where(eq(phones.id, id));
  }

  if (imageUrls) {
    await db.delete(phoneImages).where(eq(phoneImages.phoneId, id));
    if (imageUrls.length) {
      await db
        .insert(phoneImages)
        .values(imageUrls.map((url, i) => ({ phoneId: id, url, position: i })));
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });
  }
  await db.delete(phones).where(eq(phones.id, id));
  return NextResponse.json({ ok: true });
}
