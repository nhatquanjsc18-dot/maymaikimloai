import Link from "next/link";
import type { ReactNode } from "react";

/** Mũi tên gãy khúc — lấy đúng path của mẫu HomeRise. */
export function Arrow({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M12.9854 15.4502L15.499 12.9277L11.8057 9.24902L15.3594 6.35156L15.3594 2.59277L11.7988 2.59277L11.7988 9.24121L5.2334 2.69922L2.71973 5.22168L9.41211 11.8896L2.7002 11.8896L2.7002 15.4502L12.9854 15.4502Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Check({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF5E14" strokeWidth="2.4" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 4v2.6M12 17.4V20M4 12h2.6M17.4 12H20" />
    </svg>
  );
}

/** Nút hai lớp chữ trượt khi hover, đúng kiểu của mẫu. */
export function Btn({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  style,
}: {
  href: string;
  children: string;
  variant?: "primary" | "dark" | "ghost";
  arrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cls = ["btn", variant === "dark" ? "dark" : "", variant === "ghost" ? "ghost" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <Link className={cls} href={href} style={style}>
      <span className="t">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function SectionTop({
  eyebrow,
  title,
  desc,
  center = false,
  bars = false,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  center?: boolean;
  bars?: boolean;
}) {
  return (
    <div className={"sectop" + (center ? " mid" : "")}>
      <p className={"eyebrow" + (bars ? " bars" : "")}>{eyebrow}</p>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

export function Crumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumb" aria-label="Đường dẫn">
      {items.map((it, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span style={{ opacity: 1 }}>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHead({
  crumb,
  title,
  desc,
}: {
  crumb: { label: string; href?: string }[];
  title: string;
  desc?: string;
}) {
  return (
    <section className="pagehead">
      <div className="wrap">
        <Crumb items={crumb} />
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
    </section>
  );
}
