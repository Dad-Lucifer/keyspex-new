import Link from "next/link";
import Image from "next/image";
import { site, navLinks } from "@/content/site";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-[#e0dbd3] bg-[#f5f2ed] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr_1.2fr]">
          {/* Brand Info */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-headline text-2xl font-bold tracking-tight text-[#1a1a1f] mb-4"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              <div className="relative size-7 shrink-0">
                <Image
                  src="/brand/icon.png"
                  alt="KeySpex"
                  fill
                  className="object-contain"
                  sizes="28px"
                />
              </div>
              <span>
                KEYSPEX<span style={{ color: "var(--brand)" }}>.</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#5a5a65]">
              {site.tagline}. Digital tools, websites, marketing and creative work for businesses across India.
            </p>
            <div className="space-y-1 text-xs text-[#5a5a65] font-mono">
              <p>Email: {site.contact.email} <span className="text-[10px] text-[#5a5a65]">// TODO: confirm</span></p>
              <p>Phone: {site.contact.phone} <span className="text-[10px] text-[#5a5a65]">// TODO: confirm</span></p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <p
              className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#1a1a1f] transition-colors hover:text-[var(--brand)] font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Core Services Links */}
          <div>
            <p
              className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Services
            </p>
            <nav className="flex flex-col gap-2.5">
              {site.services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="text-sm text-[#5a5a65] transition-colors hover:text-[var(--brand)]"
                >
                  <span className="font-mono text-xs text-[var(--brand)] mr-2">{s.n}</span>
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom legal line & disclaimer */}
        <div
          className="mt-16 flex flex-col gap-6 border-t border-[#e0dbd3] pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-mono text-xs text-[#5a5a65]" style={{ fontFamily: "var(--font-mono)" }}>
            © {currentYear} KeySpex. All rights reserved.
          </p>
          <p className="max-w-xl font-mono text-xs leading-relaxed text-[#5a5a65]" style={{ fontFamily: "var(--font-mono)" }}>
            {site.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
