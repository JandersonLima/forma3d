import type { MetadataRoute } from "next";
import { absoluteUrl, siteIndexable, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Prévia: bloqueia tudo e não anuncia sitemap nem host.
  if (!siteIndexable) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
