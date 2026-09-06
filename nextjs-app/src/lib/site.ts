import siteJson from "../../data/site.json";

export type Company = {
  name: string;
  shortName: string;
  address: string;
  phones: string[];
  emails: string[];
  website: string;
  hours: string;
  mapEmbed: string;
};

export type SiteConfig = {
  web3formsAccessKey: string;
  logo?: string;
  logoAlt?: string;
  formSubject: string;
  company: Company;
};

export const site = siteJson as SiteConfig;
export const company = site.company;

/** Đổi khi mua domain thật — dùng cho canonical, sitemap, JSON-LD. */
export const SITE_URL = "https://maymaikimloai.com";
export const SITE_NAME = "Máy Mài Kim Loại";
export const SITE_TAGLINE = "Dụng cụ khí nén công nghiệp";

export function telHref(phone: string) {
  return "tel:" + phone.replace(/\s/g, "");
}

export function absUrl(path: string) {
  return SITE_URL + (path.startsWith("/") ? path : "/" + path);
}
