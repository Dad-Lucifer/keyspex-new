"use client";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  useEffect(() => {
    // 1. Auto-select service if ?service=... is present in URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceQuery = params.get("service");
      if (serviceQuery) {
        const matched = site.services.find(
          (s) =>
            s.slug === serviceQuery ||
            s.title.toLowerCase() === serviceQuery.toLowerCase()
        );
        if (matched) {
          setForm((prev) => ({ ...prev, service: matched.title }));
        }
      }
    }

    // 2. Reliable scroll to contact / talk to us section
    const scrollToTarget = () => {
      const hash = window.location.hash;
      if (hash === "#contact" || hash === "#talk-to-us") {
        const target = document.getElementById("contact");
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
        }
      }
    };

    scrollToTarget();
    window.addEventListener("hashchange", scrollToTarget);
    return () => window.removeEventListener("hashchange", scrollToTarget);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("submitting");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || undefined,
          service: form.service.trim() || undefined,
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error?.message ||
            (data?.error?.details
              ? data.error.details.map((d: any) => d.message).join(", ")
              : "Unable to submit inquiry at this moment. Please try again.")
        );
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-24 md:py-36 bg-[#ebe7e0]/60 border-t border-[#e0dbd3] relative"
    >
      <div id="talk-to-us" className="-translate-y-24 scroll-mt-24 pointer-events-none" aria-hidden="true" />
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal>
            <div>
              <p
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                07 · Talk to Us · Start a Project
              </p>
              <h2
                className="mb-6 font-headline font-bold tracking-tight leading-[0.98] text-[#1a1a1f]"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                }}
              >
                Let&apos;s discuss what your business needs.
              </h2>
              <p className="mb-10 max-w-md text-base leading-relaxed text-[#5a5a65]">
                Tell us a little about your business and goals. We&apos;ll schedule a free, no-obligation consultation to map out the right scope and pricing.
              </p>

              <div className="space-y-6 border-t border-[#e0dbd3] pt-8">
                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65] mb-1">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-base font-semibold text-[#1a1a1f] transition-colors hover:text-[var(--brand)]"
                  >
                    {site.contact.email}
                  </a>
                  <span className="ml-2 font-mono text-[10px] text-[#5a5a65]">// TODO: confirm</span>
                </div>

                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65] mb-1">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                    className="text-base font-semibold text-[#1a1a1f] transition-colors hover:text-[var(--brand)]"
                  >
                    {site.contact.phone}
                  </a>
                  <span className="ml-2 font-mono text-[10px] text-[#5a5a65]">// TODO: confirm</span>
                </div>

                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65] mb-1">
                    Location & Service Area
                  </span>
                  <p className="text-sm text-[#1a1a1f]">
                    Operating across India · Remote-first partner
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-none border border-[#e0dbd3] bg-[#f5f2ed] p-8 md:p-12 shadow-2xs">
              {status === "success" ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <div
                    className="mb-4 flex size-14 items-center justify-center rounded-none text-2xl text-white font-bold"
                    style={{ background: "var(--brand)" }}
                  >
                    ✓
                  </div>
                  <h3
                    className="mb-2 font-headline font-bold text-2xl tracking-tight text-[#1a1a1f]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Consultation Request Received
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-[#5a5a65]">
                    Thank you. We will review your requirements and reach out to {form.email || "you"} within 24 hours to schedule our call.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", phone: "", service: "", message: "" });
                    }}
                    className="mt-8 text-xs font-mono uppercase tracking-[0.18em] text-[var(--brand)] underline underline-offset-4"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="border border-red-300 bg-red-50 p-4 font-mono text-xs text-red-700">
                      ⚠ {errorMessage}
                    </div>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]"
                        placeholder="+91 ..."
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                      >
                        Primary Need
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]"
                      >
                        <option value="">Select a service category</option>
                        {site.services.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.n} · {s.title}
                          </option>
                        ))}
                        <option value="multiple">Multiple services / Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                    >
                      Project Notes *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]"
                      placeholder="Tell us about your business and what you need..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex h-12 w-full items-center justify-center rounded-none text-sm font-semibold uppercase tracking-wider text-white transition-all hover:opacity-95 disabled:opacity-50"
                    style={{ background: "var(--brand)" }}
                  >
                    {status === "submitting" ? "Sending Request..." : "Request Free Consultation →"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
