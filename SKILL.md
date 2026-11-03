---
name: keyspex-frontend
description: Build KeySpex's polished, minimal, high-trust marketing site in Next.js (App Router, TypeScript, Tailwind v4, shadcn/ui, GSAP, Motion/Framer). White/blue/black brand sampled from the real logo, editorial and calm, never "AI slop". Use whenever the user mentions KeySpex, its website, landing page, hero, services pages, navbar, footer, FAQ, contact/CTA, animations, or asks to build, restyle or extend any KeySpex UI or any Next.js section that must match the KeySpex look, even if they don't say "skill".
---

# KeySpex Frontend

KeySpex = **"Custom digital solutions for real businesses."** One partner for websites, business tools, marketing and creative work, for startups, SMBs, local/offline shops and growing brands across India.

Design stance: **credible, clear, calm.** Editorial and sharp (inspired by marktechstudios.com: big type, numbered labels, ticker, list-style services, process line, FAQ, closing CTA) but warmer and more honest, because KeySpex sells trust to shop owners, not swagger to D2C founders. Borrow structure, never their copy or layout pixels.

## 0. Ground truth (read before building)

- **Services/copy**: `/mnt/user-data/uploads/services.md` (or the repo copy) is the only source for services, claims and numbers. Build `content/site.ts` from it (skeleton in section 5).
- **Logo**: `KeySpex_Logo_.png` (K with a diagonal key + "Key" black, "Spex" blue, tagline in spaced caps). It is a PNG on a near-white background: copy to `public/brand/`, ask the user for an SVG/transparent version, and until then **typeset the wordmark in code** (`Key` ink + `Spex` brand, `font-display font-bold tracking-tight`) next to a small inline SVG key mark. Use the PNG only for OG image and favicon source.
- **Hard content rules from services.md**
  - Never promise rankings, enquiry numbers or timelines. Keep the outcomes disclaimer near marketing services.
  - No prices. Pricing = free consultation, then scoped quotes.
  - Store Management System is an **internal tool for offline shops, not an online store**. Say so.
  - Features are "agreed per project scope". No invented stats, clients, testimonials, case studies, awards or "5-day delivery" style claims. If real ones appear later, add them.
  - Phone, email, social handle are still placeholders: keep `// TODO: confirm` and tell the user.

## 1. Stack and setup

```bash
npx shadcn@latest init
npx shadcn@latest add button accordion sheet input textarea sonner
npm i gsap @gsap/react motion zod
```

GSAP (incl. ScrollTrigger) is free in `gsap`. Framer Motion is `motion`: `import { motion } from "motion/react"`.

- Pages/sections are **Server Components**; `"use client"` only on small animated leaves.
- Folders: `components/ui` (shadcn), `components/sections/*`, `components/motion/*`, `lib/gsap.ts`, `content/site.ts`, `app/services/[slug]/page.tsx` (SSG via `generateStaticParams`).
- `next/font`, `next/image`, Metadata API, `Organization` JSON-LD, `sitemap.ts`, `robots.ts`.

## 2. Design system (colors sampled from the logo)

Logo blues measured: ring/key `#0068FE`, wordmark `#0954D3`, deep shaft `#0842B0`; black `#0E0F12`.

```css
/* app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";
:root {
  --paper:#FFFFFF; --ink:#0E0F12;
  --brand:#0A5CF0;        /* primary blue, ≥4.5:1 on white */
  --brand-bright:#0068FE; /* fills, key accents, large shapes only */
  --brand-ink:#0842B0;    /* hover/pressed */
  --tint:#F4F7FF;         /* faint blue wash for one alt section */
  --muted:#5A606B; --line:#E6E9EF; --radius:0.375rem;
  --background:var(--paper); --foreground:var(--ink);
  --primary:var(--brand); --primary-foreground:#fff;
  --muted-foreground:var(--muted); --border:var(--line); --ring:var(--brand);
}
@theme inline {
  --color-paper:var(--paper); --color-ink:var(--ink); --color-brand:var(--brand);
  --color-brand-bright:var(--brand-bright); --color-brand-ink:var(--brand-ink);
  --color-tint:var(--tint); --color-muted:var(--muted); --color-line:var(--line);
  --font-display:var(--font-display); --font-sans:var(--font-body); --font-mono:var(--font-mono);
}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:var(--font-body),system-ui,sans-serif;-webkit-font-smoothing:antialiased}
::selection{background:var(--brand);color:#fff}
@keyframes marquee{to{transform:translateX(-50%)}}
.marquee-track{animation:marquee 36s linear infinite}
@media (prefers-reduced-motion:reduce){.marquee-track{animation:none}}
```

