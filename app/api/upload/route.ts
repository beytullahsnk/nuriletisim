import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Geçersiz form" }, { status: 400 });
  }

  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "Dosya yok" }, { status: 400 });
  }

  const uploaded: { url: string }[] = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: `Dosya çok büyük: ${file.name} (max 8 MB)` },
        { status: 413 },
      );
    }
    const { url } = await uploadImage(file, "phones");
    uploaded.push({ url });
  }

  return NextResponse.json({ files: uploaded });
}
