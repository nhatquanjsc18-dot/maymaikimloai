# maymaikimloai.com

Website chuyên đề **máy mài kim loại** — catalog dụng cụ khí nén công nghiệp Dynabrade (Made in USA)
do [Công ty CP Công nghiệp Nhất Quán](https://nhatquan.vn) phân phối tại Việt Nam.

Next.js 16 + React 19, xuất **HTML tĩnh hoàn toàn** (`output: "export"`) nên chạy được trên hosting
thường của Hostinger, không cần Node trên máy chủ.

---

## Nội dung site

| Trang | Đường dẫn | Số lượng |
|---|---|---|
| Trang chủ | `/` | 1 |
| Cẩm nang chọn máy (pillar SEO) | `/may-mai-kim-loai/` | 1 |
| Catalog tổng | `/san-pham/` | 1 |
| Chi tiết sản phẩm | `/san-pham/<slug>/` | 860 |
| Danh mục nhóm máy | `/danh-muc/<slug>/` | 12 |
| Giới thiệu · Liên hệ | `/gioi-thieu/` · `/lien-he/` | 2 |

Tổng **880 trang HTML tĩnh**, kèm `sitemap.xml` (877 URL) và `robots.txt` sinh tự động.

### SEO đã có sẵn
- Từ khoá chính: *máy mài kim loại*; cluster theo 12 nhóm máy (máy mài góc, mài bút, mài băng nhám…)
- `metadata` + canonical + Open Graph cho từng trang
- JSON-LD: `Organization`, `WebSite`, `Product` (860 trang), `BreadcrumbList`, `ItemList`, `FAQPage`
- Ảnh có `alt` mô tả, `loading="lazy"` cho ảnh dưới màn hình đầu

---

## Chạy tại máy

```bash
cd nextjs-app
npm install
npm run dev
```

Mở http://localhost:3000

Xem lại các bản mockup giao diện đã duyệt (v1 vàng-đen, v2 thước đo, v3 HomeRise — bản đang dùng):

```bash
node preview-server.js
```

Mở http://localhost:4321

---

## Cấu hình — sửa ở một chỗ duy nhất

Mọi thông tin liên hệ, access key form và logo nằm trong [`nextjs-app/data/site.json`](nextjs-app/data/site.json):

```json
{
  "web3formsAccessKey": "…",
  "formSubject": "…",
  "logo": "/logo.png",
  "company": {
    "name": "…", "address": "…",
    "phones": ["…"], "emails": ["…"],
    "hours": "…", "mapEmbed": "…"
  }
}
```

Sửa file này rồi build lại là toàn bộ header, footer, trang liên hệ và form cập nhật theo.

### Logo
Thả file ảnh vào `nextjs-app/public/logo.png`. Nếu chưa có file, site tự dùng logo SVG mặc định
(bánh răng cam) — build không bao giờ gãy vì thiếu logo.

### Form liên hệ
Gửi qua [Web3Forms](https://web3forms.com). Form có `action` + `method` thật nên **không có
JavaScript vẫn gửi được**; có JS thì gửi bằng `fetch` để không rời trang. Đã kèm honeypot `botcheck`
chặn bot.

### Đổi tên miền
Sửa `SITE_URL` trong [`nextjs-app/src/lib/site.ts`](nextjs-app/src/lib/site.ts) — dùng cho canonical,
sitemap và JSON-LD.

---

## Build và deploy lên Hostinger

```bash
cd nextjs-app
npm run build
```

Kết quả nằm trong `nextjs-app/out/` (~185 MB, phần lớn là 866 ảnh sản phẩm).
`out/` đã kèm sẵn `.htaccess` cấu hình nén, cache, ép HTTPS, bỏ `www` và trang lỗi 404.

### Site chạy trên tên miền phụ `maymaikimloai.nhatquan.vn`

`nhatquan.vn` là site WordPress riêng — site này **không** đè lên nó, mà nằm ở thư mục gốc riêng
của tên miền phụ.

**Bước 1 — tạo tên miền phụ (chỉ làm một lần):**

hPanel → **Domains → Subdomains** → tạo `maymaikimloai` dưới `nhatquan.vn`.
Ghi lại **document root** hPanel hiển thị — thường là một trong hai:

- `domains/maymaikimloai.nhatquan.vn/public_html` ← nên chọn kiểu này
- `public_html/maymaikimloai`

Nếu hPanel cho chọn, hãy đặt document root **ngoài** `public_html` của nhatquan.vn. Để bên trong
vẫn chạy được, nhưng lỡ sau này sửa `.htaccess` của WordPress thì dễ ảnh hưởng lẫn nhau.

Sau đó vào **SSL** bật chứng chỉ miễn phí cho tên miền phụ (`.htaccess` ép HTTPS, không có SSL
site sẽ lặp chuyển hướng).

**Bước 2 — upload:**

1. Nén thư mục `out/` thành `out.zip`
2. hPanel → **File Manager** → vào **document root của tên miền phụ** (không phải `public_html` gốc)
3. Upload `out.zip`, bấm **Extract** ngay trên máy chủ
4. Chuyển toàn bộ file từ thư mục vừa giải nén ra thẳng document root
5. Bật *Show hidden files* để kiểm tra `.htaccess` đã có mặt

Đừng upload từng file qua FTP — 6.000 file sẽ rất lâu.

**Mỗi lần cập nhật nội dung:** chạy lại `npm run build`, nén `out/` và lặp lại bước 2.

**Sau khi lên sóng:** khai báo `https://maymaikimloai.nhatquan.vn/sitemap.xml` trong Google Search
Console như một property riêng — tên miền phụ được Google xem gần như một site độc lập với
`nhatquan.vn`.

---

## Cấu trúc thư mục

```
maymaikimloai/
├─ nextjs-app/
│  ├─ data/
│  │  ├─ site.json          ← cấu hình liên hệ + access key
│  │  ├─ catalog.json       ← 860 sản phẩm, 12 nhóm, tên tiếng Việt
│  │  └─ specs-data.jsonl   ← 820 bảng thông số kỹ thuật
│  ├─ public/
│  │  ├─ .htaccess          ← cấu hình Apache cho Hostinger
│  │  └─ wp-content/uploads/dynabrade-images/   ← 866 ảnh sản phẩm
│  └─ src/
│     ├─ app/               ← các trang (App Router)
│     ├─ components/        ← Header, Footer, form, bộ lọc catalog…
│     └─ lib/               ← đọc dữ liệu, cấu hình site
├─ design-mockups/          ← 3 bản duyệt giao diện (không lên production)
└─ preview-server.js        ← máy chủ xem mockup
```

---

## Giao diện

Dựng theo mẫu [HomeRise](https://home-rise-construction-industry-vue.vercel.app), lấy đúng design token:

| | |
|---|---|
| Màu chính | `#FF5E14` cam |
| Nền tối | `#0E121D` · `#2A2D37` |
| Chữ tiêu đề | Exo 600/700 |
| Chữ nội dung | Public Sans |
| Bo góc | `8px` cho thẻ, nút vuông góc |

Cả hai font đều có bộ ký tự tiếng Việt đầy đủ.

**Thước vòng quay** là điểm riêng của site: thang loga 450 → 100.000 vòng/phút, mỗi model là một vạch
(vạch càng cao thì công suất càng lớn), kéo hai đầu để lọc catalog theo dải tốc độ cần dùng.
