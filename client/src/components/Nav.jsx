import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#why", label: "Why us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled || isOpen
            ? "glass rounded-full py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]"
            : ""
        }`}
        style={{
          maxWidth: scrolled || isOpen ? "min(1100px, 95%)" : undefined,
        }}
      >
        {/* Logo */}
        <a href="#top" onClick={() => setIsOpen(false)} className="group flex items-center gap-2 relative z-50">
          <span
            className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white"
            style={{
              background:
                "conic-gradient(from 220deg, var(--blood), var(--ink), var(--electric), var(--blood))",
            }}
          >
            Z
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            ZeroLag<span style={{ color: "var(--blood)" }}>StudioZ</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
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

        {/* Right CTA / Hamburger Menu Row */}
        <div className="flex items-center gap-4 relative z-50">
          {/* Desktop "Start a project" Button */}
          <a
            href="#cta"
            className="group relative hidden sm:inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition"
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

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-foreground/15 bg-background/50 backdrop-blur-md transition md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-4 bg-foreground transition-all duration-300 ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-foreground transition-all duration-200 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-foreground transition-all duration-300 ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-40 rounded-[28px] border border-foreground/10 bg-background/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden flex flex-col gap-6"
            style={{ maxWidth: "min(480px, 95%)", margin: "0 auto" }}
          >
            <nav className="flex flex-col gap-5">
              {links.map((l, index) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="font-display text-3xl text-foreground/80 hover:text-foreground transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 + 0.1 }}
              className="border-t border-foreground/10 pt-6 flex flex-col gap-4"
            >
              <a
                href="#cta"
                onClick={() => setIsOpen(false)}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground py-3.5 text-xs font-semibold text-background transition"
              >
                <span className="relative z-10">Start a project</span>
                <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-blood" />
              </a>
              <div className="text-center font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/40">
                Crafted with zero lag
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
