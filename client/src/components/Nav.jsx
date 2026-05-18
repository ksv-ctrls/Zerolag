import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#why", label: "Why us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled
            ? "glass rounded-full py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]"
            : ""
        }`}
        style={{
          maxWidth: scrolled ? "min(1100px, 95%)" : undefined,
        }}
      >
        <a href="#top" className="group flex items-center gap-2">
          <span
            className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white"
            style={{
              background:
                "conic-gradient(from 220deg, var(--blood), var(--ink), var(--electric), var(--blood))",
            }}
          >
            Z
          </span>
          <span className="text-sm font-semibold tracking-tight">
            ZeroLag<span style={{ color: "var(--blood)" }}>StudioZ</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-foreground/70 transition hover:text-foreground"
            >
              {l.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition"
        >
          <span className="relative z-10">Start a project</span>
          <span
            className="relative z-10 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--blood)" }}
          />
          <span
            className="absolute inset-0 -translate-y-full transition-transform duration-500 group-hover:translate-y-0"
            style={{
              background:
                "linear-gradient(135deg, var(--blood), color-mix(in oklab, var(--electric) 70%, var(--ink)))",
            }}
          />
        </a>
      </div>
    </header>
  );
}
