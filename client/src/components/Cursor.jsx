import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };
    const tick = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const setHover = (h) => {
      if (!ring.current) return;
      ring.current.style.width = h ? "60px" : "28px";
      ring.current.style.height = h ? "60px" : "28px";
      ring.current.style.borderColor = h
        ? "color-mix(in oklab, var(--blood) 70%, transparent)"
        : "color-mix(in oklab, var(--ink) 30%, transparent)";
    };
    const enter = () => setHover(true);
    const leave = () => setHover(false);

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border md:block"
        style={{
          width: 28,
          height: 28,
          borderColor: "color-mix(in oklab, var(--ink) 30%, transparent)",
          transition: "width .25s ease, height .25s ease, border-color .25s ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{ backgroundColor: "var(--ink)", mixBlendMode: "difference" }}
      />
    </>
  );
}
