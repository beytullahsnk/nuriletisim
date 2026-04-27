import type { Metadata } from "next";
import Link from "next/link";
import { SHOP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Vodafone hat işlemleri, mobil yükleme ve telefon tamir servisi — Nur İletişim Kartal mağazasında.",
};

const SERVICES = [
  {
    id: "vodafone",
    badge: "Vodafone",
    title: "Hat ve SIM işlemleri",
    description:
      "Vodafone Yetkili Bayi olarak yeni hat açma, numara taşıma, faturalı/faturasız geçiş, tarife değişikliği ve eSIM hizmetleri sunuyoruz. Tüm işlemler mağazada anında tamamlanır — kimliğinizi getirmeniz yeterli.",
    bullets: [
      "Yeni hat açma (faturalı / faturasız)",
      "Numara taşıma",
      "Tarife değişikliği ve ek paketler",
      "eSIM tanımlama",
      "Hat dondurma / iptal işlemleri",
    ],
    accent: true,
  },
  {
    id: "yukleme",
    badge: "Mobil Yükleme",
    title: "Kontör ve TL yükleme",
    description:
      "Tüm GSM operatörleri için anında kontör yükleme, faturasız hat TL yüklemesi ve internet paketi satışı. İşleminiz birkaç dakikada tamamlanır.",
    bullets: [
      "Vodafone TL ve kontör yükleme",
      "Türk Telekom kontör yükleme",
      "Turkcell kontör yükleme",
      "İnternet paketi satışı",
    ],
  },
  {
    id: "tamir",
    badge: "Tamir Servisi",
    title: "Telefon tamir atölyesi",
    description:
      "Marka ayırt etmeksizin tüm akıllı telefon modelleri için profesyonel tamir hizmeti. Orijinal veya muadil parça seçeneği, çoğu işlem aynı gün teslim.",
    bullets: [
      "Ekran (LCD / OLED) değişimi",
      "Batarya değişimi",
      "Şarj soketi onarımı",
      "Ön / arka kamera değişimi",
      "Su teması sonrası bakım",
      "Yazılım ve format işlemleri",
    ],
  },
];

export default function HizmetlerPage() {
  return (
    <div className="bg-white">
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10 text-center">
          <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
            Hizmetler
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            Telefonunuzla ilgili her şey.
            <br />
            <span className="text-muted">Tek mağazada.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Yeni telefonunuzu alın, Vodafone hattınızı açtırın, gerekirse
            onarımını yaptırın — Kartal&apos;da Nur İletişim&apos;de hepsi
            mevcut.
          </p>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={i % 2 === 0 ? "bg-surface-2" : "bg-white"}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <span
                  className={
                    s.accent
                      ? "inline-flex items-center gap-2 rounded-full bg-accent-red text-white px-3 py-1 text-[12px] font-medium"
                      : "inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[12px] text-muted"
                  }
                >
                  {s.accent && (
                    <span className="inline-block h-2 w-2 rounded-full bg-white" />
                  )}
                  {s.badge}
                </span>
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-5 text-lg text-muted leading-relaxed">
                  {s.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${SHOP.phoneIntl}?text=${encodeURIComponent(
                      `Merhaba, ${s.title.toLowerCase()} hakkında bilgi almak istiyorum.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm text-white"
                  >
                    WhatsApp&apos;tan sor
                  </a>
                  <Link
                    href="/iletisim"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-6 text-sm"
                  >
                    Mağazaya gel
                  </Link>
                </div>
              </div>
              <ul className="rounded-3xl bg-white border border-border/60 divide-y divide-border/60 overflow-hidden">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 px-6 py-4 text-base"
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-white">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
