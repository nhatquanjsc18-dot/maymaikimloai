"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { BrowseItem } from "@/lib/data";
import { Arrow } from "./ui";

const LO = 450;
const HI = 100000;
const lnLO = Math.log(LO);
const lnSPAN = Math.log(HI) - lnLO;

const pos = (v: number) => (Math.log(Math.max(LO, Math.min(HI, v))) - lnLO) / lnSPAN;
const val = (p: number) => Math.exp(lnLO + p * lnSPAN);
const vn = (n: number) => Math.round(n).toLocaleString("vi-VN");

/**
 * Math.log/Math.exp có thể lệch nhau ở ULP cuối cùng giữa V8 phía Node (SSR)
 * và V8 phía trình duyệt (hydrate) — cùng công thức, khác chuỗi số thực ra tới
 * 17 chữ số. Làm tròn 4 chữ số thập phân (dư sức chính xác cho vị trí pixel)
 * để chuỗi luôn khớp, tránh React coi là hydration mismatch và vẽ lại 703 vạch.
 */
const pct = (n: number) => n.toFixed(4) + "%";

/** Làm tròn về nấc chẵn để con số đọc lên giống nấc khắc trên vỏ máy. */
function snap(v: number) {
  if (v <= 1000) return Math.round(v / 50) * 50;
  if (v <= 10000) return Math.round(v / 100) * 100;
  if (v <= 30000) return Math.round(v / 500) * 500;
  return Math.round(v / 1000) * 1000;
}

const SCALE = [500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
const PAGE = 16;

export default function CatalogExplorer({
  items,
  lockedCat,
}: {
  items: BrowseItem[];
  lockedCat?: string;
}) {
  const [lo, setLo] = useState(0);
  const [hi, setHi] = useState(1000);
  const [cat, setCat] = useState<string | null>(lockedCat ?? null);
  const [shown, setShown] = useState(PAGE);
  const [hot, setHot] = useState<string | null>(null);
  const ticksRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => {
    const g: Record<string, { key: string; label: string; n: number }> = {};
    items.forEach((d) => {
      const e = g[d.c] || (g[d.c] = { key: d.c, label: d.cl, n: 0 });
      e.n++;
    });
    return Object.values(g).sort((a, b) => b.n - a.n);
  }, [items]);

  const a0 = Math.min(lo, hi) / 1000;
  const z0 = Math.max(lo, hi) / 1000;
  const a = a0 === 0 ? LO : snap(val(a0));
  const z = z0 === 1 ? HI : snap(val(z0));

  const list = useMemo(
    () =>
      items
        .filter((d) => d.rpm >= a - 1 && d.rpm <= z + 1 && (!cat || d.c === cat))
        .sort((p, q) => p.rpm - q.rpm),
    [items, a, z, cat]
  );

  const inSet = useMemo(() => new Set(list.map((d) => d.r)), [list]);
  const groupLabel = cat ? groups.find((g) => g.key === cat)?.label : null;

  function move(which: "lo" | "hi", v: number) {
    if (which === "lo") setLo(v);
    else setHi(v);
    setShown(PAGE);
  }

  return (
    <>
      <div className="ruler">
        <div className="cap">
          <h3>Thước vòng quay (vòng/phút)</h3>
          <span className="ro">
            {vn(a)} – {vn(z)} <em>RPM</em> · {list.length} <em>MODEL</em>
          </span>
        </div>

        <div className="ticks" ref={ticksRef}>
          {items.map((d) => (
            <span
              key={d.r + d.slug}
              className={"t" + (inSet.has(d.r) ? " in" : "") + (hot === d.r ? " hot" : "")}
              style={{
                left: pct(pos(d.rpm) * 100),
                height: pct(28 + (d.hp ? Math.min(d.hp, 3) / 3 * 56 : 10)),
              }}
            />
          ))}
        </div>

        <div className="scale">
          {SCALE.map((v) => (
            <span key={v} style={{ left: pct(pos(v) * 100) }}>
              {v >= 1000 ? v / 1000 + "K" : v}
            </span>
          ))}
        </div>

        <div className="track">
          <span className="bar" />
          <span className="sel" style={{ left: pct(a0 * 100), width: pct((z0 - a0) * 100) }} />
          <input
            type="range" min={0} max={1000} step={1} value={lo}
            aria-label="Vòng quay tối thiểu"
            onChange={(e) => move("lo", +e.target.value)}
          />
          <input
            type="range" min={0} max={1000} step={1} value={hi}
            aria-label="Vòng quay tối đa"
            onChange={(e) => move("hi", +e.target.value)}
          />
        </div>

        {!lockedCat && (
          <div className="chips">
            {groups.map((g) => (
              <button
                key={g.key}
                className={"chip" + (cat === g.key ? " on" : "")}
                onClick={() => { setCat(cat === g.key ? null : g.key); setShown(PAGE); }}
                aria-pressed={cat === g.key}
              >
                {g.label}<i>{g.n}</i>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="gridbar">
        <h3 style={{ fontSize: 22 }}>{groupLabel ?? "Toàn bộ catalog"}</h3>
        <span className="n">
          {list.length} model · {vn(a)}–{vn(z)} vòng/phút
        </span>
      </div>

      <div className="pgrid">
        {list.length === 0 ? (
          <div className="empty">
            <b>Không có model nào trong dải này</b>
            Nới rộng thước vòng quay hoặc bỏ chọn nhóm máy để xem lại toàn bộ catalog.
          </div>
        ) : (
          list.slice(0, shown).map((d) => (
            <Link
              key={d.slug}
              className="pcard"
              href={`/san-pham/${d.slug}/`}
              onMouseEnter={() => setHot(d.r)}
              onMouseLeave={() => setHot(null)}
            >
              <span className="ph">
                <span className="rf">Ref {d.r}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={d.img} alt={d.n} />
              </span>
              <span className="bd">
                <span className="ct">{d.s || d.cl}</span>
                <h4>{d.n}</h4>
                <span className="sp">
                  {vn(d.rpm)} vòng/phút{d.hp ? ` · ${String(d.hp).replace(".", ",")} hp` : ""}
                </span>
                <span className="ft">
                  <span className="pr">${vn(d.p)}</span>
                  <span className="arrowbtn"><Arrow size={16} /></span>
                </span>
              </span>
            </Link>
          ))
        )}
      </div>

      {list.length > shown && (
        <div className="morewrap">
          <button className="btn" onClick={() => setShown(shown + PAGE)}>
            <span className="t">
              <span>Xem thêm {Math.min(PAGE, list.length - shown)} model</span>
              <span aria-hidden="true">Xem thêm {Math.min(PAGE, list.length - shown)} model</span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
