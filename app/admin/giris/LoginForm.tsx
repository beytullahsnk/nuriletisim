"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({ from }: { from?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Giriş başarısız.");
        return;
      }
      router.push(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm text-foreground/80 mb-1.5">
          Şifre
        </label>
        <input
          id="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 rounded-xl border border-border bg-white px-4 text-base outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>
      {error && (
        <p className="text-sm text-accent-red bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full h-11 rounded-full bg-foreground text-white text-sm font-medium disabled:opacity-50"
      >
        {pending ? "Giriş yapılıyor..." : "Giriş yap"}
      </button>
    </form>
  );
}
