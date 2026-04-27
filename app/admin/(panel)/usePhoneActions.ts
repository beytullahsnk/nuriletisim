"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export type Busy = "stock" | "featured" | "delete" | null;

export function usePhoneActions(phoneId: number) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState<Busy>(null);

  async function patch(field: "inStock" | "featured", value: boolean) {
    setBusy(field === "inStock" ? "stock" : "featured");
    try {
      const res = await fetch(`/api/phones/${phoneId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) startTransition(() => router.refresh());
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    setBusy("delete");
    try {
      const res = await fetch(`/api/phones/${phoneId}`, { method: "DELETE" });
      if (res.ok) startTransition(() => router.refresh());
    } finally {
      setBusy(null);
      setConfirming(false);
    }
  }

  return {
    isPending,
    busy,
    confirming,
    setConfirming,
    toggleStock: (v: boolean) => patch("inStock", v),
    toggleFeatured: (v: boolean) => patch("featured", v),
    remove,
  };
}
