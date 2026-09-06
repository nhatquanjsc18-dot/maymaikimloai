import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getCategories, vn } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { PageHead, Btn } from "@/components/ui";

export const metadata: Metadata = {
  title: "Máy mài kim loại là gì? Phân loại và cách chọn cho xưởng cơ khí",
  description:
    "Hướng dẫn chọn máy mài kim loại: phân loại máy mài góc, mài thẳng, mài bút, mài băng nhám và máy cắt; cách chọn vòng quay theo đường kính đá; tính lưu lượng khí nén cần thiết.",
  alternates: { canonical: "/may-mai-kim-loai/" },
};

const TOC = [
  { id: "la-gi", label: "Máy mài kim loại là gì" },
  { id: "phan-loai", label: "Phân loại máy mài kim loại" },
  { id: "toc-do", label: "Chọn vòng quay theo đường kính đá" },
  { id: "vat-lieu", label: "Chọn máy theo vật liệu" },
  { id: "khi-nen", label: "Tính khí nén cần thiết" },
  { id: "khi-nen-vs-dien", label: "Khí nén hay chạy điện?" },
  { id: "faq", label: "Câu hỏi thường gặp" },
];

const FAQ = [
  {
    q: "Máy mài kim loại khí nén khác gì máy mài điện?",
    a: "Máy khí nén nhẹ hơn ở cùng công suất, không sinh nhiệt ở tay cầm, không có nguy cơ điện giật trong môi trường ẩm và chạy liên tục nhiều ca mà không quá tải. Bù lại, nó cần máy nén khí đủ lưu lượng — đây là điểm nhiều xưởng bỏ sót khi tính chi phí.",
  },
  {
    q: "Vòng quay bao nhiêu là phù hợp?",
    a: "Tuỳ đường kính đá. Đá 100–125 mm chạy 10.000–12.000 vòng/phút, đá 180 mm còn 8.500, đá 230 mm khoảng 6.000. Mũi mài hợp kim 3–6 mm trên máy mài bút chạy 25.000–100.000 vòng/phút. Thứ giới hạn thực sự là tốc độ vòng ngoài của đá, không phải số vòng/phút.",
  },
  {
    q: "Mài inox có cần máy riêng không?",
    a: "Không cần máy riêng nhưng cần vòng quay thấp hơn và đá chuyên dụng cho inox. Inox dẫn nhiệt kém nên tích nhiệt nhanh, mài quá tốc độ sẽ làm cháy và biến màu bề mặt, phải đánh bóng lại.",
  },
  {
    q: "Máy mài 7 inch cần máy nén khí bao nhiêu?",
    a: "Một máy mài 7 inch 2.8 hp tiêu thụ tới 115 SCFM (khoảng 4.400 lít/phút) ở 6,2 bar. Nếu máy nén không đủ, máy sẽ tụt vòng khi ăn tải và mài chậm hơn cả máy nhỏ.",
  },
  {
    q: "Bảo hành và phụ tùng thế nào?",
    a: "Máy Dynabrade chính hãng bảo hành 12 tháng. Phụ tùng hao mòn thường gặp là cánh gạt động cơ, vòng bi và đế nhám — các món này có sẵn trong kho để thay nhanh, không phải chờ đặt hàng từ Mỹ.",
  },
];

