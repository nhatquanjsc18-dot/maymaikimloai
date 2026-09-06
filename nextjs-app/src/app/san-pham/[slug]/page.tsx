import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelated, getSpecs, specLabel, vn } from "@/lib/data";
import { SITE_NAME, SITE_URL, company } from "@/lib/site";
import { PageHead, Btn, Arrow } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Không tìm thấy sản phẩm" };

  const bits = [
    p.rpm ? `${vn(p.rpm)} vòng/phút` : null,
    p.hp ? `${String(p.hp).replace(".", ",")} hp` : null,
    p.weight || null,
  ].filter(Boolean).join(" · ");

  return {
    title: `${p.name} — Ref ${p.ref}`,
    description: `${p.name} (Dynabrade Ref ${p.ref}). ${bits}. Thông số kỹ thuật đầy đủ, hàng chính hãng Made in USA, bảo hành 12 tháng. Liên hệ nhận báo giá.`,
    alternates: { canonical: `/san-pham/${p.slug}/` },
    openGraph: {
      title: `${p.name} — Ref ${p.ref}`,
      description: bits,
      images: [{ url: p.img }],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const specs = getSpecs(p.ref);
  const related = getRelated(p, 4);
  const specRows = Object.entries(specs);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.ref,
    mpn: p.ref,
    image: [SITE_URL + p.img],
    description: `${p.name} — Dynabrade Ref ${p.ref}, dụng cụ khí nén công nghiệp Made in USA.`,
    brand: { "@type": "Brand", name: "Dynabrade" },
    category: p.catLabel,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: p.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/san-pham/${p.slug}/`,
      seller: { "@type": "Organization", name: company.name },
    },
  };

  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Sản phẩm", item: SITE_URL + "/san-pham/" },
      { "@type": "ListItem", position: 3, name: p.catLabel, item: `${SITE_URL}/danh-muc/${p.catSlug}/` },
      { "@type": "ListItem", position: 4, name: p.name, item: `${SITE_URL}/san-pham/${p.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([productLd, crumbLd]) }} />

      <PageHead
        crumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham/" },
          { label: p.catLabel, href: `/danh-muc/${p.catSlug}/` },
          { label: "Ref " + p.ref },
        ]}
        title={p.name}
      />

      <section className="sec">
        <div className="wrap pdp">
          <div className="gal">
            <span className="rf">Ref {p.ref}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.name} />
          </div>

          <div>
            <p className="sub">{p.subcat || p.catLabel}</p>
            <h1>{p.name}</h1>

            <div className="keyspecs">
              {p.rpm && <div><b>{vn(p.rpm)}</b><span>vòng/phút tối đa</span></div>}
              {p.hp && <div><b>{String(p.hp).replace(".", ",")} hp</b><span>công suất</span></div>}
              {p.weight && <div><b>{p.weight.replace(".", ",")}</b><span>khối lượng</span></div>}
              {specs["Tool Style"] && <div><b style={{ fontSize: 17 }}>{specs["Tool Style"]}</b><span>kiểu máy</span></div>}
            </div>

            <p className="price">${vn(p.price)}</p>
            <p className="pricenote">
              Giá niêm yết USD theo catalog Dynabrade, chưa gồm VAT và chi phí nhập khẩu.
              Liên hệ để nhận giá bán tại Việt Nam.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn href="/lien-he/">Nhận báo giá</Btn>
              <Btn href={`/danh-muc/${p.catSlug}/`} variant="dark" arrow={false}>Xem nhóm máy</Btn>
            </div>

            <ul className="whylist ct-list" style={{ marginTop: 28 }}>
              <li><span className="n">☎</span><div><h4>Hỏi nhanh qua điện thoại</h4><p>{company.phones[0]} — {company.hours}</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      {specRows.length > 0 && (
        <section className="sec" style={{ background: "var(--bg1)", paddingTop: 0 }}>
          <div className="wrap">
            <div className="sectop">
              <p className="eyebrow">Thông số kỹ thuật</p>
              <h2 style={{ fontSize: "clamp(24px,2.8vw,34px)" }}>Bảng thông số Ref {p.ref}</h2>
            </div>
            <table className="spectable">
              <tbody>
                {specRows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{specLabel(k)}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="sectop">
              <p className="eyebrow">Cùng nhóm</p>
              <h2 style={{ fontSize: "clamp(24px,2.8vw,34px)" }}>Model cùng {p.catLabel.toLowerCase()}</h2>
            </div>
            <div className="pgrid">
              {related.map((r) => (
                <Link className="pcard" key={r.slug} href={`/san-pham/${r.slug}/`}>
                  <span className="ph">
                    <span className="rf">Ref {r.ref}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src={r.img} alt={r.name} />
                  </span>
                  <span className="bd">
                    <span className="ct">{r.subcat || r.catLabel}</span>
                    <h4>{r.name}</h4>
                    <span className="sp">{r.rpm ? `${vn(r.rpm)} vòng/phút` : "—"}{r.hp ? ` · ${String(r.hp).replace(".", ",")} hp` : ""}</span>
                    <span className="ft">
                      <span className="pr">${vn(r.price)}</span>
                      <span className="arrowbtn"><Arrow size={16} /></span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec" style={{ background: "var(--bg1)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,60px)", alignItems: "start" }}>
          <div>
            <p className="eyebrow">Báo giá</p>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)" }}>Hỏi giá Ref {p.ref}</h2>
            <p style={{ marginTop: 14 }}>
              Gửi yêu cầu, kỹ sư {SITE_NAME.toLowerCase()} sẽ báo giá bán tại Việt Nam kèm đá mài và
              vật tư đi kèm trong 2 giờ làm việc.
            </p>
          </div>
          <ContactForm presetProduct={`${p.name} (Ref ${p.ref})`} />
        </div>
      </section>
    </>
  );
}
