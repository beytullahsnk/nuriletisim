export const SHOP = {
  name: "Nur İletişim",
  fullName: "Nur İletişim Vodafone",
  tagline:
    "Telefon satışı, Vodafone SIM, mobil yükleme ve telefon tamir servisi",
  shortTagline: "Telefon satışı · Vodafone · Tamir servisi",
  address: "Topselvi, Topselvi Cd. No: 47A, 34873 Kartal/İstanbul",
  addressShort: "Topselvi Cd. No: 47A, Kartal/İstanbul",
  phone: "+90 530 850 34 29",
  phoneIntl: "905308503429",
  hours: "Her gün 09:00 – 21:00",
  hoursDays: [
    { day: "Pazartesi", hours: "09:00 – 21:00" },
    { day: "Salı", hours: "09:00 – 21:00" },
    { day: "Çarşamba", hours: "09:00 – 21:00" },
    { day: "Perşembe", hours: "09:00 – 21:00" },
    { day: "Cuma", hours: "09:00 – 21:00" },
    { day: "Cumartesi", hours: "09:00 – 21:00" },
    { day: "Pazar", hours: "09:00 – 21:00" },
  ],
  mapsEmbed:
    "https://www.google.com/maps?q=Topselvi+Cd.+No+47A+Kartal+Istanbul&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Topselvi+Cd.+No+47A+Kartal+Istanbul",
} as const;

export const BRANDS = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Huawei",
  "Honor",
  "Oppo",
  "Realme",
  "Diğer",
] as const;

export type Brand = (typeof BRANDS)[number];

export const CONDITIONS = [
  { value: "sifir", label: "Sıfır" },
  { value: "ikinci_el", label: "İkinci El" },
] as const;

export type Condition = (typeof CONDITIONS)[number]["value"];

export const NAV_LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/telefonlar", label: "Telefonlar" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuriletisim.vercel.app";
