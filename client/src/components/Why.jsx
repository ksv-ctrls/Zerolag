import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ribbon from "@/assets/ribbon.png";

const stats = [
  { v: 14, suffix: " Days", label: "Average launch time" },
  { v: 98, suffix: "%", label: "Client retention rate" },
  { v: "Unique", suffix: "", label: "Craft-first thinking" },
  { v: "Young", suffix: "", label: "Hungry, obsessive brains" },
];

const pillars = [
  {
    t: "Living Blueprints",
    d: "Static briefs are dead. We architect your requirements directly into interactive, high-fidelity web prototypes from day one.",
  },
  {
    t: "Instant Alignment",
    d: "Frictionless sharing. Distribute secure, live staging links to stakeholders and gather contextual feedback in real-time.",
  },
  {
    t: "Iterative Precision",
    d: "Relentless polish. We fine-tune micro-interactions, optimize physics, and calibrate performance until it's flawless.",
  },
  {
    t: "Zero-Downtime Launch",
    d: "Seamless deployment architecture. Enterprise-grade handoff, lightning-fast shipping, and absolute production reliability.",
  },
];

export function Why() {
  const root = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.counter || "0");
        if (isNaN(target)) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });

      gsap.to("[data-ribbon]", {
        yPercent: -20,
        rotate: 14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray("[data-stack-card]").forEach((card, index, cards) => {
        if (index === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top 128px", 
          endTrigger: cards[index + 1],
          end: "top 128px",
          scrub: true,
          animation: gsap.to(card, {
            scale: 0.92,
            opacity: 0.3,
            y: -20,
            ease: "none",
          }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={root}
      className="relative pt-20 md:pt-32 lg:pt-44 pb-0"
      style={{ background: "var(--ink)", color: "white", overflowX: "clip", overflowY: "visible" }}
    >
      <img
        data-ribbon
        src={ribbon}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 sm:-right-16 -top-20 md:-top-28 z-10 w-[32vw] sm:w-[42vw] max-w-[520px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
          Why ZeroLag
        </div>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-balance">
          Built to be the team{" "}
          <span className="italic" style={{ color: "#ff5b5b" }}>
            you wish you had.
          </span>
        </h2>

        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-y border-white/10 py-10 md:py-12">
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <div className="flex items-baseline gap-1 font-display text-5xl md:text-7xl">
                {typeof s.v === "number" ? (
                  <>
                    <span data-counter={s.v}>0</span>
                    <span className="text-2xl text-white/60">{s.suffix}</span>
                  </>
                ) : (
                  <span className="text-4xl md:text-6xl text-white font-display tracking-tight leading-none">
                    {s.v}
                  </span>
                )}
              </div>
              <div className="mt-3 text-sm text-white/55">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-32 flex flex-col gap-8 md:gap-16 pb-0">
          {pillars.map((p, i) => (
            <div
              key={p.t}
              data-stack-card
              className="sticky top-32 w-full border border-white/10 bg-[var(--ink)] shadow-[0_-15px_50px_-10px_rgba(255,91,91,0.25)] rounded-[32px] p-8 md:p-12 flex flex-col justify-center min-h-[40vh] will-change-transform"
              style={{
                zIndex: i,
              }}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center">
                <span className="font-mono text-5xl md:text-7xl md:w-32 shrink-0" style={{ color: "var(--blood)" }}>
                  0{i + 1}
                </span>
                <div className="mt-2 md:mt-0">
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl">{p.t}</h3>
                  <p className="mt-4 max-w-2xl text-lg md:text-2xl text-white/60 leading-relaxed font-light">{p.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist left-aligned transition heading at the bottom of black area */}
        <div className="mt-12 md:mt-16 max-w-4xl text-left pb-3 md:pb-4 lg:pb-6 ml-[-8px] sm:ml-[-16px] md:ml-[-28px] lg:ml-[-40px]">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 block mb-4">
            Capabilities
          </span>
          <h3 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-white">
            We make{" "}
            <span className="italic" style={{ color: "var(--blood)" }}>
              anything possible.
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}
