import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ksvImg from "@/assets/ksv.jpeg";
import spImg from "@/assets/sp.png";

const founders = [
  {
    n: "Kalaa Sri Varshini",
    shortName: "ksv",
    role: "Founder / Developer",
    portfolio: "kalaasrivarshini.in",
    glowColor: "var(--electric)",
    accentColor: "rgba(0, 71, 255, 0.4)",
    initials: "KS",
    img: ksvImg,
  },
  {
    n: "Samuel Paul",
    shortName: "sp",
    role: "Founder / Designer",
    portfolio: "samuelpaulamardeep.in",
    glowColor: "var(--blood)",
    accentColor: "rgba(192, 0, 26, 0.4)",
    initials: "SP",
    img: spImg,
  },
];

export function Team() {
  const root = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-team-card]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 95%", once: true },
        }
      );
    }, root);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
    };
  }, []);

  const onTilt = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);

    // Apply smooth 3D tilt
    gsap.to(card, {
      rotateY: dx * 10,
      rotateX: -dy * 10,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Update inner glow coordinates
    card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width * 100).toFixed(0)}%`);
    card.style.setProperty("--my", `${((e.clientY - r.top) / r.height * 100).toFixed(0)}%`);
  };

  const onLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section id="team" ref={root} className="relative py-20 md:py-32 lg:py-44 overflow-hidden" style={{ background: "var(--ink)", color: "white" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
              Meet the studio
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-balance">
              Two Minds.{" "}
              <span className="italic" style={{ color: "var(--blood)" }}>
                Fully Crafted Work.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {founders.map((f) => (
            <div
              key={f.n}
              data-team-card
              data-cursor
              onMouseMove={onTilt}
              onMouseLeave={onLeave}
              className="group relative rounded-[32px] border border-white/5 bg-white/[0.01] p-6 sm:p-10 md:p-14 flex flex-col justify-between aspect-auto min-h-[460px] sm:aspect-[3/4] md:aspect-[4/5] sm:min-h-0 transition-all duration-500 ease-out will-change-transform hover:bg-white/[0.03] hover:border-white/10 cursor-none"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)",
              }}
            >
              {/* Background Photo & Gradient Overlay */}
              <div 
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[32px]"
                style={{ backgroundColor: "var(--ink)" }}
              >
                <img
                  src={f.img}
                  alt={f.n}
                  className="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-90"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, var(--ink) 0%, color-mix(in oklab, var(--ink) 40%, transparent) 50%, transparent 100%)"
                  }}
                />
              </div>

              {/* Dynamic hover shadow around the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 blur-[60px] transition-opacity duration-1000 group-hover:opacity-100 -z-10"
                style={{
                  background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${f.accentColor} 0%, transparent 70%)`,
                }}
              />

              {/* Top Row: Initials Badge & Cybernetic Mesh Icon */}
              <div className="flex items-center justify-between relative z-10">
                <span
                  className="font-mono text-xs tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-medium lowercase shadow-lg"
                >
                  {f.shortName}
                </span>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: f.glowColor,
                    boxShadow: `0 0 12px 2px ${f.glowColor}`,
                  }}
                />
              </div>

              <div className="flex-1" />

              {/* Bottom Row: Founder Metadata & Dynamic URL Button */}
              <div className="relative z-10">
                <h3 className="font-display text-4xl md:text-5xl text-white tracking-tight">
                  {f.n}
                </h3>
                <div
                  className="mt-2 font-mono text-xs uppercase tracking-[0.2em]"
                  style={{ color: f.glowColor }}
                >
                  {f.role}
                </div>

                <a
                  href={`https://${f.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs tracking-[0.1em] text-white/70 backdrop-blur transition-all duration-300 hover:border-white hover:text-white hover:bg-white/10 cursor-none"
                >
                  {f.portfolio}
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
