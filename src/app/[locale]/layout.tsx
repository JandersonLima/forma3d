import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { getContent } from "@/content";
import { isLocale, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { theme } from "@/lib/theme";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

/** Título e descrição de cada página ficam no page.tsx; aqui só o que é comum a todas. */
export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { seo } = getContent(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { template: seo.titleTemplate, default: seo.defaultTitle },
    description: seo.defaultDescription,
    applicationName: seo.siteName,
    openGraph: { type: "website", locale: seo.ogLocale, siteName: seo.siteName },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: theme.void };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const { navigation, seo } = getContent(locale);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seo.siteName,
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
  };

  return (
    <html lang={locale} className={fontVariables} data-scroll-behavior="smooth">
      <body>
        {/* Sem messages (o null impede o next-intl 4 de herdá-las do request config):
            os client components só precisam do locale para o Link. */}
        <NextIntlClientProvider locale={locale} messages={null}>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-[var(--radius-input)] focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
          >
            {navigation.skipLinkLabel}
          </a>
          <AnnouncementBar announcement={navigation.announcement} externalHint={navigation.externalLinkHint} />
          <Header />
          {children}
          <Footer />
          <JsonLd data={organizationJsonLd} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
