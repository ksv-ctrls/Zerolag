import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import orb from "@/assets/orb.png";

export function CTA() {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requirement: "",
    contactInfo: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to("[data-orb]", {
        yPercent: -25,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.requirement) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", requirement: "", contactInfo: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "An error occurred during submission.");
    }
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden py-20 md:py-32 lg:py-44"
      style={{ background: "var(--gradient-aurora)" }}
    >
      <img
        data-orb
        src={orb}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 z-0 w-[34vw] max-w-[420px] opacity-90"
      />
      <img
        data-orb
        src={orb}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-0 z-0 w-[26vw] max-w-[320px] opacity-80"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-6 text-center">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground/50">
            Ready when you are
          </div>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] text-balance">
            Let&apos;s build the{" "}
            <span className="italic" style={{ color: "var(--blood)" }}>
              next one.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/65">
            Tell us about your product, brand, or ambition. We reply within under 24 hours with a clear next step.
          </p>
        </div>

        {/* Cinematic Premium Enquiry Form */}
        <div className="mt-12 rounded-[28px] border border-foreground/10 bg-background/50 p-6 sm:p-8 backdrop-blur-md shadow-[0_30px_70px_rgba(0,0,0,0.06)] md:p-12 max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="text-center py-10 animate-[fadeIn_0.6s_ease-out]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-6 font-display text-3xl text-foreground">Enquiry Shipped</h3>
              <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                Thank you! Your information has been securely transmitted. <br />
                We will get back to you in under 24 hours, guaranteed.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 rounded-full border border-foreground/15 px-6 py-2.5 text-xs font-mono uppercase tracking-[0.1em] hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="E.g., Samuel Paul"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-foreground/10 bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/30 focus:bg-background/80 focus:ring-0 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="E.g., hello@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-foreground/10 bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/30 focus:bg-background/80 focus:ring-0 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
                  Requirement / Project Details *
                </label>
                <textarea
                  name="requirement"
                  required
                  rows={4}
                  placeholder="Describe your goals, tech preferences, and design vision..."
                  value={formData.requirement}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-foreground/10 bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/30 focus:bg-background/80 focus:ring-0 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
                  Optional Contact Info (e.g., Phone, Telegram)
                </label>
                <input
                  type="text"
                  name="contactInfo"
                  placeholder="E.g., WhatsApp +91 or Telegram username"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-foreground/10 bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/30 focus:bg-background/80 focus:ring-0 focus:outline-none transition-all duration-300"
                />
              </div>

              {status === "error" && (
                <div className="rounded-xl bg-red-50/50 p-4 text-xs text-red-600 border border-red-100 flex items-center gap-2 animate-[shake_0.4s_ease-in-out]">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative w-full inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-foreground px-8 py-4.5 text-sm font-medium text-background disabled:opacity-50 transition-opacity duration-300 cursor-none"
              >
                <span className="relative z-10">
                  {status === "submitting" ? "Transmitting details..." : "Submit Enquiry"}
                </span>
                {status !== "submitting" && (
                  <>
                    <span
                      className="relative z-10 h-2 w-2 rounded-full"
                      style={{ backgroundColor: "var(--blood)" }}
                    />
                    <span
                      className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{
                        background: "linear-gradient(90deg, var(--blood), var(--electric))",
                      }}
                    />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Pricing / Engagement Info Grid */}
        <div className="mt-20 grid gap-8 text-left text-sm text-foreground/60 sm:grid-cols-3 border-t border-foreground/15 pt-8 max-w-3xl mx-auto">
          {[
            ["Engagements", "From single sprints to retainers"],
            ["Starting at", "₹10,000 onwards"],
            ["Replies in", "Under 24 hours, always"],
          ].map(([k, v]) => (
            <div key={k} className="pt-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                {k}
              </div>
              <div className="mt-2 text-foreground font-medium">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
