import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/may-mai-kim-loai/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/san-pham/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/gioi-thieu/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/lien-he/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const cats: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${SITE_URL}/danh-muc/${c.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${SITE_URL}/san-pham/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...statics, ...cats, ...products];
}
