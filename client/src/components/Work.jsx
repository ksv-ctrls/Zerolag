import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";

const work = [
  {
    n: "01",
    title: "Helios OS",
    client: "Helios Labs",
    tag: "Product · 2025",
    img: w1,
  },
  {
    n: "02",
    title: "Maison Étoile",
    client: "Maison Étoile",
    tag: "E-commerce · 2025",
    img: w2,
  },
  {
    n: "03",
    title: "Field Notes",
    client: "Field Notes Co.",
    tag: "Brand · 2024",
    img: w3,
  },
  {
    n: "04",
    title: "Cobalt Wallet",
    client: "Cobalt",
    tag: "Mobile · 2024",
    img: w4,
  },
];

export function Work() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const t = track.current;
      if (!t) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const distance = t.scrollWidth - window.innerWidth + 96;
        gsap.to(t, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground/50">
              Selected work
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-balance">
              Cases that{" "}
              <span className="italic" style={{ color: "var(--electric)" }}>
                moved markets.
              </span>
            </h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 md:block">
            ← scroll →
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="flex flex-col min-[900px]:flex-row min-[900px]:w-max gap-8 min-[900px]:gap-6 px-6 min-[900px]:px-0 min-[900px]:pl-6 min-[900px]:pr-24 w-full will-change-transform mx-auto max-w-7xl min-[900px]:max-w-none"
      >
        {work.map((w) => (
          <a
            key={w.n}
            href="#"
            data-cursor
            className="group relative block w-full min-[900px]:w-[88vw] min-[900px]:max-w-[680px] flex-none overflow-hidden rounded-3xl border border-foreground/10 bg-card"
          >
            <div className="aspect-[16/11] overflow-hidden">
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                width={1280}
                height={896}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex items-end justify-between p-6 sm:p-8">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                  {w.n} · {w.tag}
                </div>
                <div className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
                  {w.title}
                </div>
                <div className="mt-1 text-sm text-foreground/55">
                  {w.client}
                </div>
              </div>
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-foreground shrink-0"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </div>
          </a>
        ))}
        <div className="grid w-full min-[900px]:w-[60vw] min-[900px]:flex-none place-items-center px-12 py-16 min-[900px]:py-0 text-center border border-foreground/10 rounded-3xl bg-card/40">
          <div>
            <div className="font-display text-3xl sm:text-4xl text-balance">
              + 80 more cases <br />
              <span className="italic" style={{ color: "var(--blood)" }}>
                under NDA.
              </span>
            </div>
            <a
              href="#cta"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm transition hover:border-foreground"
            >
              Request the full deck →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