**Type** (`next/font/google`, `display:"swap"`): `Montserrat` 700/800 as `--font-display` (echoes the logo wordmark), `Geist` as `--font-body`, `Geist_Mono` as `--font-mono`.
- H1: `font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(2.75rem,8vw,7.5rem)]`, sentence case, one key phrase in `text-brand`. Reserve uppercase for mono labels.
- Label: `01 · Services` in `font-mono text-xs uppercase tracking-[0.18em] text-muted`.
- Body 16-18px, `max-w-xl`, secondary in `text-muted`.

**Layout**: `max-w-[1280px] mx-auto px-5 md:px-10`, sections `py-24 md:py-36`, left-aligned and asymmetric, hairline `border-line` dividers, no card shadows. One `bg-tint` section and one `bg-ink text-paper` band for rhythm. Blue appears sparingly: CTAs, key phrase, indices, arrows, one hero graphic.

**Buttons**: add `brand` variant to shadcn button (`bg-brand text-white hover:bg-brand-ink`), plus `ink` and `outline`. 48px tall, `rounded-[var(--radius)]`, label + `→`.

## 3. Anti-slop rules

- No purple/pink gradients, glow orbs, blurred blobs, glassmorphism, gradient text, neon shadows.
- No icon-in-circle 3-card grids, no emoji icons, no stock photos or fake dashboards. Visuals = type, the key motif, simple geometric SVG in brand colors, real screenshots when they exist.
- Banned words: *unleash, elevate, seamless, revolutionize, cutting-edge, next-gen, supercharge, empower, synergy.* Write short, concrete, plain sentences ("Know what's in stock. Know what sold.").
- Not centered-everything; one accent color; max two weights per block; no bounce/elastic easing; no parallax on everything; nothing that delays reading.
- Every section must trace to a line in services.md, otherwise cut it.

## 4. Motion system (strict split)

| Use | Tool |
|---|---|
| Hero intro, key-motif draw, scroll-scrubbed process line | **GSAP** |
| Reveal on view, hover/tap, mobile menu, accordion, page presence | **Motion** |
| Ticker, row hover fills | **CSS only** |

Never animate one element with two libraries. Only `transform`/`opacity`. Ease `power3.out` / `[0.22,1,0.36,1]`, 0.6-0.9s, stagger ≤ 0.08s.

```tsx
// lib/gsap.ts
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };
```
```tsx
// components/motion/Provider.tsx (wrap layout children once)
"use client";
import { MotionConfig } from "motion/react";
export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
```
```tsx
// components/motion/Reveal.tsx
"use client";
import { motion } from "motion/react";
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}
```
```tsx
// components/motion/Headline.tsx: masked word rise (GSAP). Pass <em> phrase via `accent`.
"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
export function Headline({ text, accent, className }: { text: string; accent?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".w", { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.06 });
    });
  }, { scope: ref });
  const words = (s: string, cls = "") => s.split(" ").map((w, i) => (
    <span key={cls + i} aria-hidden className="inline-block overflow-hidden align-bottom pr-[0.2em]">
      <span className={`w inline-block ${cls}`}>{w}</span>
    </span>
  ));
  return <h1 ref={ref} aria-label={`${text} ${accent ?? ""}`} className={className}>{words(text)}{accent && words(accent, "text-brand")}</h1>;
}
```
Keep hero text server-rendered and visible (LCP/SEO); only the intro animates after hydration.

