"use client";
import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-[#f5f2ed] border-t border-[#e0dbd3]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                06 · FAQ
              </p>
              <h2
                className="font-headline font-bold tracking-tight leading-[0.98] text-[#1a1a1f]"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                }}
              >
                Common questions answered plainly.
              </h2>
              <p className="mt-6 text-base text-[#5a5a65] leading-relaxed max-w-sm">
                Have a specific question not covered here? We discuss everything in detail during our initial consultation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="divide-y divide-[#e0dbd3] border-t border-b border-[#e0dbd3]">
              {site.faq.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="py-2">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="group flex w-full items-baseline justify-between py-6 text-left transition-colors focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`text-xl md:text-2xl font-headline font-bold tracking-tight transition-colors ${
                          isOpen ? "text-[var(--brand)]" : "text-[#1a1a1f] group-hover:text-[var(--brand)]"
                        }`}
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`ml-6 flex size-8 shrink-0 items-center justify-center rounded-none border text-lg font-light transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-[var(--brand)] bg-[var(--brand)] text-white"
                            : "border-[#e0dbd3] text-[#5a5a65] group-hover:border-[#1a1a1f] group-hover:text-[#1a1a1f]"
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-8 pt-1 text-base leading-relaxed text-[#5a5a65] max-w-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
