"use client";

import { useState } from "react";
import { site, SITE_HOST } from "@/lib/site";

type Status = { kind: "ok" | "err"; msg: string } | null;

const GROUPS = [
  "Chưa rõ — cần tư vấn",
  "Máy mài góc khí nén",
  "Máy mài đĩa & cắt",
  "Máy mài bút",
  "Máy mài băng nhám",
  "Máy chà nhám",
  "Máy khoan khí nén",
];

export default function ContactForm({ presetProduct }: { presetProduct?: string }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const accessKey = site.web3formsAccessKey;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!accessKey) {
      setStatus({ kind: "err", msg: 'Thiếu access key Web3Forms. Điền "web3formsAccessKey" trong data/site.json rồi build lại.' });
      return;
    }
    if (!form.reportValidity()) return;

    setBusy(true);
    setStatus(null);

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = await r.json();
      if (r.ok && body.success) {
        form.reset();
        setStatus({ kind: "ok", msg: "Đã gửi. Kỹ sư sẽ liên hệ lại trong 2 giờ làm việc." });
      } else {
        setStatus({ kind: "err", msg: "Gửi không thành công: " + (body?.message ?? "lỗi không rõ") + ". Gọi hotline giúp chúng tôi nhé." });
      }
    } catch {
      setStatus({ kind: "err", msg: "Không kết nối được tới máy chủ gửi form. Kiểm tra mạng rồi thử lại, hoặc gọi hotline." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value={site.formSubject} />
      <input type="hidden" name="from_name" value={SITE_HOST} />
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" />

      <div className="fld">
        <label htmlFor="cf-name">Họ tên <b>*</b></label>
        <input id="cf-name" name="name" type="text" required placeholder="Nguyễn Văn A" />
      </div>
      <div className="fld">
        <label htmlFor="cf-phone">Điện thoại hoặc Zalo <b>*</b></label>
        <input id="cf-phone" name="phone" type="tel" required inputMode="tel" placeholder="09xx xxx xxx" />
      </div>
      <div className="fld">
        <label htmlFor="cf-email">Email <b>*</b></label>
        <input id="cf-email" name="email" type="email" required placeholder="ban@congty.com" />
      </div>
      <div className="fld">
        <label htmlFor="cf-company">Công ty</label>
        <input id="cf-company" name="company" type="text" placeholder="Tên xưởng / công ty" />
      </div>
      <div className="fld">
        <label htmlFor="cf-product">Nhóm máy quan tâm</label>
        <select id="cf-product" name="product" defaultValue={presetProduct ?? GROUPS[0]}>
          {presetProduct && <option>{presetProduct}</option>}
          {GROUPS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>
      <div className="fld">
        <label htmlFor="cf-message">Việc cần làm <b>*</b></label>
        <textarea
          id="cf-message" name="message" required
          placeholder="Ví dụ: phá ba via đường hàn inox 304 dày 6 mm, khoảng 200 chi tiết mỗi ca"
        />
      </div>

      <button className="btn" type="submit" disabled={busy} aria-busy={busy} style={{ width: "100%", justifyContent: "center" }}>
        <span className="t">
          <span>{busy ? "Đang gửi…" : "Gửi yêu cầu báo giá"}</span>
          <span aria-hidden="true">{busy ? "Đang gửi…" : "Gửi yêu cầu báo giá"}</span>
        </span>
      </button>

      {status && (
        <p className={"formnote " + (status.kind === "ok" ? "ok" : "err")} role="status" aria-live="polite">
          {status.msg}
        </p>
      )}
    </form>
  );
}
