import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneForm } from "@/components/admin/PhoneForm";
import { getPhoneById } from "@/lib/db/queries";

export const metadata = { title: "Telefonu düzenle" };

export default async function EditPhonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();
  const phone = await getPhoneById(id);
  if (!phone) notFound();

  return (
    <div>
      <Link href="/admin" className="text-sm text-muted hover:text-foreground">
        ← Telefonlar
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {phone.brand} {phone.model}
      </h1>
      <p className="mt-1 text-sm text-muted mb-8">/{phone.slug}</p>
      <PhoneForm
        mode="edit"
        phoneId={phone.id}
        initial={{
          brand: phone.brand,
          model: phone.model,
          storage: phone.storage ?? "",
          color: phone.color ?? "",
          condition: phone.condition,
          priceTry: phone.priceTry,
          description: phone.description ?? "",
          inStock: phone.inStock,
          featured: phone.featured,
          slug: phone.slug,
          imageUrls: phone.images.map((i) => i.url),
        }}
      />
    </div>
  );
}
