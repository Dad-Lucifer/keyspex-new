---
name: keyspex-hero
description: Build the KeySpex homepage hero (nav + eyebrow + giant uppercase headline + subcopy + CTAs + service ticker) in Next.js, modelled on the hero of marktechstudios.com but with KeySpex's white/blue/black brand and honest copy. Use whenever the user asks for the KeySpex hero, landing top section, first fold, header/navbar, headline animation, service ticker/marquee, or says "like Marktech" / "like the reference site" for the top of the page, even without saying "skill". Stack: Next.js App Router, TypeScript, Tailwind v4, shadcn/ui, GSAP, Motion.
---

# KeySpex Hero

Recreate the **anatomy and feel** of the Marktech Studios hero for KeySpex. Replicate structure, scale, rhythm and motion. Do **not** copy their wording, wordmark or scarcity claims. KeySpex has no AI-studio positioning and no "only N spots open" claim, so never write one.

**Known from the reference** (read from the live page text): slim nav (wordmark left; Services, About, Work, Blogs; "Talk to us" CTA right) → small eyebrow line → very large all-caps headline → one sentence of subcopy → two actions (solid "Let's work" + text link "See what we do") → full-width all-caps ticker of service names separated by `/`.
**Not verifiable** (no rendered CSS available): exact font, px sizes, spacing, colors. The values below are tuned best-guesses. If the user can send a screenshot, compare and adjust spacing/scale only.

## 0. Inputs

- Brand colors (sampled from `KeySpex_Logo_.png`): blue `#0A5CF0` (text/CTA), bright `#0068FE` (fills), deep `#0842B0` (hover), ink `#0E0F12`, paper `#FFFFFF`.
- Content truth: `services.md`. Tagline from the logo: "Custom digital solutions for real businesses". No prices, rankings, stats or invented proof.
- If `keyspex-frontend` tokens already exist in `globals.css`, reuse them. Otherwise add section 1.

## 1. Setup (skip what exists)

```bash
npx shadcn@latest add button sheet
npm i gsap @gsap/react
```
```css
/* app/globals.css */
:root{--paper:#fff;--ink:#0E0F12;--brand:#0A5CF0;--brand-bright:#0068FE;--brand-ink:#0842B0;--muted:#5A606B;--line:#E6E9EF}
@theme inline{--color-paper:var(--paper);--color-ink:var(--ink);--color-brand:var(--brand);--color-brand-bright:var(--brand-bright);--color-brand-ink:var(--brand-ink);--color-muted:var(--muted);--color-line:var(--line);--font-display:var(--font-display);--font-mono:var(--font-mono)}
::selection{background:var(--brand);color:#fff}

/* ticker: CSS only */
@keyframes marquee{to{transform:translateX(-50%)}}
.marquee-track{animation:marquee 38s linear infinite}
/* hero intro: hidden only while pending, with a no-JS/failsafe reveal */
@keyframes hero-failsafe{to{opacity:1;transform:none}}
.hero-pending .w{transform:translateY(110%)}
.hero-pending [data-eyebrow],.hero-pending [data-fade],.hero-pending [data-ticker]{opacity:0}
.hero-pending .w,.hero-pending [data-eyebrow],.hero-pending [data-fade],.hero-pending [data-ticker]{animation:hero-failsafe .01s 2.5s forwards}
@media (prefers-reduced-motion:reduce){.marquee-track{animation:none}}
```
`app/layout.tsx`: `Montserrat` (800, `--font-display`), `Geist` (`--font-body`), `Geist_Mono` (`--font-mono`) via `next/font/google`, `display:"swap"`, variables on `<html>`.

```ts
// lib/gsap.ts
"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
export { gsap, useGSAP };
```

## 2. Layout spec (desktop 1440)

