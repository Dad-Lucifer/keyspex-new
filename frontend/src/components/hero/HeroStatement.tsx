"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

/* ─────────────────────────────────────────────
   Counter animation hook
───────────────────────────────────────────── */
function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

/* ─────────────────────────────────────────────
   Stat Card
───────────────────────────────────────────── */
interface StatCardProps {
  target: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

function StatCard({ target, suffix = "", label, sublabel }: StatCardProps) {
  const { count, ref } = useCounter(target, 1200);
  return (
    <div
      ref={ref}
      className="relative flex items-start gap-3.5 sm:gap-4 border px-4 sm:px-5 py-3 sm:py-4"
      style={{ borderColor: "#e5e7eb", background: "#ffffff" }}
    >
      {/* Blue accent bar */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: "#0A5CF0" }}
        aria-hidden="true"
      />
      <div>
        <p
          className="font-headline font-black leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
            color: "#0a0a0f",
          }}
        >
          {count}
          {suffix}
        </p>
        <p
          className="mt-1 font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase"
          style={{ color: "#6b7280", fontFamily: "var(--font-mono)" }}
        >
          {label}
        </p>
        {sublabel && (
          <p
            className="mt-0.5 font-mono text-[8px] sm:text-[9px] tracking-[0.1em] uppercase"
            style={{ color: "#9ca3af", fontFamily: "var(--font-mono)" }}
          >
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Service pill list
───────────────────────────────────────────── */
const SERVICE_PILLS = [
  "Portfolio Website",
  "Business Dashboard",
  "Store Management",
  "Google SEO",
  "Social Marketing",
  "Campaigns",
  "Graphic Design",
  "Video Editing",
];

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function HeroStatement() {
  return (
    <section
      className="w-full border-b"
      style={{ background: "#ffffff", borderColor: "#e5e7eb" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 sm:py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
        {/* ── Left Column ── */}
        <div>
          {/* Eyebrow badge */}
          <Reveal>
            <p
              className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase mb-5 sm:mb-7"
              style={{ color: "#0A5CF0", fontFamily: "var(--font-mono)" }}
            >
              <span className="relative flex size-2 shrink-0">
                <span
                  className="absolute inline-flex size-full animate-ping opacity-70"
                  style={{ background: "#0A5CF0", borderRadius: "9999px" }}
                />
                <span
                  className="relative inline-flex size-2"
                  style={{ background: "#0A5CF0", borderRadius: "9999px" }}
                />
              </span>
              WEBSITES · TOOLS · MARKETING · CREATIVE
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              className="font-headline font-black uppercase leading-[0.96] tracking-tight"
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
                color: "#0a0a0f",
              }}
            >
              ONE DIGITAL PARTNER.{" "}
              <span style={{ color: "#0A5CF0" }}>
                EVERYTHING YOUR BUSINESS NEEDS.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ color: "#6b7280", maxWidth: "38rem" }}
            >
              Websites, business tools, marketing and creative work — built
              around your requirements. Not a package. A partnership.
            </p>
          </Reveal>

          {/* Service pills */}
          <Reveal delay={0.2}>
            <div className="mt-5 sm:mt-7 flex flex-wrap gap-1.5 sm:gap-2">
              {SERVICE_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 border px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase transition-colors"
                  style={{ borderColor: "#e5e7eb", color: "#374151", background: "#f8f9fc" }}
                >
                  <span
                    className="size-1.5 shrink-0"
                    style={{ background: "#0A5CF0", borderRadius: "9999px" }}
                    aria-hidden="true"
                  />
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 active:scale-[0.98] shadow-sm text-center"
                style={{ background: "#0A5CF0", color: "#ffffff" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0842B0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0A5CF0")
                }
              >
                Free consultation →
              </Link>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 border border-[#0a0a0f] text-[#0a0a0f] active:scale-[0.98] text-center"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0a0a0f";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#0a0a0f";
                }}
              >
                See all services
              </a>
            </div>
          </Reveal>

          {/* Free consultation note */}
          <Reveal delay={0.34}>
            <p
              className="mt-4 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase flex flex-wrap items-center gap-x-2 gap-y-1"
              style={{ color: "#9ca3af", fontFamily: "var(--font-mono)" }}
            >
              <span className="text-[#0A5CF0] font-bold">✓ Free consultation</span>
              <span className="opacity-40">·</span>
              <span>Scope agreed before work begins</span>
              <span className="opacity-40">·</span>
              <span>Transparent pricing</span>
            </p>
          </Reveal>
        </div>

        {/* ── Right Column — Stats & Categories (Mobile Optimized) ── */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full mt-4 md:mt-0">
          <Reveal delay={0.1}>
            <div
              className="border px-4 sm:px-5 py-3.5 sm:py-4 mb-1"
              style={{ borderColor: "#e5e7eb", background: "#f8f9fc" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold"
                  style={{ color: "#6b7280", fontFamily: "var(--font-mono)" }}
                >
                  SERVICES AT A GLANCE
                </p>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#0A5CF0] font-bold bg-[#0A5CF0]/10 px-2 py-0.5">
                  8 CAPABILITIES
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {[
                  { cat: "A", name: "WEBSITE & BUSINESS SOLUTIONS", count: 3 },
                  { cat: "B", name: "DIGITAL VISIBILITY & MARKETING", count: 3 },
                  { cat: "C", name: "CREATIVE & CONTENT", count: 2 },
                ].map(({ cat, name, count }) => (
                  <div key={cat} className="flex items-center gap-2 sm:gap-3 py-1 border-b border-[#e5e7eb]/60 last:border-b-0">
                    <span
                      className="text-[10px] sm:text-xs font-black font-mono w-4 sm:w-5 shrink-0"
                      style={{ color: "#0A5CF0" }}
                    >
                      {cat}
                    </span>
                    <span
                      className="font-mono text-[8px] sm:text-[9px] tracking-[0.08em] uppercase flex-1 text-[#374151] truncate"
                    >
                      {name}
                    </span>
                    <span
                      className="font-mono text-[8px] sm:text-[9px] font-bold shrink-0"
                      style={{ color: "#0A5CF0" }}
                    >
                      {count} services
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 sm:gap-4">
            <Reveal delay={0.16}>
              <StatCard target={8} suffix="" label="Services available" sublabel="Across 3 categories" />
            </Reveal>
            <Reveal delay={0.22}>
              <StatCard target={100} suffix="%" label="Free consultation" sublabel="No upfront commitment" />
            </Reveal>
            <Reveal delay={0.28}>
              <StatCard target={1} suffix="" label="Partner for everything" sublabel="Websites · Tools · Marketing" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
