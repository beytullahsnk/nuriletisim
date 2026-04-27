import Link from "next/link";
import { PhoneForm } from "@/components/admin/PhoneForm";

export const metadata = { title: "Yeni Telefon" };

export default function NewPhonePage() {
  return (
    <div>
      <Link
        href="/admin"
        className="text-sm text-muted hover:text-foreground"
      >
        ← Telefonlar
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Yeni telefon ekle
      </h1>
      <p className="mt-1 text-sm text-muted mb-8">
        Bilgileri doldurun ve görselleri yükleyin.
      </p>
      <PhoneForm mode="create" />
    </div>
  );
}