- `<section>` is `min-h-[100svh] flex flex-col bg-paper`, nav on top, content block pushed to the lower-middle (`flex-1 flex flex-col justify-center`), ticker pinned to the bottom edge.
- Container: `max-w-[1360px] mx-auto px-5 md:px-10`.
- **Eyebrow**: mono 12px uppercase, tracking `0.18em`, with a small pulsing blue square. Margin-bottom 28-40px.
- **Headline**: Montserrat 800, **uppercase**, `tracking-[-0.045em]`, `leading-[0.92]`, `text-[clamp(2.5rem,7.4vw,7.25rem)]`, max 3-4 lines, last phrase in `text-brand`. Word-level mask reveal.
- **Subcopy**: 17-20px, `text-muted`, `max-w-xl`, 32px below headline.
- **Actions**: solid brand button + text link with arrow, 28px below subcopy. On `md+`, subcopy left and actions right on one baseline row (`grid md:grid-cols-[1fr_auto] items-end gap-8`).
- **Ticker**: `border-y border-line`, 18-20px vertical padding, mono 12-13px uppercase, items separated by a blue `/`, duplicated once for a seamless loop.
- Mobile (<640): headline `clamp` floor 2.5rem, actions stack full-width, nav collapses to `Sheet`, ticker stays.

## 3. Copy (KeySpex, truthful)

- Eyebrow: `Custom digital solutions for real businesses · Free consultation`
- **Headline (default)**: `WEBSITES, TOOLS & MARKETING FOR` + accent `REAL BUSINESSES.`
  - Alt A: `YOUR BUSINESS DESERVES A STRONGER` + `DIGITAL PRESENCE.`
  - Alt B: `ONE PARTNER FOR YOUR` + `WEBSITE, TOOLS & MARKETING.`
- Sub: `Websites, business tools, marketing and creative work from one digital partner. Shaped around what your business actually needs.`
- Primary CTA: `Get a free consultation` → `/contact`. Secondary: `See what we do` → `#services`.
- Ticker (from services.md): `BUSINESS PORTFOLIO WEBSITE / BUSINESS DASHBOARD / STORE MANAGEMENT SYSTEM / GOOGLE BUSINESS SEO / SOCIAL MEDIA MARKETING / SOCIAL MEDIA CAMPAIGNS / GRAPHIC DESIGNING / VIDEO EDITING`
- Nav: `Services · About · How we work · Contact` + button `Talk to us`. Do not link pages that don't exist (no Blogs/Work yet).

## 4. Components

```tsx
// components/hero/Nav.tsx (server)
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
export const links = [["Services","/#services"],["About","/#about"],["How we work","/#process"],["Contact","/contact"]] as const;
export function Wordmark() {
  return <Link href="/" className="font-display text-xl font-extrabold tracking-tight" aria-label="KeySpex home">Key<span className="text-brand">Spex</span></Link>;
}
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 md:px-10">
        <Wordmark />
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          {links.map(([l, h]) => <Link key={h} href={h} className="text-ink/70 transition-colors hover:text-brand">{l}</Link>)}
          <Button asChild className="rounded-[4px] bg-brand px-5 text-white hover:bg-brand-ink"><Link href="/contact">Talk to us</Link></Button>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
```
```tsx
// components/hero/MobileNav.tsx
"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
const links = [["Services","/#services"],["About","/#about"],["How we work","/#process"],["Contact","/contact"]];
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="font-mono text-xs uppercase tracking-[0.18em] md:hidden" aria-label="Open menu">Menu</SheetTrigger>
      <SheetContent side="top" className="h-dvh bg-paper">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav className="mt-16 flex flex-col gap-4 px-2">
          {links.map(([l, h]) => <Link key={h} href={h} className="font-display text-4xl font-extrabold uppercase tracking-tight">{l}</Link>)}
          <Link href="/contact" className="mt-6 bg-brand px-6 py-4 text-center text-white">Talk to us →</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```
