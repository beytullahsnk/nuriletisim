"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NAV_LINKS, SHOP } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <span className="inline-block h-6 w-6 rounded-full bg-accent-red" />
          <span>{SHOP.name}</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "text-[13px] transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={`tel:${SHOP.phoneIntl}`}
            className="text-[13px] text-foreground/80 hover:text-foreground"
          >
            {SHOP.phone}
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-white">
          <ul className="flex flex-col px-4 py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "block py-3 text-base",
                    pathname === link.href ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border/60 pt-3 mt-1">
              <a
                href={`tel:${SHOP.phoneIntl}`}
                className="block py-3 text-base text-foreground/80"
              >
                {SHOP.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
