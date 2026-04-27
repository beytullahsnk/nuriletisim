"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { BRANDS, CONDITIONS } from "@/lib/constants";

const formSchema = z.object({
  brand: z.string().min(1, "Marka seçin"),
  model: z.string().min(1, "Model gerekli"),
  storage: z.string().optional(),
  color: z.string().optional(),
  condition: z.enum(["sifir", "ikinci_el"]),
  priceTry: z.coerce.number().int().nonnegative("Fiyat 0 veya üstü olmalı"),
  description: z.string().optional(),
  inStock: z.boolean(),
  featured: z.boolean(),
  slug: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  mode: "create" | "edit";
  phoneId?: number;
  initial?: Partial<FormValues> & { imageUrls?: string[] };
};

export function PhoneForm({ mode, phoneId, initial }: Props) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(initial?.imageUrls ?? []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: initial?.brand ?? "Apple",
      model: initial?.model ?? "",
      storage: initial?.storage ?? "",
      color: initial?.color ?? "",
      condition: (initial?.condition as "sifir" | "ikinci_el") ?? "sifir",
      priceTry: initial?.priceTry ?? 0,
      description: initial?.description ?? "",
      inStock: initial?.inStock ?? true,
      featured: initial?.featured ?? false,
      slug: initial?.slug ?? "",
    },
  });

  async function onUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      for (const f of Array.from(files)) fd.append("file", f);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Yükleme başarısız.");
        return;
      }
      const data = (await res.json()) as { files: { url: string }[] };
      setImages((prev) => [...prev, ...data.files.map((f) => f.url)]);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function moveImage(idx: number, dir: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...values,
        storage: values.storage?.trim() || null,
        color: values.color?.trim() || null,
        description: values.description?.trim() || null,
        slug: values.slug?.trim() || undefined,
        imageUrls: images,
      };
      const url = mode === "create" ? "/api/phones" : `/api/phones/${phoneId}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Kayıt başarısız.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-accent-red">
          {error}
        </div>
      )}

      <Section title="Genel">
        <Field label="Marka" error={errors.brand?.message}>
          <select
            {...register("brand")}
            className="h-11 rounded-xl border border-border bg-white px-3"
          >
            {BRANDS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Model" error={errors.model?.message}>
          <input
            {...register("model")}
            placeholder="iPhone 15 Pro"
            className="h-11 rounded-xl border border-border bg-white px-3"
          />
        </Field>
        <Field label="Depolama (opsiyonel)">
          <input
            {...register("storage")}
            placeholder="256GB"
            className="h-11 rounded-xl border border-border bg-white px-3"
          />
        </Field>
        <Field label="Renk (opsiyonel)">
          <input
            {...register("color")}
            placeholder="Siyah"
            className="h-11 rounded-xl border border-border bg-white px-3"
          />
        </Field>
        <Field label="Durum" error={errors.condition?.message}>
          <div className="flex gap-2">
            {CONDITIONS.map((c) => (
              <label
                key={c.value}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 h-11"
              >
                <input
                  type="radio"
                  value={c.value}
                  {...register("condition")}
                />
                {c.label}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Fiyat (TRY)" error={errors.priceTry?.message}>
          <input
            type="number"
            step={1}
            min={0}
            {...register("priceTry", { valueAsNumber: true })}
            className="h-11 rounded-xl border border-border bg-white px-3"
          />
        </Field>
      </Section>

      <Section title="Açıklama">
        <Field label="Açıklama (opsiyonel)" full>
          <textarea
            {...register("description")}
            rows={5}
            placeholder="Garanti durumu, kutu içeriği, batarya sağlığı vb."
            className="rounded-xl border border-border bg-white px-3 py-2 resize-y"
          />
        </Field>
        <Field label="URL (slug — boş bırakılırsa otomatik)" full>
          <input
            {...register("slug")}
            placeholder="iphone-15-pro-256gb-siyah"
            className="h-11 rounded-xl border border-border bg-white px-3"
          />
        </Field>
      </Section>

      <Section title="Görseller">
        <div className="md:col-span-2">
          <label
            htmlFor="upload-input"
            className={clsx(
              "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface px-6 py-8 cursor-pointer transition-colors",
              uploading
                ? "border-foreground/40 opacity-70"
                : "border-border hover:border-foreground/40",
            )}
          >
            <p className="text-sm font-medium">
              {uploading ? "Yükleniyor..." : "Tıklayın veya buraya sürükleyin"}
            </p>
            <p className="mt-1 text-xs text-muted">
              PNG / JPG / WEBP — her dosya en fazla 8 MB
            </p>
            <input
              id="upload-input"
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => onUpload(e.target.files)}
              disabled={uploading}
            />
          </label>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
              {images.map((url, idx) => (
                <div
                  key={url + idx}
                  className="relative aspect-square rounded-xl bg-surface overflow-hidden border border-border"
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-contain"
                    unoptimized={!url.startsWith("/")}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/90 text-xs">
                    <button
                      type="button"
                      onClick={() => moveImage(idx, -1)}
                      disabled={idx === 0}
                      className="h-7 w-7 inline-flex items-center justify-center disabled:opacity-30"
                      aria-label="Sola taşı"
                    >
                      ←
                    </button>
                    <span className="font-medium">{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => moveImage(idx, 1)}
                      disabled={idx === images.length - 1}
                      className="h-7 w-7 inline-flex items-center justify-center disabled:opacity-30"
                      aria-label="Sağa taşı"
                    >
                      →
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-accent-red shadow"
                    aria-label="Kaldır"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-muted">
            İlk görsel kapak fotoğrafı olarak kullanılır.
          </p>
        </div>
      </Section>

      <Section title="Yayın">
        <Field label="Stokta">
          <Switch register={register} name="inStock" />
        </Field>
        <Field label="Anasayfada öne çıkan">
          <Switch register={register} name="featured" />
        </Field>
      </Section>

      <div className="sticky bottom-0 -mx-4 sm:mx-0 sm:static z-20 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 bg-surface-2/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none px-4 sm:px-0 py-3 sm:py-0 border-t sm:border-0 border-border/60">
        <Link
          href="/admin"
          className="inline-flex h-12 sm:h-11 items-center justify-center rounded-full border border-border bg-white px-6 text-sm font-medium"
        >
          İptal
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 sm:h-11 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting
            ? "Kaydediliyor..."
            : mode === "create"
              ? "Telefonu ekle"
              : "Değişiklikleri kaydet"}
        </button>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white border border-border/60 p-6 md:p-8">
      <h2 className="text-sm uppercase tracking-[0.08em] text-muted">{title}</h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={clsx("flex flex-col gap-1.5", full && "md:col-span-2")}>
      <span className="text-sm text-foreground/80">{label}</span>
      {children}
      {error && <span className="text-xs text-accent-red">{error}</span>}
    </label>
  );
}

function Switch({
  register,
  name,
}: {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  name: "inStock" | "featured";
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer h-11">
      <input type="checkbox" {...register(name)} className="peer sr-only" />
      <span className="relative h-6 w-10 rounded-full bg-border peer-checked:bg-foreground transition-colors">
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-[18px]" />
      </span>
      <span className="text-sm text-muted peer-checked:text-foreground">
        Aktif
      </span>
    </label>
  );
}
