import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { home } from "@/content/home";
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: home.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${display.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}
