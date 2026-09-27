import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/** Só páginas públicas — a sandbox fica de fora de propósito. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
