import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function WhyKeySpex() {
  return (
    <section id="why" className="py-24 md:py-36 bg-white border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.8fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                05 · Why KeySpex
              </p>
              <h2
                className="font-extrabold tracking-tight leading-[0.95] text-[var(--ink)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                }}
              >
                One partner. Clear communication. Honest scope.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[var(--muted)] max-w-sm">
                We bridge the gap between technical engineering, business operation tools, and creative digital marketing.
              </p>
            </div>
          </Reveal>

          <div className="space-y-0">
            {site.why.map((w, i) => (
              <Reveal key={w.n} delay={i * 0.1}>
                <div
                  className="border-b py-10 transition-colors hover:bg-[var(--tint)] px-4 md:px-6 rounded-[var(--radius)]"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span
                    className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-[var(--brand)] font-bold"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {w.n}
                  </span>
                  <h3
                    className="mb-3 font-extrabold text-xl md:text-2xl tracking-tight text-[var(--ink)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {w.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)] max-w-xl">
                    {w.desc}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.4}>
              <div className="mt-12 rounded-[var(--radius)] border p-6 bg-[var(--tint)]" style={{ borderColor: "var(--line)" }}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
                  Commitment to Transparency
                </p>
                <p className="text-xs leading-relaxed text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                  {site.disclaimer}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
