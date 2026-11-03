import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function PricingNote() {
  return (
    <section className="border-y border-[#e0dbd3] py-20 bg-[#ebe7e0]/60">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:items-center">
            <div>
              <p
                className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Pricing Philosophy
              </p>
              <h2
                className="font-headline font-bold tracking-tight text-[#1a1a1f] mb-4"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                }}
              >
                No fixed packages. Only what you actually need.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-[#5a5a65]">
                Every business is different, so every quote is too. We discuss your requirements first during a free consultation, then agree on scope and deliverables together. You only pay for what creates genuine value.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-200 rounded-none text-white shadow-xs"
                style={{ background: "var(--brand)" }}
              >
                Book free consultation →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
