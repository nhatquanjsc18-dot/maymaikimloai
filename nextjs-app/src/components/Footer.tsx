import Link from "next/link";
import { company, telHref, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { getCategories } from "@/lib/data";
import { Logo } from "./ui";
import { logoSrc, logoAlt } from "@/lib/brand";

export function Footer() {
  const logo = logoSrc();
  const cats = getCategories()
    .slice()
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="cols">
          <div>
            <Link className="brand" href="/" style={{ marginBottom: 18 }}>
              {logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img className="logoimg" src={logo} alt={logoAlt} />
              ) : (
                <span className="ic"><Logo /></span>
              )}
              <span className="tx">
                <b style={{ color: "#fff" }}>{SITE_NAME}</b>
                <span>{SITE_TAGLINE}</span>
              </span>
            </Link>
            <p style={{ margin: 0 }}>
              Máy mài kim loại khí nén công nghiệp Dynabrade — Made in USA. Tư vấn kỹ thuật, demo tại xưởng,
              bảo hành chính hãng 12 tháng.
            </p>
            <a className="tel" href={telHref(company.phones[0])}>{company.phones[0]}</a>
            <p style={{ margin: "10px 0 0", fontSize: 14 }}>{company.address}</p>
          </div>

          <div>
            <h5>Nhóm máy</h5>
            {cats.map((c) => (
              <Link key={c.slug} href={`/danh-muc/${c.slug}/`}>{c.label}</Link>
            ))}
          </div>

          <div>
            <h5>Theo công việc</h5>
            <Link href="/may-mai-kim-loai/">Máy mài kim loại là gì</Link>
            <Link href="/may-mai-kim-loai/#phan-loai">Phân loại máy mài</Link>
            <Link href="/may-mai-kim-loai/#toc-do">Chọn vòng quay</Link>
            <Link href="/may-mai-kim-loai/#khi-nen">Tính khí nén cần thiết</Link>
            <Link href="/san-pham/">Toàn bộ catalog</Link>
          </div>

          <div>
            <h5>Liên hệ</h5>
            {company.phones.map((p) => (
              <a key={p} href={telHref(p)}>{p}</a>
            ))}
            {company.emails.map((e) => (
              <a key={e} href={`mailto:${e}`}>{e}</a>
            ))}
            <a href={company.website} target="_blank" rel="noopener noreferrer">nhatquan.vn</a>
          </div>
        </div>

        <div className="legal">
          <span>© {new Date().getFullYear()} maymaikimloai.com — {company.name}</span>
          <span>Dynabrade là thương hiệu của Dynabrade Inc. (USA).</span>
        </div>
      </div>
    </footer>
  );
}
