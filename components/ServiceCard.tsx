import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  accent?: "default" | "vodafone";
};

export function ServiceCard({
  title,
  subtitle,
  description,
  icon,
  accent = "default",
}: Props) {
  return (
    <div
      className={clsx(
        "group flex flex-col rounded-3xl p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1",
        accent === "vodafone"
          ? "bg-foreground text-white"
          : "bg-surface text-foreground",
      )}
    >
      <div
        className={clsx(
          "inline-flex h-12 w-12 items-center justify-center rounded-full",
          accent === "vodafone"
            ? "bg-accent-red text-white"
            : "bg-white text-foreground",
        )}
      >
        {icon}
      </div>
      <p
        className={clsx(
          "mt-6 text-[12px] uppercase tracking-[0.08em]",
          accent === "vodafone" ? "text-white/70" : "text-muted",
        )}
      >
        {subtitle}
      </p>
      <h3 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h3>
      <p
        className={clsx(
          "mt-3 text-base leading-relaxed",
          accent === "vodafone" ? "text-white/80" : "text-muted",
        )}
      >
        {description}
      </p>
    </div>
  );
}
