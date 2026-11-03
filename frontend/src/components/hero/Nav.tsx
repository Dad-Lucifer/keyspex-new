"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#f5f2ed]/90 backdrop-blur-md border-b border-[#e0dbd3] shadow-2xs"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-6 lg:px-10 flex items-center justify-between h-16 max-w-7xl">
          {/* Brand Logo: transparent white/blue lockup on the dark hero; existing mark + wordmark everywhere else */}
          {isHero ? (
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90 py-1"
              aria-label="KeySpex home"
            >
              <Image
                src="/brand/black.png"
                alt="KeySpex"
                width={180}
                height={66}
                className="h-10 sm:h-11 md:h-12 lg:h-[52px] w-auto object-contain"
                priority
              />
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-3 font-headline text-2xl lg:text-3xl font-bold tracking-tight text-[#1a1a1f] transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-headline)" }}
              aria-label="KeySpex home"
            >
              <div className="relative size-7 shrink-0">
                <Image
                  src="/brand/icon.png"
                  alt="KeySpex mark"
                  fill
                  className="object-contain"
                  sizes="28px"
                />
              </div>
              <span>
                KEYSPEX<span style={{ color: "var(--brand)" }}>.</span>
              </span>
            </Link>
          )}

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#5a5a65] hover:text-[#1a1a1f] transition-colors tracking-wide font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Right CTA Button - Sharp rectangular rounded-none */}
            <Link
              href="/#contact"
              className="text-sm font-medium tracking-wide uppercase px-5 py-2.5 bg-[#1a1a1f] text-[#f5f2ed] hover:bg-[#1a1a1f]/80 transition-colors rounded-none"
            >
              Talk to us
            </Link>
          </div>

          {/* Mobile Hamburger Button with 3-bar transition */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-3 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[#1a1a1f] transition-transform duration-200 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1a1a1f] transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1a1a1f] transition-transform duration-200 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#f5f2ed] pt-24 px-6 pb-10 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            {navLinks.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1f] hover:text-[var(--brand)] transition-colors flex items-baseline gap-4"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                <span className="font-mono text-xs text-[#5a5a65]">0{idx + 1}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-[#e0dbd3] pt-6">
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-4 text-sm font-semibold tracking-wide uppercase bg-[#1a1a1f] text-[#f5f2ed] rounded-none shadow-sm"
            >
              Talk to us →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
