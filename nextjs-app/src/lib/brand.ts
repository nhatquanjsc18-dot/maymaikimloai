import fs from "fs";
import path from "path";
import { site } from "./site";

/**
 * Trả về đường dẫn logo nếu file thật sự có trong public/.
 * Chưa thả file vào thì header tự dùng logo SVG mặc định — build không bao giờ gãy.
 * Chỉ dùng ở server component.
 */
export function logoSrc(): string | null {
  const rel = site.logo;
  if (!rel) return null;
  const file = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
  try {
    return fs.statSync(file).isFile() ? rel : null;
  } catch {
    return null;
  }
}

export const logoAlt = site.logoAlt ?? "Máy Mài Kim Loại";
