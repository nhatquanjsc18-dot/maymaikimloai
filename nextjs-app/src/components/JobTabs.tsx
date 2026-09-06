"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "./ui";

type Card = { t: string; n: string; d: string; href: string };

const JOBS: { id: string; label: string; cards: Card[] }[] = [
  {
    id: "mai",
    label: "Mài & phá ba via",
    cards: [
      { t: "Máy mài góc khí nén", n: "143 model · 950–60.000 vòng/phút", href: "/danh-muc/may-mai-goc-khi-nen/",
        d: "Phá ba via đường hàn, làm sạch kết cấu thép. Có loại góc vuông, góc nghiêng 7° và cần nối dài." },
      { t: "Máy mài đĩa & cắt", n: "102 model · 6.000–20.000 vòng/phút", href: "/danh-muc/may-mai-dia-va-cat/",
        d: "Đá lõm tâm 100–230 mm cho mối hàn lớn, bề mặt phẳng và kết cấu nặng." },
      { t: "Máy mài bút khí nén", n: "34 model · 25.000–100.000 vòng/phút", href: "/danh-muc/may-mai-but-khi-nen/",
        d: "Mũi mài hợp kim 3–6 mm cho khuôn mẫu, rãnh hẹp và chi tiết nhỏ." },
    ],
  },
  {
    id: "cat",
    label: "Cắt kim loại",
    cards: [
      { t: "Máy cắt đá Type 41", n: "Trong nhóm máy mài đĩa & cắt", href: "/danh-muc/may-mai-dia-va-cat/",
        d: "Đĩa cắt phẳng cho phôi, bulong, thanh thép và ống." },
      { t: "Máy cắt đá kim cương", n: "Dòng Rebel Series", href: "/danh-muc/may-mai-dia-va-cat/",
        d: "Cắt vật liệu cứng, tuổi thọ đĩa cao, ít phải thay đĩa giữa ca." },
      { t: "Máy phay khí nén", n: "9 model · 20.000–30.000 vòng/phút", href: "/danh-muc/may-phay-khi-nen/",
        d: "Cắt biên, mở lỗ và gia công rãnh trên tấm kim loại mỏng." },
    ],
  },
  {
    id: "bavia",
    label: "Làm sạch & hoàn thiện",
    cards: [
      { t: "Máy mài băng nhám", n: "30 model · 3.500–25.000 vòng/phút", href: "/danh-muc/may-mai-bang-nham/",
        d: "Dynafile xử lý mối hàn inox, góc trong, ống và khe mà đá mài không vào được." },
      { t: "Máy giũa & cưa rung", n: "11 model · 2.400–5.000 vòng/phút", href: "/danh-muc/may-giua-va-cua-rung/",
        d: "Giũa rung cho khuôn, rãnh và bề mặt cần lấy đi lượng nhỏ vật liệu." },
      { t: "Dụng cụ xử lý bề mặt", n: "3 model · 2.200–3.100 vòng/phút", href: "/danh-muc/dung-cu-xu-ly-be-mat/",
        d: "Gõ rung đánh sạch xỉ hàn, gỉ sét và lớp phủ cũ trước khi sơn." },
    ],
  },
  {
    id: "nham",
    label: "Chà nhám & đánh bóng",
    cards: [
      { t: "Máy chà nhám lệch tâm", n: "194 model · 800–20.000 vòng/phút", href: "/danh-muc/may-cha-nham-lech-tam/",
        d: "Random orbital cho bề mặt phẳng rộng, vết nhám mịn đều, ít xoáy." },
      { t: "Máy chà nhám đồng tâm", n: "226 model · 950–25.000 vòng/phút", href: "/danh-muc/may-cha-nham-dong-tam/",
        d: "Rotary và in-line cho đánh bóng inox, làm bóng mối hàn." },
      { t: "Máy mài băng nhám", n: "30 model · dạng băng", href: "/danh-muc/may-mai-bang-nham/",
        d: "Đánh xước hairline trên inox tấm và ống trang trí." },
    ],
  },
];

export default function JobTabs() {
  const [i, setI] = useState(0);
  const job = JOBS[i];

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Chọn công việc">
        {JOBS.map((j, k) => (
          <button
            key={j.id}
            role="tab"
            aria-selected={k === i}
            className={"tab" + (k === i ? " on" : "")}
            onClick={() => setI(k)}
          >
            {j.label}
          </button>
        ))}
      </div>

      <div className="steps">
        {job.cards.map((c, k) => (
          <div className="step" key={c.t + k}>
            <span className="no">0{k + 1}</span>
            <h3>{c.t}</h3>
            <p style={{ fontFamily: "var(--title-font)", fontWeight: 600, color: "var(--primary)", margin: "0 0 8px", fontSize: 14 }}>
              {c.n}
            </p>
            <p>{c.d}</p>
            <Link className="lk" href={c.href}>Xem model <Arrow size={16} /></Link>
          </div>
        ))}
      </div>
    </>
  );
}
