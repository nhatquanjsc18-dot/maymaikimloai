import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrowseData, getCategories, getCategoryBySlug, getProductsByCategory, vn } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { PageHead } from "@/components/ui";
import CatalogExplorer from "@/components/CatalogExplorer";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return getCategories().map((c) => ({ cat: c.slug }));
}

type Props = { params: Promise<{ cat: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  const c = getCategoryBySlug(cat);
  if (!c) return { title: "Không tìm thấy danh mục" };

  const range = c.rpmMin ? ` ${vn(c.rpmMin)}–${vn(c.rpmMax!)} vòng/phút.` : "";
  return {
    title: `${c.h1} — ${c.count} model Dynabrade chính hãng`,
    description: `${c.h1}: ${c.count} model Dynabrade Made in USA.${range} ${c.intro.slice(0, 90)}… Xem thông số, nhận báo giá trong 2 giờ.`,
    alternates: { canonical: `/danh-muc/${c.slug}/` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  const c = getCategoryBySlug(cat);
  if (!c) notFound();

  const items = getProductsByCategory(c.key);
  const browse = getBrowseData().filter((b) => b.c === c.key);

  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Sản phẩm", item: SITE_URL + "/san-pham/" },
      { "@type": "ListItem", position: 3, name: c.h1, item: `${SITE_URL}/danh-muc/${c.slug}/` },
    ],
  };

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.h1,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 30).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/san-pham/${p.slug}/`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([crumbLd, listLd]) }} />

      <PageHead
        crumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham/" },
          { label: c.label },
        ]}
        title={c.h1}
        desc={c.intro}
      />

      <section className="sec cata">
        <div className="wrap">
          {browse.length > 0 ? (
            <CatalogExplorer items={browse} lockedCat={c.key} />
          ) : (
            <div className="pgrid">
              {items.map((p) => (
                <a className="pcard" key={p.slug} href={`/san-pham/${p.slug}/`}>
                  <span className="ph">
                    <span className="rf">Ref {p.ref}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src={p.img} alt={p.name} />
                  </span>
                  <span className="bd">
                    <span className="ct">{p.subcat || p.catLabel}</span>
                    <h4>{p.name}</h4>
                    <span className="ft"><span className="pr">${vn(p.price)}</span></span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sec" style={{ background: "var(--bg1)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,60px)", alignItems: "start" }}>
          <div className="prose">
            <p className="eyebrow">Về nhóm máy này</p>
            <h2 style={{ fontSize: "clamp(24px,2.8vw,34px)", margin: "8px 0 14px" }}>{c.h1}</h2>
            <p>{c.intro}</p>
            {c.rpmMin && (
              <p>
                Trong nhóm này catalog có <strong>{c.count} model</strong>, dải vòng quay từ{" "}
                <strong>{vn(c.rpmMin)}</strong> đến <strong>{vn(c.rpmMax!)}</strong> vòng/phút. Chọn sai
                dải tốc độ so với đường kính đá là nguyên nhân vỡ đá và cháy bề mặt phổ biến nhất — dùng
                thước vòng quay phía trên để lọc đúng dải bạn cần.
              </p>
            )}
            <p>
              Tất cả đều là hàng Dynabrade chính hãng, Made in USA, bảo hành 12 tháng, có hoá đơn VAT và
              chứng từ nhập khẩu đầy đủ.
            </p>
          </div>
          <ContactForm presetProduct={c.label} />
        </div>
      </section>
    </>
  );
}
