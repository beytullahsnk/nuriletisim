import { NextResponse } from "next/server";
import { getSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  let password = "";
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    password = typeof body?.password === "string" ? body.password : "";
  } else {
    const form = await request.formData();
    password = String(form.get("password") ?? "");
  }

  if (!password) {
    return NextResponse.json({ error: "Şifre gerekli" }, { status: 400 });
  }

  const ok = await verifyPassword(password);
  if (!ok) {
    return NextResponse.json(
      { error: "Şifre hatalı" },
      { status: 401 },
    );
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
