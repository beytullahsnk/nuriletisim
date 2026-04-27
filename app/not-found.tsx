import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <p className="text-[12px] uppercase tracking-[0.12em] text-muted">
          404
        </p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight">
          Sayfa bulunamadı
        </h1>
        <p className="mt-4 text-lg text-muted">
          Aradığınız sayfa kaldırılmış veya taşınmış olabilir.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-[15px] text-white"
        >
          Anasayfaya dön
        </Link>
      </div>
    </div>
  );
}
