"use client";

import clsx from "clsx";

type Props = {
  on: boolean;
  loading?: boolean;
  size?: "sm" | "md";
  label?: string;
  onChange: (v: boolean) => void;
};

export function Toggle({
  on,
  loading,
  size = "sm",
  label,
  onChange,
}: Props) {
  const isMd = size === "md";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={loading}
      onClick={() => onChange(!on)}
      className={clsx(
        "relative inline-flex items-center rounded-full transition-colors disabled:opacity-50",
        isMd ? "h-7 w-12" : "h-6 w-10",
        on ? "bg-foreground" : "bg-border",
      )}
    >
      <span
        className={clsx(
          "inline-block transform rounded-full bg-white shadow transition-transform",
          isMd ? "h-6 w-6" : "h-5 w-5",
          on
            ? isMd
              ? "translate-x-[22px]"
              : "translate-x-[18px]"
            : "translate-x-0.5",
        )}
      />
    </button>
  );
}
