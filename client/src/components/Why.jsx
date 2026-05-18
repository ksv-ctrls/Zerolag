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
    t: "Speed without compromise",
    d: "Senior-only teams. We move at startup pace and ship work that wins awards.",
  },
  {
    t: "Craft as a discipline",
    d: "Pixel, type, motion and code reviewed by the people who actually build them.",
  },
  {
    t: "Engineering excellence",
    d: "Type-safe stacks, performance budgets and zero-regression deploys by default.",
  },
  {
    t: "Long-horizon partners",
    d: "Retainers, advisory, and embedded squads — we stay long after launch.",
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

      gsap.from("[data-pillar]", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-pillars]", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={root}
      className="relative overflow-hidden py-20 md:py-32 lg:py-44"
      style={{ background: "var(--ink)", color: "white" }}
    >
      <img
        data-ribbon
        src={ribbon}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 z-0 w-[42vw] max-w-[520px] opacity-90"
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

        <div data-pillars className="mt-16 md:mt-24 grid gap-8 md:gap-12 md:grid-cols-2">
          {pillars.map((p, i) => (
            <div
              key={p.t}
              data-pillar
              className="flex gap-6 border-t border-white/10 pt-8"
            >
              <span className="font-mono text-xs text-white/40">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-3xl">{p.t}</h3>
                <p className="mt-3 max-w-md text-white/60">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
