import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Config ─────────────────────────────────────────── */
const TOTAL_FRAMES = 300;
const FRAME_PATH = (i) =>
  `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

/* ── Story beats — alternating red / blue ──────────── */
const BEATS = [
  { at: 0.00, label: "01", title: "Interfaces\nof Tomorrow",   sub: "Scroll to enter the void",             color: "var(--blood)"   },
  { at: 0.22, label: "02", title: "Crystal\nArchitectures",    sub: "Glass panes floating in zero gravity", color: "var(--electric)" },
  { at: 0.46, label: "03", title: "Holographic\nDisassembly",  sub: "Systems deconstruct into light",       color: "var(--blood)"   },
  { at: 0.70, label: "04", title: "Digital\nImmersion",        sub: "Step inside the machine",              color: "var(--electric)" },
  { at: 0.90, label: "05", title: "Beyond\nthe Interface",     sub: "Where design meets the infinite",      color: "var(--blood)"   },
];

/* ── Component ──────────────────────────────────────── */
export function CinematicScroll() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef({ current: 0 });
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const particlesRef = useRef(null);

  /* ── Preload all frames ───────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    const images = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        count++;
        if (!cancelled) {
          setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
          if (count === TOTAL_FRAMES) {
            imagesRef.current = images;
            setLoaded(true);
          }
        }
      };
      images.push(img);
    }

    return () => { cancelled = true; };
  }, []);

  /* ── Canvas rendering + GSAP scroll sync ──────────── */
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const images = imagesRef.current;

    /* HiDPI-aware canvas sizing for crisp rendering */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(frameRef.current.current);
    };

    /* Draw a specific frame with cover-fit */
    function drawFrame(index) {
      const img = images[Math.min(Math.max(Math.round(index), 0), TOTAL_FRAMES - 1)];
      if (!img) return;

      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      /* Cover-fit calculation */
      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    resize();
    window.addEventListener("resize", resize);
    drawFrame(0);

    /* GSAP ScrollTrigger – maps scroll to frame index */
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        pin: false,
      },
    });

    masterTl.to(frameRef.current, {
      current: TOTAL_FRAMES - 1,
      ease: "none",
      onUpdate: () => drawFrame(frameRef.current.current),
    });

    // No text overlay timeline needed

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaded]);

  /* ── Floating particles ───────────────────────────── */
  useEffect(() => {
    if (!loaded || !particlesRef.current) return;

    const canvas = particlesRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2 - 0.15,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    function animate() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p.alpha * 0.35})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p.alpha * 0.1})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [loaded]);

  return (
    <section
      id="reel"
      ref={sectionRef}
      className="relative"
      style={{ height: "600vh" }}
    >
      {/* ── Loading overlay ──────────────────────── */}
      {!loaded && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--ink)]">
          <div className="relative w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
              style={{
                width: `${loadProgress}%`,
                background: "linear-gradient(90deg, var(--electric), var(--blood))",
                boxShadow: "0 0 20px var(--electric)",
              }}
            />
          </div>
          <p className="mt-4 font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
            Loading cinematic · {loadProgress}%
          </p>
        </div>
      )}

      {/* ── Sticky viewport container ────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--background)]">

        {/* ── Fullscreen Cinematic frame viewer ───── */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {/* Main frame canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Vignette on the frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Film grain on the frame */}
          <div
            className="grain absolute inset-0 pointer-events-none"
            style={{ opacity: 0.15 }}
          />
        </div>

        {/* ── Floating particle overlay (full screen) ── */}
        <canvas
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3 }}
        />

        {/* Story beats text overlay removed as requested */}

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 10 }}
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-black/30 animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
