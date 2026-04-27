import type { Metadata } from "next";
import { LocationMap } from "@/components/LocationMap";
import { SHOP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Kartal/İstanbul Topselvi Caddesi'ndeki Nur İletişim mağazamızın adresi, telefonu ve çalışma saatleri.",
};

export default function IletisimPage() {
  return (
    <div className="bg-white">
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10">
          <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
            İletişim
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            Bize ulaşın.
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            Mağazamıza gelin, arayın ya da WhatsApp&apos;tan yazın. Her gün
            yanınızdayız.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 rounded-3xl bg-surface p-8 md:p-10">
              <h2 className="text-2xl font-semibold tracking-tight">
                {SHOP.fullName}
              </h2>
              <p className="mt-1 text-muted">{SHOP.shortTagline}</p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm text-muted">Adres</dt>
                  <dd className="mt-1">
                    <a
                      href={SHOP.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {SHOP.address}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Telefon</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${SHOP.phoneIntl}`}
                      className="text-lg font-medium hover:underline"
                    >
                      {SHOP.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={`https://wa.me/${SHOP.phoneIntl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Sohbet başlat
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-sm text-muted mb-3">Çalışma saatleri</p>
                <ul className="space-y-2 text-[15px]">
                  {SHOP.hoursDays.map((d) => (
                    <li
                      key={d.day}
                      className="flex items-center justify-between"
                    >
                      <span>{d.day}</span>
                      <span className="text-muted">{d.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SHOP.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm text-white"
                >
                  Yol tarifi
                </a>
                <a
                  href={`tel:${SHOP.phoneIntl}`}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-6 text-sm"
                >
                  Hemen ara
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <LocationMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
