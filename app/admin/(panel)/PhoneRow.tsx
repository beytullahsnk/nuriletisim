"use client";

import Image from "next/image";
import Link from "next/link";
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

export function PhoneRow({ phone }: Props) {
  const a = usePhoneActions(phone.id);

  return (
    <tr className={a.isPending ? "opacity-60" : ""}>
      <td className="px-4 py-3">
        <div className="relative h-12 w-12 rounded-lg bg-surface overflow-hidden">
          {phone.coverUrl ? (
            <Image
              src={phone.coverUrl}
              alt={phone.model}
              fill
              sizes="48px"
              className="object-contain"
              unoptimized={!phone.coverUrl.startsWith("/")}
            />
          ) : null}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="font-medium">
          {phone.brand} {phone.model}
        </div>
        <div className="text-xs text-muted">
          {[phone.storage, phone.color].filter(Boolean).join(" · ") || "—"}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-xs">
          {phone.conditionLabel}
        </span>
      </td>
      <td className="px-4 py-3 font-medium">{phone.priceFormatted}</td>
      <td className="px-4 py-3 text-center">
        <Toggle
          on={phone.inStock}
          loading={a.busy === "stock"}
          label="Stokta"
          onChange={a.toggleStock}
        />
      </td>
      <td className="px-4 py-3 text-center">
        <Toggle
          on={phone.featured}
          loading={a.busy === "featured"}
          label="Öne çıkan"
          onChange={a.toggleFeatured}
        />
      </td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center gap-2">
          <Link
            href={`/admin/telefon/${phone.id}`}
            className="text-xs rounded-full border border-border px-3 py-1 hover:bg-surface"
          >
            Düzenle
          </Link>
          {a.confirming ? (
            <>
              <button
                type="button"
                onClick={a.remove}
                disabled={a.busy === "delete"}
                className="text-xs rounded-full bg-accent-red text-white px-3 py-1 disabled:opacity-50"
              >
                {a.busy === "delete" ? "Siliniyor..." : "Onayla"}
              </button>
              <button
                type="button"
                onClick={() => a.setConfirming(false)}
                className="text-xs text-muted px-2 py-1"
              >
                İptal
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => a.setConfirming(true)}
              className="text-xs rounded-full border border-red-200 text-accent-red px-3 py-1 hover:bg-red-50"
            >
              Sil
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
