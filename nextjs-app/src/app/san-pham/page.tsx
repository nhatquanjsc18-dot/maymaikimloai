import type { Metadata } from "next";
import Link from "next/link";
import { getBrowseData, getCategories, vn } from "@/lib/data";
import { PageHead, Arrow } from "@/components/ui";
import CatalogExplorer from "@/components/CatalogExplorer";

export const metadata: Metadata = {
  title: "Catalog máy mài kim loại — 860 model Dynabrade",
  description:
    "Toàn bộ catalog máy mài kim loại khí nén Dynabrade: máy mài góc, mài thẳng, mài bút, cắt đá, mài băng nhám, chà nhám. Lọc theo dải vòng quay và nhóm máy.",
  alternates: { canonical: "/san-pham/" },
};

export default function CatalogPage() {
  const browse = getBrowseData();
  const cats = getCategories().slice().sort((a, b) => b.count - a.count);

  return (
    <>
      <PageHead
        crumb={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm" }]}
        title="Catalog máy mài kim loại"
        desc={`${browse.length} model có thông số vòng quay trong ${cats.length} nhóm máy. Kéo thước để lọc theo dải tốc độ, hoặc chọn nhóm máy bên dưới.`}
      />

      <section className="sec cata">
        <div className="wrap">
          <CatalogExplorer items={browse} />
        </div>
      </section>

      <section className="sec" style={{ background: "var(--bg1)" }}>
        <div className="wrap">
          <div className="sectop mid">
            <p className="eyebrow bars">Theo nhóm máy</p>
            <h2>Chọn theo nhóm sản phẩm</h2>
          </div>
          <div className="catgrid">
            {cats.map((c) => (
              <Link className="catcard" key={c.slug} href={`/danh-muc/${c.slug}/`}>
                <div className="im">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.cover} alt={c.label} />
                </div>
                <div className="bd">
                  <span className="meta">
                    {c.count} model{c.rpmMin ? ` · ${vn(c.rpmMin)}–${vn(c.rpmMax!)} vòng/phút` : ""}
                  </span>
                  <h3>{c.label}</h3>
                  <p>{c.intro.slice(0, 110)}…</p>
                  <span className="go">Xem nhóm <Arrow size={15} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
