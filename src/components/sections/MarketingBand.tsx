import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function MarketingBand() {
  return (
    <section className="py-24 md:py-36" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="mb-14 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
            <p
              className="font-mono text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.4)" }}
            >
              03 · Marketing Principles
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--brand-bright)] font-mono">
              Digital Visibility Framework
            </p>
          </div>
        </Reveal>

        <div className="grid gap-0 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          {site.marketingPrinciples.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <div
                className="group flex flex-col gap-4 border-b py-12 transition-colors duration-200 md:flex-row md:items-baseline md:gap-16 hover:bg-white/[0.02]"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <span
                  className="shrink-0 font-mono text-sm font-semibold tracking-[0.18em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--brand-bright)" }}
                >
                  {p.n}
                </span>
                <h3
                  className="font-extrabold uppercase tracking-tight leading-[0.95]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 5.5vw, 5.25rem)",
                    color: "var(--paper)",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="max-w-sm text-sm leading-relaxed md:ml-auto md:text-base"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
