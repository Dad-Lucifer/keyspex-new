"use client";
import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    });
  }, { scope: ref });

  return (
    <section id="process" className="py-24 md:py-36" style={{ background: "var(--tint)" }}>
      <div ref={ref} className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                04 · How we work
              </p>
              <h2
                className="font-extrabold tracking-tight leading-[0.95] text-[var(--ink)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 5vw, 4rem)",
                }}
              >
                Simple, transparent and step by step.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--muted)] leading-relaxed">
              No guesswork. From the first discussion to handover, you know exactly what is happening at each milestone.
            </p>
          </div>
        </Reveal>

        <div className="relative grid gap-0 md:grid-cols-[48px_1fr]">
          {/* Animated GSAP Vertical Scrub Line */}
          <div className="relative hidden md:flex md:flex-col md:items-center">
            {/* Background static line */}
            <div
              className="absolute top-4 bottom-8 w-px"
              style={{ background: "var(--line)" }}
            />
            {/* Animated active scrub line */}
            <div
              className="process-line absolute top-4 bottom-8 w-[2px] origin-top"
              style={{ background: "var(--brand)" }}
            />
          </div>

          <div className="space-y-0">
            {site.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <div
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-6 border-b py-10 transition-colors hover:bg-white/60 md:px-6 rounded-[var(--radius)]"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span
                    className="shrink-0 font-mono text-xs font-bold tracking-[0.18em] text-[var(--brand)]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {step.n}
                  </span>
                  <div className="sm:w-56 shrink-0">
                    <h3
                      className="font-extrabold text-2xl tracking-tight text-[var(--ink)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.step}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--muted)] max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
