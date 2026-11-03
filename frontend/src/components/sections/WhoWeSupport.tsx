import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function WhoWeSupport() {
  return (
    <section id="about" className="py-24 md:py-36 border-t border-[#e0dbd3] bg-[#ebe7e0]/50">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_2.2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                01 · Who we work with
              </p>
              <h2
                className="font-headline font-bold tracking-tight leading-[0.98] text-[#1a1a1f]"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                }}
              >
                Built for <span style={{ color: "var(--brand)" }}>real businesses.</span>
              </h2>
              <p className="mt-6 text-base text-[#5a5a65] leading-relaxed max-w-sm">
                Every project begins with your requirements, because not every service suits every business.
              </p>
            </div>
          </Reveal>

          <div>
            <div className="grid grid-cols-1 gap-px bg-[#e0dbd3] sm:grid-cols-2 border border-[#e0dbd3]">
              {site.supports.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <div className="flex h-full flex-col justify-between bg-[#f5f2ed] p-8 md:p-10 transition-colors hover:bg-white">
                    <div>
                      <span
                        className="mb-4 block font-mono text-xs uppercase tracking-[0.18em] text-[var(--brand)] font-bold"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {s.n}
                      </span>
                      <h3
                        className="font-headline font-bold text-xl md:text-2xl tracking-tight text-[#1a1a1f] mb-3"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#5a5a65]">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35}>
              <div className="mt-8 border-l-2 pl-6 py-2 border-[var(--brand)]">
                <p className="text-sm font-medium text-[#1a1a1f]">
                  Whether you are launching your first website or modernising your store stock management, we tailor our scope to what matters most right now.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
