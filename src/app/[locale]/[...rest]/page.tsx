import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/content/types";

interface Props {
  params: Promise<{ locale: Locale }>;
}

/** Qualquer rota inexistente cai aqui e renderiza o not-found do idioma. */
export default async function CatchAllPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
