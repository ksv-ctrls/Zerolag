import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import heroObject from "@/assets/hero-object.jpg";

export function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const rx = (e.clientX / window.innerWidth - 0.5) * 20;
      const ry = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty("--mx", `${rx}px`);
      el.style.setProperty("--my", `${ry}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
      style={{ background: "var(--gradient-aurora)" }}
    >
      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.img
        src={heroObject}
        alt=""
        aria-hidden
        width={1536}
        height={1536}
        className="pointer-events-none absolute right-[-8%] sm:right-[-10%] top-[12%] sm:top-[8%] z-0 w-[90vw] sm:w-[58vw] max-w-[820px] select-none opacity-85 sm:opacity-100"
        style={{
          transform: "translate3d(var(--mx,0), var(--my,0), 0)",
          filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.18))",
          mixBlendMode: "multiply",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-foreground/15 bg-background/60 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs backdrop-blur whitespace-nowrap"
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ backgroundColor: "var(--blood)" }}
          />
          <span className="font-mono uppercase tracking-[0.08em] sm:tracking-[0.18em] text-foreground/70">
            Building For Ambitious Brands
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.92] tracking-tight text-balance">
          {["Design", "with", "zero", "lag."].map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.25 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mr-[0.18em] inline-block"
            >
              {word === "lag." ? (
                <span className="italic" style={{ color: "var(--blood)" }}>
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 max-w-xl text-base leading-relaxed text-foreground/65 md:text-lg"
        >
          A creative engineering studio building cinematic websites, products
          and brand systems for ambitious teams. Premium craft, shipped fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-row flex-nowrap items-center justify-start gap-3 sm:gap-4"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 overflow-hidden rounded-full bg-foreground px-5 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-medium text-background whitespace-nowrap"
          >
            <span className="relative z-10">Start a project</span>
            <svg
              className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-500 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{
                background:
                  "linear-gradient(90deg, var(--blood), color-mix(in oklab, var(--electric) 80%, var(--ink)))",
              }}
            />
          </a>
          <a
            href="#team"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm transition hover:border-foreground/60 whitespace-nowrap"
          >
            Meet The Team
            <span
              className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150"
              style={{ backgroundColor: "var(--electric)" }}
            />
          </a>
        </motion.div>

        {/* Bottom row */}
        <div className="absolute inset-x-6 bottom-8 z-10 flex items-end justify-end md:justify-between text-xs text-foreground/60 md:bottom-10">
          <div className="hidden md:block" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-3 font-mono uppercase tracking-[0.2em]"
          >
            <span>Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden bg-foreground/20">
              <span
                className="absolute inset-x-0 top-0 block h-1/2 animate-[scrollLine_2.2s_ease-in-out_infinite] bg-foreground"
              />
            </span>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          60%,100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
