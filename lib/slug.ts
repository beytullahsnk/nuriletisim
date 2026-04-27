const TR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

export function slugify(input: string): string {
  return input
    .split("")
    .map((ch) => TR_MAP[ch] ?? ch)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildPhoneSlug(parts: {
  brand: string;
  model: string;
  storage?: string | null;
  color?: string | null;
}): string {
  const pieces = [parts.brand, parts.model, parts.storage, parts.color]
    .filter((p): p is string => Boolean(p && p.trim()))
    .map(slugify)
    .filter(Boolean);
  return pieces.join("-");
}
