"use client";

import { useEffect, useRef, useState } from "react";

/** Hiện dần khi cuộn tới. Tôn trọng prefers-reduced-motion. */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setSeen(true); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={"rv" + (seen ? " in" : "") + (className ? " " + className : "")}>
      {children}
    </div>
  );
}

/** Đếm số khi cuộn tới. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLBaseElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const dur = 1400;
          const step = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            setN(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <b ref={ref}>{Math.round(n).toLocaleString("vi-VN")}{suffix}</b>;
}

/** Dải chữ chạy ngang. */
export function Marquee({ words }: { words: string[] }) {
  const doubled = [...words, ...words];
  return (
    <div className="marq">
      <div className="row">
        {doubled.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
