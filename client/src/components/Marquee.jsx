const items = [
  "Product Design",
  "Web Engineering",
  "Brand Systems",
  "Motion · 3D",
  "AI Interfaces",
  "Creative Direction",
];

export function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-foreground/10 bg-background py-8">
      <div className="marquee-track flex w-max gap-16 whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-16 font-display text-4xl md:text-6xl"
          >
            <span>{it}</span>
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  i % 3 === 0
                    ? "var(--blood)"
                    : i % 3 === 1
                      ? "var(--electric)"
                      : "var(--ink)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
