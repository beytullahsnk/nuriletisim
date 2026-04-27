import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { phones, phoneImages } from "../lib/db/schema";
import { buildPhoneSlug } from "../lib/slug";

const SAMPLE = [
  {
    brand: "Apple",
    model: "iPhone 15 Pro",
    storage: "256GB",
    color: "Titanyum Siyah",
    condition: "sifir" as const,
    priceTry: 64999,
    description:
      "Apple A17 Pro çip, 6.1 inç Super Retina XDR ekran, 48 MP ana kamera. 1 yıl Apple Türkiye garantili.",
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200&q=80",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&q=80",
    ],
  },
  {
    brand: "Apple",
    model: "iPhone 14",
    storage: "128GB",
    color: "Mavi",
    condition: "ikinci_el" as const,
    priceTry: 32500,
    description:
      "Çok temiz ikinci el. Batarya sağlığı %92. Kutusu ve aksesuarları ile birlikte.",
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1663761879666-9b8a4c2ee5dd?w=1200&q=80",
    ],
  },
  {
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    storage: "512GB",
    color: "Titanyum Gri",
    condition: "sifir" as const,
    priceTry: 71900,
    description:
      "Galaxy AI, 200 MP kamera, S Pen dahil. Samsung Türkiye garantili.",
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1610792516775-01de03eae630?w=1200&q=80",
    ],
  },
  {
    brand: "Samsung",
    model: "Galaxy A54",
    storage: "256GB",
    color: "Siyah",
    condition: "sifir" as const,
    priceTry: 18999,
    description:
      "Günlük kullanım için ideal. 50 MP üçlü kamera, 5000 mAh batarya.",
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=80",
    ],
  },
  {
    brand: "Xiaomi",
    model: "Redmi Note 13 Pro",
    storage: "256GB",
    color: "Yeşil",
    condition: "sifir" as const,
    priceTry: 14750,
    description:
      "200 MP kamera, AMOLED ekran, 67W hızlı şarj. Xiaomi Türkiye garantili.",
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80",
    ],
  },
  {
    brand: "Apple",
    model: "iPhone 13",
    storage: "128GB",
    color: "Yıldız Işığı",
    condition: "ikinci_el" as const,
    priceTry: 24900,
    description:
      "Yenilenmiş, A sınıfı. 12 ay mağaza garantili. Tüm aksesuarlar yeni.",
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=1200&q=80",
    ],
  },
];

async function main() {
  const url = process.env.TURSO_DATABASE_URL ?? "file:./local.db";
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const client = createClient({ url, authToken });
  const db = drizzle(client);

  console.log("Temizleniyor...");
  await db.delete(phoneImages);
  await db.delete(phones);

  console.log(`${SAMPLE.length} telefon ekleniyor...`);
  for (const item of SAMPLE) {
    const slug = buildPhoneSlug({
      brand: item.brand,
      model: item.model,
      storage: item.storage,
      color: item.color,
    });
    const inserted = await db
      .insert(phones)
      .values({
        slug,
        brand: item.brand,
        model: item.model,
        storage: item.storage,
        color: item.color,
        condition: item.condition,
        priceTry: item.priceTry,
        description: item.description,
        inStock: item.inStock,
        featured: item.featured,
      })
      .returning({ id: phones.id });
    const phoneId = inserted[0].id;
    if (item.images.length) {
      await db.insert(phoneImages).values(
        item.images.map((url, i) => ({
          phoneId,
          url,
          position: i,
        })),
      );
    }
  }

  console.log("Tamamlandı.");
  client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
