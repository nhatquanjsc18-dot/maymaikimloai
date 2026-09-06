import Link from "next/link";
import { getAllProducts, getBrowseData, getCategories, vn } from "@/lib/data";
import { company, telHref } from "@/lib/site";
import { Btn, SectionTop, Arrow, Check } from "@/components/ui";
import { Reveal, Counter, Marquee } from "@/components/Bits";
import JobTabs from "@/components/JobTabs";
import CatalogExplorer from "@/components/CatalogExplorer";
import ContactForm from "@/components/ContactForm";

const HERO_REF = "53280";
const FEATURED = ["53280", "14000", "52850"];

export default function Home() {
  const products = getAllProducts();
  const browse = getBrowseData();
  const cats = getCategories();

  const byRef = (r: string) => products.find((p) => p.ref === r);
  const hero = byRef(HERO_REF);
  const featured = FEATURED.map(byRef).filter(Boolean);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">Dụng cụ khí nén công nghiệp — Made in USA</p>
            <h1>Máy mài kim loại<br />cho xưởng cơ khí</h1>
            <p className="lead">
              {products.length} model máy mài góc, mài thẳng, mài bút, cắt đá và mài băng nhám Dynabrade.
              Động cơ cánh gạt giữ vòng quay ổn định khi tải nặng, thân nhôm nhẹ, chạy liên tục 3 ca.
              Tư vấn kỹ thuật và demo tại xưởng trước khi mua.
            </p>
            <div className="btns">
              <Btn href="/san-pham/">Xem catalog</Btn>
              <Btn href="/lien-he/" variant="ghost" arrow={false}>Tư vấn chọn máy</Btn>
            </div>
          </div>
          <div className="visual">
            <div className="card">
              <span className="badge">Bán chạy</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero?.img} alt={hero?.name ?? "Máy mài kim loại Dynabrade"} />
              <span className="spec"><b>8.500</b>vòng/phút · 2.8 hp</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SỐ LIỆU ---------------- */}
      <div className="stats">
        <div className="wrap">
          <div><Counter to={products.length} /><span>Model trong catalog</span></div>
          <div><Counter to={cats.length} /><span>Nhóm sản phẩm</span></div>
          <div><Counter to={100000} /><span>Vòng/phút tối đa</span></div>
          <div><Counter to={12} /><span>Tháng bảo hành</span></div>
        </div>
      </div>

      {/* ---------------- GIỚI THIỆU ---------------- */}
      <section className="sec about">
        <div className="wrap">
          <Reveal>
            <div className="pics">
              <div className="a">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={byRef("52632")?.img} alt="Máy mài đá lõm tâm góc vuông Dynabrade 52632" />
              </div>
              <div className="b">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={byRef("52850")?.img} alt="Máy mài bút chì Dynabrade 52850" />
              </div>
              <div className="yrs"><b>1969</b><span>Dynabrade từ năm</span></div>
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Về chúng tôi</p>
            <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>
              Chọn đúng máy mài, giảm một nửa thời gian gia công
            </h2>
            <p style={{ marginTop: 16 }}>
              Chúng tôi không bán theo danh mục — chúng tôi hỏi bạn mài vật liệu gì, dày bao nhiêu,
              bao nhiêu chi tiết mỗi ca, rồi mới đề xuất model. Toàn bộ {products.length} model đều có
              bảng thông số đầy đủ để bạn đối chiếu trước khi quyết định.
            </p>
            <ul className="feats">
              {[
                "Demo tại xưởng của bạn",
                "Kho phụ tùng thay thế",
                "Bảo hành 12 tháng",
                "Hoá đơn VAT, hợp đồng",
                "Tư vấn cả đá mài, vật tư",
                "Giao hàng toàn quốc",
              ].map((f) => (
                <li key={f}><Check />{f}</li>
              ))}
            </ul>
            <div style={{ marginTop: 30 }}>
              <Btn href="/may-mai-kim-loai/" variant="dark">Cách chọn máy</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CHỌN THEO CÔNG VIỆC ---------------- */}
      <section className="sec" style={{ background: "var(--bg1)" }}>
        <div className="wrap">
          <Reveal>
            <SectionTop
              center bars
              eyebrow="Chọn theo công việc"
              title="Bạn cần làm gì với kim loại?"
              desc="Chọn công việc, chúng tôi chỉ ra nhóm máy phù hợp và dải vòng quay tương ứng."
            />
          </Reveal>
          <JobTabs />
        </div>
      </section>

      {/* ---------------- CATALOG ---------------- */}
      <section className="sec cata" id="catalog">
        <div className="wrap">
          <Reveal>
            <SectionTop
              center bars
              eyebrow="Catalog sản phẩm"
              title={`${browse.length} model, lọc theo dải vòng quay`}
              desc="Kéo hai đầu thước để lọc nhanh những máy chạy đúng dải tốc độ công việc của bạn cần."
            />
          </Reveal>
          <CatalogExplorer items={browse} />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <div className="cta">
        <div className="wrap">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>Tư vấn miễn phí</p>
            <h2>Gửi chi tiết gia công, nhận đúng model trong 2 giờ</h2>
            <p>Mô tả vật liệu, độ dày và sản lượng mỗi ca — kỹ sư sẽ chọn máy kèm bảng thông số và đá mài phù hợp.</p>
          </div>
          <div className="act">
            <Btn href="/lien-he/" variant="dark">Liên hệ ngay</Btn>
          </div>
        </div>
      </div>

      {/* ---------------- NỔI BẬT ---------------- */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <SectionTop center bars eyebrow="Sản phẩm nổi bật" title="Những model xưởng cơ khí dùng nhiều nhất" />
          </Reveal>
          <Reveal>
            <div className="projs">
              {featured.map((p) => p && (
                <Link className="proj" key={p.ref} href={`/san-pham/${p.slug}/`}>
                  <div className="im">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} />
                  </div>
                  <div className="info">
                    <div>
                      <span className="ct">{p.subcat || p.catLabel} · Ref {p.ref}</span>
                      <h3>{p.name}</h3>
                    </div>
                    <span className="arrowbtn"><Arrow size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee words={["Giá minh bạch", "Bảo hành 12 tháng", "Demo tại xưởng", "Hàng chính hãng USA", "Hoá đơn VAT", "Kho phụ tùng sẵn"]} />

      {/* ---------------- VÌ SAO ---------------- */}
      <section className="sec why">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Vì sao chọn chúng tôi</p>
            <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>Nền tảng của một quyết định mua đúng</h2>
            <p style={{ marginTop: 14 }}>
              Máy mài kim loại là khoản đầu tư dùng nhiều năm. Chúng tôi cung cấp đủ dữ liệu để bạn
              quyết định — không ép mua, không giấu thông số.
            </p>
            <div className="since">
              <span className="yr"><span>Dynabrade thành lập</span><b>1969</b></span>
              <p style={{ margin: 0, fontSize: 15 }}>
                Hơn 55 năm chế tạo dụng cụ khí nén tại Clarence, New York, Hoa Kỳ.
              </p>
            </div>
            <Btn href="/lien-he/">Nhận tư vấn</Btn>
          </Reveal>
          <Reveal>
            <ul className="whylist">
              <li><span className="n">01</span><div><h4>Thông số công khai</h4><p>{products.length} model đều có bảng thông số đầy đủ: công suất, vòng quay, lưu lượng khí, khối lượng, kích thước.</p></div></li>
              <li><span className="n">02</span><div><h4>Chạy thử trên chi tiết của bạn</h4><p>Chúng tôi mang máy tới xưởng, mài chính chi tiết bạn đang làm và đo thời gian gia công thực tế.</p></div></li>
              <li><span className="n">03</span><div><h4>Tính cả chi phí vật tư</h4><p>Máy rẻ mà ăn đá, ăn khí thì tổng chi phí lại cao hơn. Chúng tôi báo giá gồm cả đá mài và vật tư tiêu hao.</p></div></li>
              <li><span className="n">04</span><div><h4>Phụ tùng và sửa chữa</h4><p>Kho phụ tùng cánh gạt, vòng bi, đế nhám; dịch vụ bảo dưỡng định kỳ tại chỗ.</p></div></li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DANH MỤC ---------------- */}
      <section className="sec" style={{ background: "var(--bg1)" }}>
        <div className="wrap">
          <Reveal>
            <SectionTop center bars eyebrow="Danh mục" title="Toàn bộ nhóm máy trong catalog" />
          </Reveal>
          <Reveal>
            <div className="catgrid">
              {cats.slice().sort((a, b) => b.count - a.count).map((c) => (
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
                    <span className="go">Xem nhóm <Arrow size={15} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- LIÊN HỆ ---------------- */}
      <section className="sec" id="lienhe" style={{ background: "#fff" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,60px)", alignItems: "start" }}>
          <Reveal>
            <p className="eyebrow">Liên hệ</p>
            <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>Nhận báo giá máy mài kim loại</h2>
            <p style={{ marginTop: 14 }}>
              Điền thông tin, kỹ sư gọi lại trong 2 giờ làm việc kèm đề xuất model và bảng thông số.
            </p>
            <ul className="whylist ct-list" style={{ marginTop: 26 }}>
              <li><span className="n">⌂</span><div><h4>Công ty</h4><p>{company.name}</p><p style={{ marginTop: 4 }}>{company.address}</p></div></li>
              <li><span className="n">☎</span><div><h4>Điện thoại</h4><p>{company.phones.map((p, i) => (<span key={p}>{i > 0 && " · "}<a href={telHref(p)}>{p}</a></span>))}</p></div></li>
              <li><span className="n">✉</span><div><h4>Email</h4><p>{company.emails.map((e, i) => (<span key={e}>{i > 0 && " · "}<a href={`mailto:${e}`}>{e}</a></span>))}</p></div></li>
              <li><span className="n">◷</span><div><h4>Giờ làm việc</h4><p>{company.hours}</p></div></li>
            </ul>
          </Reveal>
          <Reveal><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
