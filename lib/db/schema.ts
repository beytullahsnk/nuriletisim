import { sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const phones = sqliteTable(
  "phones",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    storage: text("storage"),
    color: text("color"),
    condition: text("condition", { enum: ["sifir", "ikinci_el"] }).notNull(),
    priceTry: integer("price_try").notNull(),
    description: text("description"),
    inStock: integer("in_stock", { mode: "boolean" }).notNull().default(true),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
  },
  (t) => [
    index("idx_phones_brand").on(t.brand),
    index("idx_phones_featured").on(t.featured),
  ],
);

export const phoneImages = sqliteTable("phone_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  phoneId: integer("phone_id")
    .notNull()
    .references(() => phones.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  position: integer("position").notNull().default(0),
});

export type Phone = typeof phones.$inferSelect;
export type NewPhone = typeof phones.$inferInsert;
export type PhoneImage = typeof phoneImages.$inferSelect;
export type NewPhoneImage = typeof phoneImages.$inferInsert;

export type PhoneWithImages = Phone & { images: PhoneImage[] };
