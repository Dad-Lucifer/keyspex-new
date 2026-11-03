"use client";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { navLinks } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex items-center gap-2 rounded px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#1a1a1f] hover:bg-[#ebe7e0] md:hidden"
        aria-label="Open mobile navigation menu"
      >
        <span>Menu</span>
        <span className="text-base leading-none">☰</span>
      </SheetTrigger>
      <SheetContent side="top" className="h-dvh bg-[#f5f2ed] p-6 sm:p-10 flex flex-col justify-between">
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <div className="flex items-center justify-between border-b border-[#e0dbd3] pb-6">
          <BrandLogo />
        </div>

        <nav className="flex flex-col gap-6 py-8" aria-label="Mobile Primary">
          {navLinks.map((item: { label: string; href: string }, idx: number) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 font-headline text-3xl font-bold uppercase tracking-tight text-[#1a1a1f] hover:text-[var(--brand)] transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              <span className="font-mono text-xs text-[#5a5a65]">0{idx + 1}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#e0dbd3] pt-6">
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="flex h-12 w-full items-center justify-center rounded-none text-sm font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--brand)" }}
          >
            Talk to us →
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
