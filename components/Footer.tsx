import Link from "next/link";
import { SHOP } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface text-[13px] text-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-foreground font-semibold text-base">
              {SHOP.fullName}
            </p>
            <p className="mt-2 max-w-md">{SHOP.tagline}</p>
            <p className="mt-4">
              <a
                href={SHOP.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                {SHOP.address}
              </a>
            </p>
          </div>

          <div>
            <p className="text-foreground font-medium">Mağaza</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/telefonlar" className="hover:text-foreground">
                  Telefonlar
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="hover:text-foreground">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-foreground">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-foreground font-medium">İletişim</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`tel:${SHOP.phoneIntl}`}
                  className="hover:text-foreground"
                >
                  {SHOP.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SHOP.phoneIntl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  WhatsApp
                </a>
              </li>
              <li>{SHOP.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SHOP.fullName}. Tüm hakları saklıdır.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-3 py-1 text-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-red" />
              Vodafone Yetkili Bayi
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
