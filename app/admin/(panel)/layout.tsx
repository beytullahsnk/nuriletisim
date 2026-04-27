import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LogoutButton } from "../LogoutButton";

export const metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) {
    redirect("/admin/giris");
  }

  return (
    <div className="min-h-screen bg-surface-2">
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-semibold min-w-0"
          >
            <span className="inline-block h-5 w-5 shrink-0 rounded-full bg-accent-red" />
            <span className="truncate">
              <span className="md:hidden">Yönetim</span>
              <span className="hidden md:inline">Nur İletişim · Yönetim</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              aria-label="Siteyi görüntüle"
              className="inline-flex h-9 items-center justify-center rounded-full text-sm text-muted hover:text-foreground md:px-3"
            >
              <span className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7" />
                  <path d="M10 14L21 3" />
                  <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
                </svg>
              </span>
              <span className="hidden md:inline">Siteyi görüntüle ↗</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {children}
      </div>
    </div>
  );
}