export default function PillarPage() {
  const products = getAllProducts();
  const cats = getCategories().slice().sort((a, b) => b.count - a.count);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Máy mài kim loại là gì? Phân loại và cách chọn cho xưởng cơ khí",
    inLanguage: "vi-VN",
    mainEntityOfPage: SITE_URL + "/may-mai-kim-loai/",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLd, faqLd]) }} />

      <PageHead
        crumb={[{ label: "Trang chủ", href: "/" }, { label: "Cách chọn máy mài kim loại" }]}
        title="Máy mài kim loại là gì? Phân loại và cách chọn"
        desc="Cùng gọi là máy mài kim loại nhưng máy phá đường hàn và máy sửa khuôn khác nhau tới mười lần về vòng quay. Bài này đi qua bốn câu hỏi quyết định model bạn cần."
      />

      <section className="sec">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 280px", gap: "clamp(26px,4vw,54px)", alignItems: "start" }}>
          <article className="prose">
            <h2 id="la-gi">Máy mài kim loại là gì?</h2>
            <p>
              Máy mài kim loại là dụng cụ cầm tay dùng đá mài, đĩa nhám hoặc băng nhám để cắt gọt, làm
              phẳng, đánh ba via và hoàn thiện bề mặt kim loại. Trong sản xuất công nghiệp, loại chạy khí
              nén được ưa chuộng hơn máy điện vì trọng lượng nhẹ ở cùng công suất, không sinh nhiệt ở tay
              cầm, chịu được môi trường bụi — dầu và có thể chạy liên tục nhiều ca mà không quá tải động cơ.
            </p>
            <p>
              Catalog Dynabrade hiện có <strong>{products.length} model</strong> chia thành{" "}
              <strong>{cats.length} nhóm</strong>, trải từ máy gõ rung 2.200 vòng/phút tới máy mài bút
              100.000 vòng/phút.
            </p>

            <h2 id="phan-loai">Phân loại máy mài kim loại</h2>
            <table>
              <thead>
                <tr><th>Nhóm máy</th><th>Việc chính</th><th>Dải vòng quay</th></tr>
              </thead>
              <tbody>
                {cats.filter((c) => c.rpmMin).slice(0, 8).map((c) => (
                  <tr key={c.slug}>
                    <td><Link href={`/danh-muc/${c.slug}/`}>{c.label}</Link></td>
                    <td>{c.intro.split(".")[0]}.</td>
                    <td>{vn(c.rpmMin!)}–{vn(c.rpmMax!)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Máy mài góc</strong> dùng đá lõm tâm để phá ba via đường hàn và làm sạch kết cấu thép.{" "}
              <strong>Máy mài thẳng</strong> và <strong>máy mài bút</strong> dùng mũi mài hợp kim cho khuôn
              mẫu, khe rãnh hẹp. <strong>Máy mài băng nhám</strong> xử lý ống, góc trong, mối hàn inox.{" "}
              <strong>Máy cắt</strong> dùng đĩa Type 41 cắt phôi, bulong, thanh thép.
            </p>

            <h2 id="toc-do">Chọn vòng quay theo đường kính đá</h2>
            <p>
              Thứ giới hạn thực sự là <strong>tốc độ vòng ngoài của đá</strong>, không phải số vòng/phút.
              Đá càng lớn thì cùng một số vòng sẽ cho tốc độ vòng ngoài càng cao — vượt ngưỡng là đá vỡ.
            </p>
            <table>
              <thead><tr><th>Đường kính đá</th><th>Vòng quay khuyến nghị</th><th>Dùng cho</th></tr></thead>
              <tbody>
                <tr><td>75–100 mm</td><td>12.000–15.000</td><td>Chi tiết nhỏ, mối hàn góc</td></tr>
                <tr><td>100–125 mm</td><td>10.000–12.000</td><td>Ba via đường hàn, làm sạch thép</td></tr>
                <tr><td>180 mm</td><td>8.500</td><td>Mối hàn lớn, kết cấu nặng</td></tr>
                <tr><td>230 mm</td><td>6.000–6.500</td><td>Phá thô diện rộng</td></tr>
                <tr><td>Mũi mài 3–6 mm</td><td>25.000–100.000</td><td>Khuôn mẫu, rãnh hẹp</td></tr>
              </tbody>
            </table>
            <p>
              Lắp đá lớn lên máy tốc độ cao là nguyên nhân vỡ đá phổ biến nhất trong xưởng. Luôn đối chiếu
              tốc độ ghi trên nhãn đá với vòng quay không tải của máy.
            </p>

            <h2 id="vat-lieu">Chọn máy theo vật liệu</h2>
            <ul>
              <li><strong>Thép các-bon:</strong> chịu được tốc độ cao, dùng đá lõm tâm tiêu chuẩn.</li>
              <li><strong>Inox:</strong> dẫn nhiệt kém nên tích nhiệt nhanh — hạ vòng quay, dùng đá không chứa sắt để tránh nhiễm bẩn và rỉ điểm.</li>
              <li><strong>Nhôm:</strong> bám dính đá làm bít mặt đá — nên dùng băng nhám hoặc đĩa nhám thay vì đá mài cứng.</li>
              <li><strong>Gang:</strong> sinh bụi mịn nhiều — ưu tiên máy có bản hút bụi trung tâm.</li>
            </ul>

            <h2 id="khi-nen">Tính khí nén cần thiết</h2>
            <p>
              Máy càng mạnh càng ăn khí. Trước khi chọn công suất, kiểm tra lưu lượng máy nén và đường kính
              ống dẫn — thiếu khí thì máy tụt vòng khi ăn tải và mài chậm hơn cả máy nhỏ hơn.
            </p>
            <table>
              <thead><tr><th>Công suất máy</th><th>Lưu lượng cần</th><th>Ống dẫn tối thiểu</th></tr></thead>
              <tbody>
                <tr><td>0.4 hp</td><td>~20 SCFM</td><td>1/4&quot;</td></tr>
                <tr><td>1.0 hp</td><td>~36 SCFM</td><td>3/8&quot;</td></tr>
                <tr><td>1.3 hp</td><td>~43 SCFM</td><td>3/8&quot;</td></tr>
                <tr><td>2.8–3.0 hp</td><td>~115 SCFM</td><td>1/2&quot;</td></tr>
              </tbody>
            </table>
            <p>Tất cả tính ở áp suất làm việc 6,2 bar (90 PSI) tại đầu vào máy, không phải tại bình chứa.</p>

            <h2 id="khi-nen-vs-dien">Khí nén hay chạy điện?</h2>
            <p>
              Nếu xưởng đã có hệ khí nén, máy khí nén gần như luôn là lựa chọn tốt hơn cho sản xuất liên
              tục: nhẹ hơn nên thợ đỡ mỏi, không cháy động cơ khi kẹt đá, và sửa chữa chỉ là thay cánh gạt
              với vòng bi. Nếu chỉ dùng lẻ tẻ vài giờ mỗi tuần và chưa có máy nén, máy điện rẻ hơn về tổng
              đầu tư.
            </p>

            <h2 id="faq">Câu hỏi thường gặp</h2>
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}

            <div style={{ marginTop: 32 }}>
              <Btn href="/san-pham/">Xem toàn bộ catalog</Btn>
            </div>
          </article>

          <aside style={{ position: "sticky", top: 96 }}>
            <div className="toc">
              <b>Nội dung</b>
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`}>{t.label}</a>
              ))}
            </div>
            <div className="toc" style={{ marginTop: 18, background: "var(--primary)", borderColor: "var(--primary)" }}>
              <b style={{ color: "#fff" }}>Cần tư vấn nhanh?</b>
              <p style={{ margin: "0 0 14px", color: "#fff", fontSize: 14.5 }}>
                Gửi mô tả công đoạn, kỹ sư chọn model giúp bạn trong 2 giờ.
              </p>
              <Btn href="/lien-he/" variant="dark">Nhận tư vấn</Btn>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
