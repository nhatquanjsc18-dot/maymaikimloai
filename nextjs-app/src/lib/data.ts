import fs from "fs";
import path from "path";
import catalogRaw from "../../data/catalog.json";

/* ------------------------------------------------------------------ *
 *  Kiểu dữ liệu
 * ------------------------------------------------------------------ */

export type Product = {
  ref: string;
  name: string;
  subcat: string;
  price: number;
  img: string;
  slug: string;
  cat: string;
  catLabel: string;
  catSlug: string;
  rpm: number | null;
  hp: number | null;
  weight: string;
};

export type Category = {
  key: string;
  slug: string;
  label: string;
  h1: string;
  intro: string;
  count: number;
  rpmMin: number | null;
  rpmMax: number | null;
  cover: string;
};

type RawCatalog = Record<
  string,
  {
    label: string;
    items: { ref: string; name_vn: string; subcat?: string; price: number; img: string; url: string }[];
  }
>;

/* ------------------------------------------------------------------ *
 *  Slug + phần mô tả SEO cho từng nhóm máy
 * ------------------------------------------------------------------ */

const CAT_META: Record<string, { slug: string; h1: string; intro: string }> = {
  "die-grinders": {
    slug: "may-mai-goc-khi-nen",
    h1: "Máy mài góc khí nén",
    intro:
      "Máy mài góc khí nén dùng đá mài hoặc mũi mài để phá ba via đường hàn, làm sạch kết cấu thép và sửa nguội chi tiết. Dòng này có bốn kiểu thân: góc vuông, góc nghiêng 7 độ, máy mài thẳng và loại cần nối dài để với vào vị trí sâu.",
  },
  drills: {
    slug: "may-khoan-khi-nen",
    h1: "Máy khoan khí nén",
    intro:
      "Máy khoan khí nén cho dây chuyền lắp ráp và xưởng cơ khí: mô-men ổn định, không sinh nhiệt ở tay cầm, chạy liên tục nhiều ca mà không quá tải như máy khoan điện.",
  },
  grinders: {
    slug: "may-mai-dia-va-cat",
    h1: "Máy mài đĩa và máy cắt kim loại",
    intro:
      "Máy mài đá lõm tâm và máy cắt đá Type 41 cho mối hàn lớn, kết cấu thép nặng và cắt phôi. Đường kính đá từ 100 đến 230 mm, công suất tới 3 hp.",
  },
  percussive: {
    slug: "dung-cu-xu-ly-be-mat",
    h1: "Dụng cụ xử lý bề mặt",
    intro:
      "Dụng cụ gõ rung dùng để đánh sạch xỉ hàn, gỉ sét và lớp phủ cũ trên bề mặt kim loại trước khi sơn hoặc hàn tiếp.",
  },
  reciprocating: {
    slug: "may-giua-va-cua-rung",
    h1: "Máy giũa và cưa rung khí nén",
    intro:
      "Máy giũa rung và cưa rung xử lý khuôn mẫu, rãnh hẹp và những vị trí cần lấy đi lượng vật liệu nhỏ mà đá mài không vào được.",
  },
  routers: {
    slug: "may-phay-khi-nen",
    h1: "Máy phay khí nén",
    intro:
      "Máy phay khí nén tốc độ 20.000–30.000 vòng/phút, dùng cắt biên, mở lỗ và gia công rãnh trên tấm kim loại mỏng và composite.",
  },
  fastener: {
    slug: "dung-cu-siet-vit",
    h1: "Dụng cụ siết vít khí nén",
    intro: "Dụng cụ siết vít khí nén cho lắp ráp công nghiệp, mô-men ổn định và trọng lượng nhẹ.",
  },
  robotic: {
    slug: "dung-cu-cho-robot",
    h1: "Dụng cụ mài cho robot",
    intro:
      "Đầu mài, đầu chà nhám và bộ hoàn thiện Dynastraight gắn lên cánh tay robot cho dây chuyền tự động hoá khâu mài và đánh bóng.",
  },
  sanders: {
    slug: "may-cha-nham-lech-tam",
    h1: "Máy chà nhám lệch tâm",
    intro:
      "Máy chà nhám lệch tâm (random orbital) cho bề mặt phẳng rộng, vết nhám mịn đều và không để lại xoáy. Có bản hút bụi trung tâm và bản không hút bụi.",
  },
  "belt-sanders": {
    slug: "may-mai-bang-nham",
    h1: "Máy mài băng nhám",
    intro:
      "Máy mài băng nhám Dynafile xử lý mối hàn inox, góc trong, ống và khe hẹp — những vị trí đá mài tròn không tiếp cận được.",
  },
  "sanders-concentric": {
    slug: "may-cha-nham-dong-tam",
    h1: "Máy chà nhám đồng tâm và đánh bóng",
    intro:
      "Máy chà nhám đồng tâm dạng rotary và in-line, dùng cho đánh bóng inox, làm bóng mối hàn và hoàn thiện bề mặt trang trí.",
  },
  "pencil-grinders": {
    slug: "may-mai-but-khi-nen",
    h1: "Máy mài bút khí nén",
    intro:
      "Máy mài bút chạy 25.000–100.000 vòng/phút với mũi mài hợp kim 3–6 mm, dùng sửa khuôn mẫu, mở rãnh hẹp và đánh sạch chi tiết nhỏ.",
  },
};