```tsx
// Process: scroll-scrubbed vertical line (GSAP)
useGSAP(() => {
  gsap.fromTo(".line", { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top",
    scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: true } });
}, { scope: ref });
```

**Key motif (hero art)**: a large inline SVG echoing the logo: a thick diagonal shaft from lower-left to a ring at upper-right, in `--brand-bright`, with a black block "K" stem beside it. On load, draw it with GSAP (`strokeDashoffset` from path length to 0, 1.2s), then leave static. Cropped off the right edge, `aria-hidden`, hidden below `md` or scaled down. This is the single decorative element on the site.

GSAP rules: always `useGSAP` with `{ scope }` (auto cleanup), never raw `useEffect`; `gsap.matchMedia()` for reduced motion; `ScrollTrigger.refresh()` once if fonts/images shift layout.

```tsx
// components/sections/Marquee.tsx: CSS only, zero JS
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-5" aria-hidden>
      <div className="marquee-track flex w-max gap-10 font-mono text-xs uppercase tracking-[0.18em]">
        {row.map((t, i) => <span key={i} className="flex items-center gap-10">{t}<i className="size-1.5 bg-brand-bright" /></span>)}
      </div>
    </div>
  );
}
```

## 5. Content skeleton (from services.md; keep wording faithful)

```ts
// content/site.ts
export const site = {
  name: "KeySpex",
  tagline: "Custom digital solutions for real businesses",
  hero: { title: "Websites, tools and marketing for", accent: "real businesses.",
    sub: "One digital partner for your website, business tools, marketing and creative work. Built around what you actually need." },
  supports: ["Startups and new businesses", "Small and medium-sized businesses", "Local and offline shops", "Growing and established brands"],
  categories: [
    { id: "A", name: "Website & Business Solutions", line: "Look credible. Stay organised." },
    { id: "B", name: "Digital Visibility & Marketing", line: "Be found. Stay consistent. Stand out." },
    { id: "C", name: "Creative & Content", line: "Look sharp. Tell your story." },
  ],
  services: [ // slug, n, cat, title, forWho, blurb, points[], benefit, cta
    { slug: "business-portfolio-website", n: "01", cat: "A", title: "Business Portfolio Website", forWho: "Businesses that are hard to find, or hard to trust, online.", benefit: "A clear, credible first impression." },
    { slug: "business-dashboard", n: "02", cat: "A", title: "Business Dashboard", forWho: "Businesses whose data is scattered across sheets and notes.", benefit: "Better visibility to support everyday decisions." },
    { slug: "store-management-system", n: "03", cat: "A", title: "Store Management System", note: "Internal tool for offline stores, not an online store.", forWho: "Shop owners who track stock and sales by hand.", benefit: "A clearer picture of your stock and sales." },
    { slug: "google-business-seo", n: "04", cat: "B", title: "Google Business SEO", forWho: "Local businesses with an incomplete or outdated Google listing.", benefit: "A stronger local online presence." },
    { slug: "social-media-marketing", n: "05", cat: "B", title: "Social Media Marketing", forWho: "Brands whose posts look different every time, or stop altogether.", benefit: "Stronger brand recognition over time." },
    { slug: "social-media-campaigns", n: "06", cat: "B", title: "Social Media Campaigns", forWho: "Launches, offers and seasons that deserve more than a single post.", benefit: "A promotion with a plan behind it.", flow: ["Goal", "Plan", "Create", "Launch"] },
    { slug: "graphic-designing", n: "07", cat: "C", title: "Graphic Designing", forWho: "Businesses whose materials look mismatched or unfinished.", benefit: "A polished, cohesive look across your brand." },
    { slug: "video-editing", n: "08", cat: "C", title: "Video Editing", forWho: "Businesses with footage but no polished way to share it.", benefit: "Clear, engaging content for your channels." },
  ], // fill blurb + points[] verbatim from services.md
  process: ["Discuss", "Identify", "Agree", "Execute", "Hand over"], // each with the one-line description from services.md
  why: ["Requirement-based and affordable", "Multiple services, one partner", "Transparent communication"],
  disclaimer: "Outcomes depend on your business, market and agreed scope. KeySpex does not promise specific rankings, enquiry numbers or timelines.",
  contact: { phone: "", email: "", social: "" }, // TODO: confirm
};
```

