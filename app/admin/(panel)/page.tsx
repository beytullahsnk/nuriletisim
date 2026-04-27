import Link from "next/link";
import { getAllPhones } from "@/lib/db/queries";
import { formatTRY, conditionLabel } from "@/lib/format";
import { PhoneRow } from "./PhoneRow";
import { PhoneCardAdmin } from "./PhoneCardAdmin";

export default async function AdminDashboard() {
  const phones = await getAllPhones();
  const inStockCount = phones.filter((p) => p.inStock).length;

  const items = phones.map((p) => ({
    id: p.id,
    brand: p.brand,
    model: p.model,
    storage: p.storage,
    color: p.color,
    conditionLabel: conditionLabel(p.condition),
    priceFormatted: formatTRY(p.priceTry),
    inStock: p.inStock,
    featured: p.featured,
    coverUrl: p.images[0]?.url ?? null,
  }));

  return (
    <div className="pb-24 md:pb-0">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Telefonlar
          </h1>
          <p className="mt-1 text-sm text-muted">
            Toplam {phones.length} · Stokta {inStockCount}
          </p>
        </div>
        <Link
          href="/admin/telefon/yeni"
          className="hidden md:inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-white"
        >
          + Yeni Telefon Ekle
        </Link>
      </div>

      {phones.length === 0 ? (
        <div className="rounded-3xl bg-white border border-border/60 p-10 md:p-16 text-center">
          <p className="text-lg font-medium">Henüz telefon eklenmemiş.</p>
          <p className="mt-1 text-sm text-muted">
            Aşağıdaki butona dokunarak ilk telefonu ekleyin.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="md:hidden flex flex-col gap-3">
            {items.map((p) => (
              <PhoneCardAdmin key={p.id} phone={p} />
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-hidden rounded-3xl bg-white border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Foto</th>
                  <th className="px-4 py-3 font-medium">Marka / Model</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Fiyat</th>
                  <th className="px-4 py-3 font-medium text-center">Stok</th>
                  <th className="px-4 py-3 font-medium text-center">
                    Öne Çıkan
                  </th>
                  <th className="px-4 py-3 font-medium text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {items.map((p) => (
                  <PhoneRow key={p.id} phone={p} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Mobile floating action button */}
      <Link
        href="/admin/telefon/yeni"
        className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        + Yeni Telefon Ekle
      </Link>
    </div>
  );
}