/* ------------------------------------------------------------------ *
 *  Thông số kỹ thuật
 * ------------------------------------------------------------------ */

type SpecsMap = Record<string, Record<string, string>>;
let _specs: SpecsMap | null = null;

export function getAllSpecs(): SpecsMap {
  if (_specs) return _specs;
  const map: SpecsMap = {};
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "data", "specs-data.jsonl"), "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t) continue;
      const row = JSON.parse(t) as { ref: string; specs: Record<string, string> };
      if (row?.ref) map[row.ref] = row.specs;
    }
  } catch {
    /* không có file thông số thì bỏ qua */
  }
  _specs = map;
  return map;
}

export function getSpecs(ref: string): Record<string, string> {
  return getAllSpecs()[ref] ?? {};
}

const SPEC_VN: Record<string, string> = {
  Series: "Dòng sản phẩm",
  hp: "Công suất",
  Watts: "Công suất (W)",
  "Max. RPM": "Vòng quay tối đa",
  "Max. SFPM": "Tốc độ băng tối đa",
  "Motor Type": "Loại động cơ",
  "Tool Style": "Kiểu máy",
  "Air Inlet Thread": "Ren đầu nối khí",
  "Air Pressure [Bar]": "Áp suất khí (Bar)",
  "Air Pressure [PSIG]": "Áp suất khí (PSI)",
  "Accy. Max. Air Flow SCFM (LPM)": "Lưu lượng khí tối đa",
  "Exhaust Type": "Kiểu xả khí",
  "Hose I.D.": "Đường kính trong ống khí",
  "Height (in)": "Chiều cao (inch)",
  "Height (mm)": "Chiều cao (mm)",
  "Length (in)": "Chiều dài (inch)",
  "Length (mm)": "Chiều dài (mm)",
  "Width (in)": "Chiều rộng (inch)",
  "Width (mm)": "Chiều rộng (mm)",
  "Weight (kg)": "Khối lượng (kg)",
  "Weight (lb)": "Khối lượng (lb)",
  "Sound Power dB[A]": "Độ ồn (dB)",
  "Vacuum Type": "Loại hút bụi",
  "Pad Dia. (in)": "Đường kính đế (inch)",
  "Pad Dia. (mm)": "Đường kính đế (mm)",
  "Pad Face": "Mặt đế",
  "Pad Thread Size": "Cỡ ren đế",
  "Wheel Dia. (in)": "Đường kính đá (inch)",
  "Wheel Dia. (mm)": "Đường kính đá (mm)",
  "Chuck Size": "Cỡ đầu kẹp",
  "Collet Insert Size (in)": "Cỡ kẹp collet (inch)",
  "Collet Insert Size (mm)": "Cỡ kẹp collet (mm)",
  "Orbit Dia. (mm)": "Biên độ rung (mm)",
  "Orbit Dia. (fraction)": "Biên độ rung",
  "Stroke Length (in)": "Hành trình (inch)",
  "Stroke Length (mm)": "Hành trình (mm)",
  "Thread Size": "Cỡ ren",
  "ESD Protection": "Chống tĩnh điện (ESD)",
};

