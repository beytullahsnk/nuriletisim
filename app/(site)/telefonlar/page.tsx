import Link from "next/link";
import type { Metadata } from "next";
import { PhoneCard } from "@/components/PhoneCard";
import { getAllPhones } from "@/lib/db/queries";
import { BRANDS, CONDITIONS } from "@/lib/constants";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Telefonlar",
  description:
    "Mağazamızda bulunan iPhone, Samsung, Xiaomi ve diğer markaların sıfır ve ikinci el telefon stokunu inceleyin.",
};

type SearchParams = {
  marka?: string;
  durum?: "sifir" | "ikinci_el";
};

export default async function PhonesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const brand = params.marka && BRANDS.includes(params.marka as (typeof BRANDS)[number])
    ? params.marka
    : undefined;
  const condition =
    params.durum === "sifir" || params.durum === "ikinci_el"
      ? params.durum
      : undefined;

  const phones = await getAllPhones({ brand, condition });

  const buildHref = (next: Partial<SearchParams>) => {
    const sp = new URLSearchParams();
    const merged = { marka: brand, durum: condition, ...next };
    if (merged.marka) sp.set("marka", merged.marka);
    if (merged.durum) sp.set("durum", merged.durum);
    const query = sp.toString();
    return query ? `/telefonlar?${query}` : "/telefonlar";
  };

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10">
          <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
            Mağaza
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            Tüm telefonlar
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            Mağazada bulunan stoklarımız. Sorularınız için WhatsApp&apos;tan
            ulaşabilir veya doğrudan mağazaya gelebilirsiniz.
          </p>
        </div>
      </section>

      <section className="sticky top-12 z-30 border-y border-border/60 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2 items-center">
          <span className="text-[12px] uppercase tracking-[0.08em] text-muted mr-2">
            Marka
          </span>
          <FilterChip href={buildHref({ marka: undefined })} active={!brand}>
            Tümü
          </FilterChip>
          {BRANDS.map((b) => (
            <FilterChip
              key={b}
              href={buildHref({ marka: b })}
              active={brand === b}
            >
              {b}
            </FilterChip>
          ))}
          <span className="mx-2 hidden md:inline-block h-6 w-px bg-border" />
          <span className="text-[12px] uppercase tracking-[0.08em] text-muted ml-2 mr-2">
            Durum
          </span>
          <FilterChip href={buildHref({ durum: undefined })} active={!condition}>
            Tümü
          </FilterChip>
          {CONDITIONS.map((c) => (
            <FilterChip
              key={c.value}
              href={buildHref({ durum: c.value })}
              active={condition === c.value}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {phones.length === 0 ? (
            <div className="rounded-3xl bg-surface p-16 text-center">
              <p className="text-xl font-medium">
                Bu seçimde telefon bulunamadı.
              </p>
              <p className="mt-2 text-muted">
                Filtreleri kaldırıp tekrar deneyin veya mağazaya ulaşın.
              </p>
              <Link
                href="/telefonlar"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm text-white"
              >
                Tümünü göster
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex h-8 items-center rounded-full px-3 text-[13px] transition-colors",
        active
          ? "bg-foreground text-white"
          : "bg-surface text-foreground/80 hover:bg-border/50",
      )}
    >
      {children}
    </Link>
  );
}
