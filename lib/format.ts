export function formatTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function conditionLabel(c: "sifir" | "ikinci_el"): string {
  return c === "sifir" ? "Sıfır" : "İkinci El";
}
