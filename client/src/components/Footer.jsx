export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--ink)", color: "white" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr_1.5fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2">
              <span
                className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white"
                style={{
                  background:
                    "conic-gradient(from 220deg, #ff4d57, #000, #4d6bff, #ff4d57)",
                }}
              >
                Z
              </span>
              <span className="text-sm font-semibold">
                ZeroLag<span style={{ color: "#ff5b5b" }}>StudioZ</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-white/55">
              Creative engineering studio. We design and build the cinematic
              web for ambitious teams.
            </p>
          </div>

          <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Studio
            </div>
            <ul className="space-y-3 text-sm text-white/75">
              <li><a href="#work" className="hover:text-white transition-colors duration-300">Work</a></li>
              <li><a href="#services" className="hover:text-white transition-colors duration-300">Services</a></li>
              <li><a href="#team" className="hover:text-white transition-colors duration-300">Team</a></li>
              <li><a href="#why" className="hover:text-white transition-colors duration-300">Manifesto</a></li>
            </ul>
          </div>

          <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Contact
            </div>
            <a
              href="mailto:zerolagstudioz@gmail.com"
              className="block text-white/80 hover:text-white text-base transition-colors duration-300 font-medium"
            >
              zerolagstudioz@gmail.com
            </a>
            
            <div className="mt-8">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Location
              </div>
              <div className="text-sm text-white/60">
                Built Remotely From Chennai, India
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div
            className="font-display leading-[0.9] tracking-tight"
            style={{
              fontSize: "clamp(4rem,17vw,18rem)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.1))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ZeroLag.
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} ZeroLag StudioZ — All rights reserved.</div>
          <div className="font-mono uppercase tracking-[0.25em]">
            Crafted with zero lag.
          </div>
        </div>
      </div>
    </footer>
  );
}
