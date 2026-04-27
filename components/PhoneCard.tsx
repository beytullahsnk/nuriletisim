import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { PhoneWithImages } from "@/lib/db/schema";
import { conditionLabel, formatTRY } from "@/lib/format";

type Props = {
  phone: PhoneWithImages;
  size?: "default" | "large";
};

export function PhoneCard({ phone, size = "default" }: Props) {
  const cover = phone.images[0]?.url;
  const isLarge = size === "large";

  return (
    <Link
      href={`/telefonlar/${phone.slug}`}
      className={clsx(
        "group block rounded-3xl bg-surface overflow-hidden transition-transform duration-300",
        "hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
        isLarge ? "p-8 md:p-10" : "p-6",
      )}
    >
      <div className="flex items-start justify-between gap-2 text-[12px] uppercase tracking-[0.06em] text-muted">
        <span>{phone.brand}</span>
        <span
          className={clsx(
            "rounded-full px-2.5 py-1 text-[11px] font-medium",
            phone.condition === "sifir"
              ? "bg-foreground text-white"
              : "bg-white text-foreground border border-border",
          )}
        >
          {conditionLabel(phone.condition)}
        </span>
      </div>

      <h3
        className={clsx(
          "mt-2 font-semibold tracking-tight",
          isLarge ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
        )}
      >
        {phone.model}
      </h3>
      {(phone.storage || phone.color) && (
        <p className="mt-1 text-sm text-muted">
          {[phone.storage, phone.color].filter(Boolean).join(" · ")}
        </p>
      )}

      <div
        className={clsx(
          "relative mx-auto mt-6 flex items-center justify-center",
          isLarge ? "aspect-[4/3]" : "aspect-square",
        )}
      >
        {cover ? (
          <Image
            src={cover}
            alt={`${phone.brand} ${phone.model}`}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            sizes={isLarge ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            unoptimized={!cover.startsWith("/")}
          />
        ) : (
          <div className="h-full w-full rounded-2xl bg-white" />
        )}
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p
            className={clsx(
              "font-semibold",
              isLarge ? "text-2xl" : "text-lg",
            )}
          >
            {formatTRY(phone.priceTry)}
          </p>
          {!phone.inStock && (
            <p className="mt-1 text-xs text-accent-red">Stokta yok</p>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-accent-blue group-hover:underline">
          İncele
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
