import type { Metadata } from "next";
import { company, telHref } from "@/lib/site";
import { PageHead } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ nhận báo giá máy mài kim loại",
  description: `Liên hệ ${company.name} để nhận báo giá máy mài kim loại khí nén Dynabrade. Hotline ${company.phones[0]}. ${company.address}`,
  alternates: { canonical: "/lien-he/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        crumb={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
        title="Nhận báo giá máy mài kim loại"
        desc="Điền thông tin, kỹ sư gọi lại trong 2 giờ làm việc kèm đề xuất model và bảng thông số. Hoặc gọi thẳng hotline nếu bạn cần gấp."
      />

      <section className="sec">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,60px)", alignItems: "start" }}>
          <div>
            <p className="eyebrow">Thông tin liên hệ</p>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", margin: "8px 0 0" }}>{company.name}</h2>

            <ul className="whylist ct-list" style={{ marginTop: 26 }}>
              <li><span className="n">⌂</span><div><h4>Địa chỉ</h4><p>{company.address}</p></div></li>
              <li>
                <span className="n">☎</span>
                <div><h4>Điện thoại</h4>
                  <p>{company.phones.map((p, i) => (<span key={p}>{i > 0 && " · "}<a href={telHref(p)}>{p}</a></span>))}</p>
                </div>
              </li>
              <li>
                <span className="n">✉</span>
                <div><h4>Email</h4>
                  <p>{company.emails.map((e, i) => (<span key={e}>{i > 0 && " · "}<a href={`mailto:${e}`}>{e}</a></span>))}</p>
                </div>
              </li>
              <li><span className="n">◷</span><div><h4>Giờ làm việc</h4><p>{company.hours}</p></div></li>
              <li>
                <span className="n">⌘</span>
                <div><h4>Website công ty</h4>
                  <p><a href={company.website} target="_blank" rel="noopener noreferrer">nhatquan.vn</a></p>
                </div>
              </li>
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

          <ContactForm />
        </div>
      </section>
    </>
  );
}
