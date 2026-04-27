import Link from "next/link";
import { PhoneCard } from "@/components/PhoneCard";
import { ServiceCard } from "@/components/ServiceCard";
import { BrandLogos } from "@/components/BrandLogos";
import { LocationMap } from "@/components/LocationMap";
import { getFeaturedPhones } from "@/lib/db/queries";
import { SHOP } from "@/lib/constants";

export default async function HomePage() {
  const featured = await getFeaturedPhones(4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 pb-16 md:pb-24 text-center animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[12px] text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-accent-red" />
            Vodafone Yetkili Bayi · Kartal/İstanbul
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight">
            Yeni nesil telefonlar.
            <br />
            <span className="text-muted">Güvenilir mağazada.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted">
            Apple, Samsung, Xiaomi ve daha fazlası — sıfır ve yenilenmiş.
            Vodafone hat işlemleri, mobil yükleme ve telefon tamir servisi tek
            adreste.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/telefonlar"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-[15px] font-medium text-white transition-colors hover:bg-foreground/90"
            >
              Telefonları gör
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex h-12 items-center justify-center text-accent-blue text-[15px] font-medium hover:underline"
            >
              Mağazaya gel →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured phones */}
      {featured.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
                  Öne Çıkanlar
                </p>
                <h2 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
                  Mağazada şu an
                </h2>
              </div>
              <Link
                href="/telefonlar"
                className="hidden md:inline-flex text-accent-blue text-[15px] hover:underline"
              >
                Tümünü gör →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
            <div className="mt-8 md:hidden text-center">
              <Link
                href="/telefonlar"
                className="text-accent-blue text-[15px] hover:underline"
              >
                Tümünü gör →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
              Hizmetlerimiz
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
              Tek mağaza, üç çözüm.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted text-lg">
              Telefonunuzu alın, hattınızı açtırın, gerekirse onarımını yaptırın
              — hepsi aynı yerde.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            <ServiceCard
              accent="vodafone"
              subtitle="Vodafone"
              title="Hat ve SIM işlemleri"
              description="Yeni hat, numara taşıma, faturalı/faturasız geçiş, eSIM ve tarife değişikliği. Vodafone Yetkili Bayi olarak tüm işlemlerinizi mağazada yapıyoruz."
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <path d="M11 18h2" />
                </svg>
              }
            />
            <ServiceCard
              subtitle="Mobil Yükleme"
              title="Anında kontör ve TL yükleme"
              description="Tüm operatörler için kontör, faturasız hat TL yüklemesi ve internet paketleri. İşlem dakikalar içinde tamamlanır."
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              }
            />
            <ServiceCard
              subtitle="Tamir Servisi"
              title="Telefon tamir atölyesi"
              description="Ekran değişimi, batarya yenileme, kamera ve şarj soketi tamiri. Marka ayırt etmeksizin tüm modeller — aynı gün teslim çoğu zaman mümkün."
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a4.5 4.5 0 0 0-6.4 6.4l-5 5a2 2 0 0 0 2.8 2.8l5-5a4.5 4.5 0 0 0 6.4-6.4l-2.4 2.4-2-2 2.4-2.4Z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white">
        <BrandLogos />
      </section>

      {/* Location */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
                Mağaza
              </p>
              <h2 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
                Kartal&apos;da, sizden bir adım uzakta.
              </h2>
              <dl className="mt-8 space-y-5 text-base">
                <div>
                  <dt className="text-muted text-sm">Adres</dt>
                  <dd className="mt-1">{SHOP.address}</dd>
                </div>
                <div>
                  <dt className="text-muted text-sm">Telefon</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${SHOP.phoneIntl}`}
                      className="hover:underline"
                    >
                      {SHOP.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted text-sm">Çalışma Saatleri</dt>
                  <dd className="mt-1">{SHOP.hours}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SHOP.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm text-white"
                >
                  Yol tarifi al
                </a>
                <a
                  href={`https://wa.me/${SHOP.phoneIntl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-6 text-sm"
                >
                  WhatsApp ile yaz
                </a>
              </div>
            </div>
            <LocationMap />
          </div>
        </div>
      </section>
    </div>
  );
}