## 6. Page blueprint (order matters)

1. **Nav**: sticky white, hairline border, wordmark left, links (Services, How we work, Why KeySpex, Contact), one `brand` button "Free consultation". Mobile: shadcn `Sheet`, large type.
2. **Hero**: mono label with tagline, `Headline`, one-sentence sub, buttons ("Get a free consultation" brand + "See services" text link), key motif right.
3. **Marquee**: the 8 service names.
4. **Who we support**: left label, right a 2x2 hairline grid of the 4 audiences plus a line "Every project begins with your requirements, because not every service suits every business."
5. **Services**: three grouped lists (A/B/C), each with its category line as a sticky left label. Rows: `n · title · forWho · →`, hairline separators, hover `bg-ink text-paper`, arrow turns `brand-bright`. Rows link to `/services/[slug]`. The Store Management row carries a small "Internal shop tool" tag.
6. **Be found / Stay consistent / Promote with purpose** (black band): the three marketing principles in large type, blue index numbers.
7. **How we work** (`bg-tint`): 5 steps with scrubbed vertical line.
8. **What to expect + Why KeySpex**: three numbered points, 2-col hairline layout.
9. **Pricing note**: short block: free consultation, then scoped quote. No numbers.
10. **FAQ**: shadcn `Accordion` restyled (border-b only, `+` rotates to `×`). Questions only answerable from services.md (who you work with, how pricing works, what is the Store Management System, do you promise rankings, can you tailor scope). Mark anything else `TODO`.
11. **Closing CTA**: "Let's discuss what your business needs." brand button + contact form (shadcn Input/Textarea, zod, server action, `sonner` toast).
12. **Footer**: wordmark + tagline, links, phone/email/social placeholders, disclaimer line, © year.

**Service detail page** (`/services/[slug]`): label, H1 title, "For:" line, blurb, bullet points as hairline list, benefit in `text-brand`, CTA question line, next/previous service links, Store/Campaign extras (note, flow strip).

```tsx
// Service row (server component)
<li className="group border-b border-line">
  <a href={`/services/${s.slug}`} className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 transition-colors duration-200 md:grid-cols-[4.5rem_1fr_1.4fr_auto] md:py-9 group-hover:bg-ink group-hover:text-paper">
    <span className="font-mono text-xs text-brand group-hover:text-brand-bright">{s.n}</span>
    <h3 className="font-display text-2xl font-bold tracking-tight md:text-4xl">{s.title}</h3>
    <p className="hidden max-w-md text-muted group-hover:text-paper/70 md:block">{s.forWho}</p>
    <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-bright">→</span>
  </a>
</li>
```

## 7. Performance, accessibility, SEO

- Lighthouse ≥ 95 all four. No heavy libs beyond gsap + motion; `next/dynamic` for below-fold GSAP sections.
- `next/image` with sizes; `priority` on hero only. Fonts only via `next/font`.
- Text blue on white uses `--brand` (not `--brand-bright`); visible focus ring `ring-brand`; one `h1`; landmarks; skip link; tap targets ≥ 44px.
- Per-page `metadata` (title/description/OG using the logo). `Organization` JSON-LD with `areaServed: "IN"`.
- Test 360 / 768 / 1440px; no horizontal scroll. Keep copy readable for non-technical shop owners.

## 8. Delivery checklist

- [ ] Colors match the logo; wordmark typeset or real SVG used
- [ ] Every claim traces to services.md; no prices, rankings, stats or fake proof
- [ ] Store Management shown as internal shop tool; disclaimer present near marketing
- [ ] Anti-slop list clean; GSAP and Motion never on the same element; reduced motion honored
- [ ] `npm run build` and `npm run lint` pass; no hydration warnings
- [ ] Tell the user what still needs input: phone, email, social handle, SVG logo, real case studies/testimonials (if any)