export function specLabel(k: string) {
  return SPEC_VN[k] ?? k;
}

/* ------------------------------------------------------------------ *
 *  Sản phẩm
 * ------------------------------------------------------------------ */

const catalog = catalogRaw as unknown as RawCatalog;

function slugFromUrl(url: string) {
  return url.replace(/^https?:\/\/[^/]+\//, "").split("/").filter(Boolean)[0] ?? "";
}

function num(v: string | undefined): number | null {
  if (!v) return null;
  const m = String(v).replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : null;
}

let _products: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (_products) return _products;
  const specs = getAllSpecs();
  const seen = new Set<string>();
  const out: Product[] = [];

  for (const [key, cat] of Object.entries(catalog)) {
    const meta = CAT_META[key];
    for (const item of cat.items) {
      let slug = slugFromUrl(item.url);
      if (!slug) slug = "san-pham-" + item.ref;
      // catalog gốc có vài mã trùng slug — thêm hậu tố ref cho khỏi đè nhau
      if (seen.has(slug)) slug = `${slug}-${item.ref.toLowerCase()}`;
      if (seen.has(slug)) continue;
      seen.add(slug);

      const s = specs[item.ref] ?? {};
      out.push({
        ref: item.ref,
        name: item.name_vn,
        subcat: item.subcat ?? "",
        price: item.price,
        img: item.img,
        slug,
        cat: key,
        catLabel: cat.label,
        catSlug: meta?.slug ?? key,
        rpm: num(s["Max. RPM"]),
        hp: num(s["hp"]),
        weight: s["Weight (kg)"] ?? "",
      });
    }
  }
  _products = out;
  return out;
}

let _cats: Category[] | null = null;

export function getCategories(): Category[] {
  if (_cats) return _cats;
  const products = getAllProducts();
  _cats = Object.entries(catalog).map(([key, cat]) => {
    const items = products.filter((p) => p.cat === key);
    const rpms = items.map((p) => p.rpm).filter((r): r is number => !!r && r >= 200);
    const meta = CAT_META[key];
    return {
      key,
      slug: meta?.slug ?? key,
      label: cat.label,
      h1: meta?.h1 ?? cat.label,
      intro: meta?.intro ?? "",
      count: items.length,
      rpmMin: rpms.length ? Math.min(...rpms) : null,
      rpmMax: rpms.length ? Math.max(...rpms) : null,
      cover: items[0]?.img ?? "",
    };
  });
  return _cats;
}

export function getCategoryBySlug(slug: string) {
  return getCategories().find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string) {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(key: string) {
  return getAllProducts().filter((p) => p.cat === key);
}

export function getRelated(p: Product, limit = 4) {
  return getAllProducts()
    .filter((x) => x.cat === p.cat && x.ref !== p.ref)
    .slice(0, limit);
}

/** Dữ liệu gọn cho bộ lọc chạy phía trình duyệt (chỉ model có vòng quay). */
export type BrowseItem = {
  r: string; n: string; s: string; c: string; cl: string;
  p: number; img: string; slug: string; rpm: number; hp: number | null; w: string;
};

export function getBrowseData(): BrowseItem[] {
  return getAllProducts()
    .filter((p) => p.rpm !== null && p.rpm >= 200)
    .map((p) => ({
      r: p.ref, n: p.name, s: p.subcat, c: p.cat, cl: p.catLabel,
      p: p.price, img: p.img, slug: p.slug, rpm: p.rpm as number, hp: p.hp, w: p.weight,
    }))
    .sort((a, b) => a.rpm - b.rpm);
}

export const vn = (n: number) => Math.round(n).toLocaleString("vi-VN");
