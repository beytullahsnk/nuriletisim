import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPhoneBySlug } from "@/lib/db/queries";
import { conditionLabel, formatTRY } from "@/lib/format";
import { SHOP } from "@/lib/constants";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  if (!phone) return { title: "Telefon bulunamadı" };
  const title = `${phone.brand} ${phone.model}${phone.storage ? " " + phone.storage : ""}`;
  return {
    title,
    description: phone.description ?? `${title} — ${SHOP.fullName} mağazasında.`,
  };
}

export default async function PhoneDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  if (!phone) notFound();

  const cover = phone.images[0]?.url;
  const rest = phone.images.slice(1);

  const waMessage = encodeURIComponent(
    `Merhaba, ${phone.brand} ${phone.model}${phone.storage ? " " + phone.storage : ""} hakkında bilgi almak istiyorum.`,
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-24">
        <nav className="text-sm text-muted">
          <Link href="/telefonlar" className="hover:text-foreground">
            Telefonlar
          </Link>
          <span className="mx-2">/</span>
          <span>{phone.brand}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square rounded-3xl bg-surface overflow-hidden">
              {cover ? (
                <Image
                  src={cover}
                  alt={`${phone.brand} ${phone.model}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                  unoptimized={!cover.startsWith("/")}
                />
              ) : (
                <div className="h-full w-full bg-surface" />
              )}
            </div>
            {rest.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {rest.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square rounded-xl bg-surface overflow-hidden"
                  >
                    <Image
                      src={img.url}
                      alt={`${phone.brand} ${phone.model}`}
                      fill
                      sizes="120px"
                      className="object-contain"
                      unoptimized={!img.url.startsWith("/")}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:pt-4">
            <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
              {phone.brand}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
              {phone.model}
            </h1>
            {(phone.storage || phone.color) && (
              <p className="mt-3 text-lg text-muted">
                {[phone.storage, phone.color].filter(Boolean).join(" · ")}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span
                className={
                  phone.condition === "sifir"
                    ? "rounded-full bg-foreground text-white px-3 py-1 text-xs font-medium"
                    : "rounded-full bg-surface text-foreground px-3 py-1 text-xs font-medium border border-border"
                }
              >
                {conditionLabel(phone.condition)}
              </span>
              {phone.inStock ? (
                <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium border border-emerald-200">
                  Mağazada mevcut
                </span>
              ) : (
                <span className="rounded-full bg-red-50 text-accent-red px-3 py-1 text-xs font-medium border border-red-200">
                  Stokta yok
                </span>
              )}
            </div>

            <p className="mt-8 text-4xl font-semibold tracking-tight">
              {formatTRY(phone.priceTry)}
            </p>
            <p className="mt-1 text-sm text-muted">
              KDV dahil · Ödeme mağazada (nakit / kart / havale).
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${SHOP.phoneIntl}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-[15px] font-medium text-white"
              >
                WhatsApp ile iletişime geç
              </a>
              <a
                href={`tel:${SHOP.phoneIntl}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-7 text-[15px] font-medium"
              >
                Mağazayı ara
              </a>
            </div>

            {phone.description && (
              <div className="mt-10 border-t border-border pt-8">
                <h2 className="text-sm uppercase tracking-[0.1em] text-muted">
                  Açıklama
                </h2>
                <p className="mt-3 text-base leading-relaxed whitespace-pre-line">
                  {phone.description}
                </p>
              </div>
            )}

            <div className="mt-10 rounded-3xl bg-surface p-6">
              <p className="text-sm text-muted">Mağaza</p>
              <p className="mt-1 font-medium">{SHOP.fullName}</p>
              <p className="mt-1 text-sm text-muted">{SHOP.address}</p>
              <p className="mt-1 text-sm text-muted">{SHOP.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
