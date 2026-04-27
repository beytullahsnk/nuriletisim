import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Yönetici girişi",
};

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;
  if (await isAdmin()) {
    redirect(params.from && params.from.startsWith("/admin") ? params.from : "/admin");
  }
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface-2 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-border/60 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
        <div className="text-center">
          <span className="inline-block h-8 w-8 rounded-full bg-accent-red mb-4" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Yönetici girişi
          </h1>
          <p className="mt-2 text-sm text-muted">
            Mağaza yönetim paneline erişim için şifrenizi girin.
          </p>
        </div>
        <LoginForm from={params.from} />
      </div>
    </div>
  );
}
