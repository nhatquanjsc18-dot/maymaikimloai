import type { Metadata } from "next";
import { getAllProducts, getCategories } from "@/lib/data";
import { company, telHref } from "@/lib/site";
import { PageHead, Btn, Check } from "@/components/ui";
import { Marquee } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Giới thiệu — Nhà cung cấp máy mài kim loại Dynabrade tại Việt Nam",
  description: `${company.name} cung cấp máy mài kim loại khí nén công nghiệp Dynabrade — Made in USA. Tư vấn kỹ thuật, demo tại xưởng, bảo hành 12 tháng, kho phụ tùng sẵn.`,
  alternates: { canonical: "/gioi-thieu/" },
};

export default function AboutPage() {
  const products = getAllProducts();
  const cats = getCategories();

  return (
    <>
      <PageHead
        crumb={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]}
        title="Chúng tôi bán máy mài, và bán cả cách chọn máy"
        desc={`${company.name} là nhà cung cấp thiết bị khí nén công nghiệp tại TP.HCM. Với máy mài kim loại, chúng tôi phân phối Dynabrade — thương hiệu chế tạo dụng cụ khí nén tại Clarence, New York từ năm 1969.`}
      />

      <section className="sec">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,60px)", alignItems: "start" }}>
          <div className="prose">
            <p className="eyebrow">Cách chúng tôi làm việc</p>
            <h2 style={{ fontSize: "clamp(24px,2.8vw,34px)", margin: "8px 0 14px" }}>
              Hỏi trước, báo giá sau
            </h2>
            <p>
              Phần lớn sai lầm khi mua máy mài không nằm ở thương hiệu mà ở chỗ chọn sai dải tốc độ hoặc
              sai kiểu thân máy. Một máy mài góc 7 inch rất mạnh nhưng vô dụng khi phải với vào lòng bồn;
              một máy mài bút 100.000 vòng/phút không thể thay máy phá đường hàn.
            </p>
            <p>
              Vì vậy trước khi báo giá, chúng tôi hỏi bốn thứ: vật liệu gì, dày bao nhiêu, bao nhiêu chi
              tiết mỗi ca, và máy nén khí hiện có lưu lượng bao nhiêu. Từ đó mới chọn model — và nói thẳng
              nếu máy nén của bạn chưa đủ để chạy model đó.
            </p>

            <h2>Những gì chúng tôi cam kết</h2>
            <ul className="feats" style={{ gridTemplateColumns: "1fr", margin: "18px 0 0" }}>
              {[
                "Hàng chính hãng, đầy đủ CO/CQ và chứng từ nhập khẩu",
                "Bảo hành 12 tháng, sửa chữa tại xưởng của chúng tôi",
                "Kho phụ tùng cánh gạt, vòng bi, đế nhám sẵn có",
                "Demo tại xưởng bạn trước khi ra quyết định mua",
                "Báo giá gồm cả đá mài và vật tư tiêu hao đi kèm",
                "Xuất hoá đơn VAT, ký hợp đồng công ty",
              ].map((t) => (
                <li key={t}><Check />{t}</li>
              ))}
            </ul>

            <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn href="/san-pham/">Xem catalog</Btn>
              <Btn href="/lien-he/" variant="dark" arrow={false}>Liên hệ</Btn>
            </div>
          </div>

          <div>
            <div className="keyspecs" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div><b>{products.length}</b><span>model trong catalog</span></div>
              <div><b>{cats.length}</b><span>nhóm sản phẩm</span></div>
              <div><b>1969</b><span>Dynabrade thành lập</span></div>
              <div><b>USA</b><span>xuất xứ sản xuất</span></div>
            </div>

            <ul className="whylist ct-list" style={{ marginTop: 22 }}>
              <li><span className="n">⌂</span><div><h4>{company.name}</h4><p>{company.address}</p></div></li>
              <li>
                <span className="n">☎</span>
                <div><h4>Điện thoại</h4>
                  <p>{company.phones.map((p, i) => (<span key={p}>{i > 0 && " · "}<a href={telHref(p)}>{p}</a></span>))}</p>
                </div>
              </li>
              <li><span className="n">◷</span><div><h4>Giờ làm việc</h4><p>{company.hours}</p></div></li>
            </ul>

            <div className="mapbox">
              <iframe
                src={company.mapEmbed}
                loading="lazy"
                title={`Bản đồ ${company.name}`}
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <Marquee words={["Giá minh bạch", "Bảo hành 12 tháng", "Demo tại xưởng", "Hàng chính hãng USA", "Hoá đơn VAT", "Kho phụ tùng sẵn"]} />
    </>
  );
}
