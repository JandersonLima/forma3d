import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { navigation } from "@/content/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemplo.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gerador de modelos 3D com IA | Imagem e texto para 3D em segundos",
  description:
    "Transforme fotos, esboços ou descrições em modelos 3D texturizados e prontos para jogos, impressão 3D e animação. Sem instalar nada.",
  alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en" } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Forma3D",
    title: "Gerador de modelos 3D com IA",
    description: "De uma imagem a um modelo 3D pronto para uso, em segundos.",
    images: [{ url: "/images/og.webp", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
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
      </body>
    </html>
  );
}
