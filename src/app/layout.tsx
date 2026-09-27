import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { navigation } from "@/content/navigation";
import { seo } from "@/content/seo";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { theme } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

/** Título e descrição de cada página ficam no page.tsx; aqui só o que é comum a todas. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { template: seo.titleTemplate, default: seo.defaultTitle },
  description: seo.defaultDescription,
  applicationName: seo.siteName,
  openGraph: { type: "website", locale: seo.ogLocale, siteName: seo.siteName },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: theme.void };

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seo.siteName,
  url: siteUrl,
  logo: absoluteUrl("/icon.svg"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${display.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-[var(--radius-input)] focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          {navigation.skipLinkLabel}
        </a>
        <AnnouncementBar announcement={navigation.announcement} />
        <Header />
        {children}
        <Footer />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