```tsx
// components/hero/Ticker.tsx (server, zero JS)
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div data-ticker className="overflow-hidden border-y border-line py-5" aria-hidden>
      <div className="marquee-track flex w-max font-mono text-xs uppercase tracking-[0.18em] text-ink">
        {row.map((t, i) => <span key={i} className="flex items-center">{t}<span className="mx-6 text-brand-bright">/</span></span>)}
      </div>
    </div>
  );
}
```
```tsx
// components/hero/Hero.tsx
"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = { eyebrow: string; title: string; accent: string; sub: string; children?: React.ReactNode };

export function Hero({ eyebrow, title, accent, sub, children }: Props) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.current?.classList.remove("hero-pending");
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from("[data-eyebrow]", { y: 12, autoAlpha: 0, duration: 0.6 })
        .from(".w", { yPercent: 110, duration: 1, stagger: 0.07 }, "-=0.3")
        .from("[data-fade]", { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .from("[data-ticker]", { autoAlpha: 0, duration: 0.8 }, "-=0.4");
    });
    mm.add("(prefers-reduced-motion: reduce)", () => root.current?.classList.remove("hero-pending"));
  }, { scope: root });

  const words = (s: string, cls = "") =>
    s.split(" ").map((w, i) => (
      <span key={cls + i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom pr-[0.22em]">
        <span className={`w inline-block ${cls}`}>{w}</span>
      </span>
    ));

  return (
    <section ref={root} className="hero-pending flex min-h-[100svh] flex-col">
      <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col justify-center px-5 py-16 md:px-10">
        <p data-eyebrow className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted md:mb-10">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping bg-brand-bright opacity-60" /><span className="relative inline-flex size-2 bg-brand-bright" /></span>
          {eyebrow}
        </p>
        <h1 aria-label={`${title} ${accent}`}
          className="font-display text-[clamp(2.5rem,7.4vw,7.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em]">
          {words(title)}{words(accent, "text-brand")}
        </h1>
        <div className="mt-8 grid items-end gap-8 md:mt-12 md:grid-cols-[1fr_auto]">
          <p data-fade className="max-w-xl text-[17px] leading-relaxed text-muted md:text-xl">{sub}</p>
          <div data-fade className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link href="/contact" className="inline-flex h-12 items-center justify-center bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-ink">Get a free consultation →</Link>
            <a href="#services" className="group inline-flex items-center gap-2 text-sm font-semibold">See what we do <span className="transition-transform group-hover:translate-y-0.5">↓</span></a>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
```
```tsx
// app/page.tsx
import { Nav } from "@/components/hero/Nav";
import { Hero } from "@/components/hero/Hero";
import { Ticker } from "@/components/hero/Ticker";
const services = ["Business Portfolio Website","Business Dashboard","Store Management System","Google Business SEO","Social Media Marketing","Social Media Campaigns","Graphic Designing","Video Editing"].map(s => s.toUpperCase());

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero eyebrow="Custom digital solutions for real businesses · Free consultation"
          title="WEBSITES, TOOLS & MARKETING FOR" accent="REAL BUSINESSES."
          sub="Websites, business tools, marketing and creative work from one digital partner. Shaped around what your business actually needs.">
          <Ticker items={services} />
        </Hero>
        <section id="services" />
      </main>
    </>
  );
}
```
Add `<noscript><style>.hero-pending *{opacity:1!important;transform:none!important;animation:none!important}</style></noscript>` in `layout.tsx` head.

## 5. Rules

- Only GSAP animates the hero (one timeline); the ticker and hover states are CSS. Don't add Motion here.
- Hero is type-only like the reference: **no** images, orbs, gradients, mockups or illustrations unless the user asks. Optional later: the logo key motif cropped at the right edge, drawn once with `strokeDashoffset`.
- Only animate `transform`/`opacity`. Intro total ≤ 2s. No scroll-jacking in the hero.
- Keep a single `h1`. Headline uses `aria-label` so screen readers don't read split words.
- Banned words: unleash, elevate, seamless, revolutionize, cutting-edge, supercharge, empower. No AI claims, no countdown/scarcity, no fake stats.
- Blue text on white uses `--brand`, never `--brand-bright`.

## 6. Done checklist

- [ ] Order: nav → eyebrow → headline → sub + CTAs → ticker, full viewport height
- [ ] Headline fits 3-4 lines at 360 / 768 / 1440 with no overflow or clipped descenders
- [ ] Intro plays once, reduced-motion and no-JS show everything immediately
- [ ] Lighthouse ≥ 95, no CLS from the font swap, no hydration warnings
- [ ] Nav links only point to pages that exist; contact placeholders flagged to the user
- [ ] Tell the user what was inferred (font, sizes, spacing) and offer to tune from a screenshot
