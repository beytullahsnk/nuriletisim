const BRANDS = ["Apple", "Samsung", "Xiaomi", "Huawei", "Honor", "Oppo"];

export function BrandLogos() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <p className="text-center text-[12px] uppercase tracking-[0.12em] text-muted">
        Sattığımız Markalar
      </p>
      <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-px overflow-hidden rounded-3xl bg-border">
        {BRANDS.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-center bg-white py-10 text-lg font-semibold tracking-tight text-foreground"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
