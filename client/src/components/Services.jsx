import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    n: "01",
    title: "Web Engineering",
    desc: "We construct lightning-fast, highly-interactive web platforms built on robust modern architectures. Clean code, fluid motion, and ultimate reliability.",
    tags: ["MERN Stack", "Next.js", "Three.js", "GSAP"],
    accent: "var(--electric)",
    glowColor: "rgba(0, 71, 255, 0.25)",
  },
  {
    n: "02",
    title: "Product Design",
    desc: "From initial research to production-ready design systems. We craft intuitive user experiences, digital interfaces, and high-fidelity interaction feel.",
    tags: ["Figma", "Framer", "Prototyping"],
    accent: "var(--blood)",
    glowColor: "rgba(192, 0, 26, 0.25)",
  },
  {
    n: "03",
    title: "Brand & Identity",
    desc: "We design unmistakable brand ecosystems that captivate audiences. Distinct visual aesthetics, motion guidelines, and typographic voice.",
    tags: ["Identity", "Type", "Guidelines"],
    accent: "var(--electric)",
    glowColor: "rgba(0, 71, 255, 0.2)",
  },
  {
    n: "04",
    title: "Motion & 3D",
    desc: "We add immersive cinematic dimensions using real-time WebGL, fluid scroll animations, and professional micro-interactions that feel alive.",
    tags: ["WebGL", "After Effects", "GSAP"],
    accent: "var(--blood)",
    glowColor: "rgba(192, 0, 26, 0.25)",
  },
];

export function Services() {
  const root = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Services cards elegant entrance animation
      gsap.fromTo("[data-svc-card]", 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 95%",
          once: true,
        },
      }
      );

      // Section title parallax reveal
      const title = root.current?.querySelector("[data-section-title]");
      if (title) {
        gsap.to(title, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, root);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

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
    
    // Smooth 3D tilt with GSAP
    gsap.to(card, {
      rotateY: dx * 12,
      rotateX: -dy * 12,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Handle spotlight tracking coordinates
    card.style.setProperty("--gx", `${(e.clientX - r.left).toFixed(0)}px`);
    card.style.setProperty("--gy", `${(e.clientY - r.top).toFixed(0)}px`);
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
    <section
      id="services"
      ref={root}
      className="relative py-[140px] px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#050508", color: "#ffffff" }}
    >
      <style>{`
        .svc-card-glow {
          box-shadow: 0 25px 60px -15px rgba(0,0,0,0.8), var(--glow-color-normal) !important;
        }
        .svc-card-glow:hover {
          box-shadow: 0 35px 80px -10px rgba(0,0,0,0.95), var(--glow-color-hover) !important;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="mb-4 font-mono text-xs uppercase tracking-[0.25em]"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
            >
              What we do
            </div>
            <h2
              data-section-title
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-balance text-[#ffffff]"
            >
              Four disciplines.{" "}
              <span className="italic" style={{ color: "var(--blood)" }}>
                One studio.
              </span>
            </h2>
          </div>
          <p
            className="max-w-sm text-sm font-light leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            We embed with founders and product teams to design, build and launch
            the work that defines a category.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.n}
              data-svc-card
              data-cursor
              onMouseMove={onTilt}
              onMouseLeave={onLeave}
              className="group relative overflow-hidden rounded-[28px] border border-white/5 bg-white/[0.02] p-8 md:p-12 transition-all duration-500 ease-out will-change-transform hover:bg-white/[0.05] hover:border-white/15 cursor-none svc-card-glow"
              style={{
                transformStyle: "preserve-3d",
                "--glow-color-normal": `0 10px 30px -10px ${s.glowColor}`,
                "--glow-color-hover": `0 20px 45px -5px ${s.accent}`,
              }}
            >
              {/* Card background glowing atmospheric lighting */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--gx, 50%) var(--gy, 50%), ${s.glowColor}, transparent 55%)`,
                  boxShadow: `inset 0 0 30px 0 ${s.glowColor}`,
                }}
              />

              {/* Dynamic bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{
                  backgroundColor: s.accent,
                  boxShadow: `0 0 20px 2px ${s.accent}`,
                }}
              />

              <div className="relative flex items-start justify-between">
                <span
                  className="font-mono text-xs tracking-[0.2em]"
                  style={{ color: "rgba(255, 255, 255, 0.4)" }}
                >
                  {s.n}
                </span>
                <span
                  className="inline-block h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-125"
                  style={{
                    backgroundColor: s.accent,
                    boxShadow: `0 0 10px 1px ${s.accent}`,
                  }}
                />
              </div>

              <h3 className="relative mt-16 font-display text-4xl md:text-5xl text-[#ffffff]">
                {s.title}
              </h3>
              <p
                className="relative mt-5 max-w-md text-sm font-light leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {s.desc}
              </p>

              <div className="relative mt-10 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs transition-colors duration-300 group-hover:border-white/20"
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
