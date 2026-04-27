import { SHOP } from "@/lib/constants";

export function LocationMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-surface">
      <iframe
        src={SHOP.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Nur İletişim mağaza konumu"
        className={compact ? "h-72 w-full" : "h-[420px] w-full"}
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
}
