"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/giris");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="text-sm text-foreground/80 hover:text-foreground rounded-full border border-border bg-white px-3 py-1.5 disabled:opacity-50"
    >
      {pending ? "Çıkış..." : "Çıkış"}
    </button>
  );
}
