import { PageHead, Btn } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHead
        crumb={[{ label: "Trang chủ", href: "/" }, { label: "Không tìm thấy" }]}
        title="Không tìm thấy trang này"
        desc="Đường dẫn có thể đã đổi hoặc sản phẩm không còn trong catalog. Thử tìm lại trong catalog hoặc gọi hotline để chúng tôi tra giúp."
      />
      <section className="sec">
        <div className="wrap" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Btn href="/san-pham/">Xem catalog</Btn>
          <Btn href="/lien-he/" variant="dark" arrow={false}>Liên hệ</Btn>
        </div>
      </section>
    </>
  );
}
