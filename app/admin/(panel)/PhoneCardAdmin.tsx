"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePhoneActions } from "./usePhoneActions";
import { Toggle } from "./Toggle";

type Props = {
  phone: {
    id: number;
    brand: string;
    model: string;
    storage: string | null;
    color: string | null;
    conditionLabel: string;
    priceFormatted: string;
    inStock: boolean;
    featured: boolean;
    coverUrl: string | null;
  };
};

export function PhoneCardAdmin({ phone }: Props) {
  const a = usePhoneActions(phone.id);

  return (
    <div
      className={clsx(
        "rounded-2xl bg-white border border-border/60 overflow-hidden transition-opacity",
        a.isPending && "opacity-60",
      )}
    >
      <div className="flex gap-3 p-3">
        <div className="relative h-20 w-20 shrink-0 rounded-xl bg-surface overflow-hidden">
          {phone.coverUrl ? (
            <Image
              src={phone.coverUrl}
              alt={phone.model}
              fill
              sizes="80px"
              className="object-contain"
              unoptimized={!phone.coverUrl.startsWith("/")}
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-muted truncate">
                {phone.brand}
              </p>
              <p className="font-semibold leading-tight truncate">
                {phone.model}
              </p>
              <p className="text-xs text-muted truncate">
                {[phone.storage, phone.color].filter(Boolean).join(" · ") || "—"}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-[11px]">
              {phone.conditionLabel}
            </span>
          </div>
          <p className="mt-1 text-base font-semibold">{phone.priceFormatted}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-border/60 divide-x divide-border/60 text-sm">
        <label className="flex items-center justify-between gap-2 px-4 py-3">
          <span className="text-muted">Stokta</span>
          <Toggle
            on={phone.inStock}
            loading={a.busy === "stock"}
            label="Stokta"
            onChange={a.toggleStock}
          />
        </label>
        <label className="flex items-center justify-between gap-2 px-4 py-3">
          <span className="text-muted">Öne çıkan</span>
          <Toggle
            on={phone.featured}
            loading={a.busy === "featured"}
            label="Öne çıkan"
            onChange={a.toggleFeatured}
          />
        </label>
      </div>

      <div className="flex items-center gap-2 border-t border-border/60 p-3">
        <Link
          href={`/admin/telefon/${phone.id}`}
          className="flex-1 inline-flex items-center justify-center rounded-full border border-border bg-white px-4 h-10 text-sm font-medium"
        >
          Düzenle
        </Link>
        {a.confirming ? (
          <>
            <button
              type="button"
              onClick={a.remove}
              disabled={a.busy === "delete"}
              className="flex-1 inline-flex items-center justify-center rounded-full bg-accent-red text-white px-4 h-10 text-sm font-medium disabled:opacity-50"
            >
              {a.busy === "delete" ? "Siliniyor..." : "Onayla"}
            </button>
            <button
              type="button"
              onClick={() => a.setConfirming(false)}
              className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 h-10 text-sm text-muted"
            >
              İptal
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => a.setConfirming(true)}
            className="inline-flex items-center justify-center rounded-full border border-red-200 text-accent-red px-4 h-10 text-sm font-medium"
          >
            Sil
          </button>
        )}
      </div>
    </div>
  );
}
