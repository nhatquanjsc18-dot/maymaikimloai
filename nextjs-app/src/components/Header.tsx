import Link from "next/link";
import { company, telHref, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { Logo, Arrow } from "./ui";
import { logoSrc, logoAlt } from "@/lib/brand";

const NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu/" },
  { label: "Sản phẩm", href: "/san-pham/" },
  { label: "Cách chọn máy", href: "/may-mai-kim-loai/" },
  { label: "Liên hệ", href: "/lien-he/" },
];

export function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <span>
          Hotline kỹ thuật: <b><a href={telHref(company.phones[0])}>{company.phones[0]}</a></b> · {company.hours}
        </span>
        <span>Hàng chính hãng Dynabrade — Made in USA · Xuất hoá đơn VAT</span>
      </div>
    </div>
  );
}

export function Header() {
  const logo = logoSrc();
  return (
    <header className="hdr">
      <div className="wrap">
        <Link className="brand" href="/">
          {logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className="logoimg" src={logo} alt={logoAlt} />
          ) : (
            <span className="ic"><Logo /></span>
          )}
          <span className="tx">
            <b>{SITE_NAME}</b>
            <span>{SITE_TAGLINE}</span>
          </span>
        </Link>
        <nav className="menu" aria-label="Menu chính">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <Link className="btn" href="/lien-he/">
          <span className="t"><span>Nhận báo giá</span><span aria-hidden="true">Nhận báo giá</span></span>
          <Arrow />
        </Link>
      </div>
    </header>
  );
}
