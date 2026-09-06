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

/** Đổi tên miền ở đúng một dòng này — canonical, sitemap, JSON-LD tự theo. */
export const SITE_URL = "https://maymaikimloai.nhatquan.vn";
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
export const SITE_NAME = "Máy Mài Kim Loại";
export const SITE_TAGLINE = "Dụng cụ khí nén công nghiệp";

export function telHref(phone: string) {
  return "tel:" + phone.replace(/\s/g, "");
}

export function absUrl(path: string) {
  return SITE_URL + (path.startsWith("/") ? path : "/" + path);
}
