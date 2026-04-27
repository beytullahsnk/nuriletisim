import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SHOP, SITE_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SHOP.fullName} — ${SHOP.shortTagline}`,
    template: `%s · ${SHOP.name}`,
  },
  description: SHOP.tagline,
  openGraph: {
    title: SHOP.fullName,
    description: SHOP.tagline,
    locale: "tr_TR",
    type: "website",
    siteName: SHOP.fullName,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
