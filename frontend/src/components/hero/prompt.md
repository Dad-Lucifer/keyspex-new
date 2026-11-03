# TASK
Build a full-width, auto-playing, infinitely looping "hero reel" in my Next.js project (App Router, TypeScript, Tailwind CSS, GSAP). It is a single hero stage that cycles through 11 scenes on one master timeline of ~27.5 s, then loops seamlessly. No scroll dependency. The stage is below a fixed nav, and the next page section peeks ~10px below the stage.

Use GSAP (`gsap` + `@gsap/react` `useGSAP`) with ONE master timeline (`repeat: -1`). Each scene is its own component that exposes a `build(tl, startTime)` function, so timing is controlled in a single place. Everything must be responsive and cleaned up on unmount.

# DESIGN TOKENS
- ink: #1a1b1d (dark scenes, text on light)
- paper: #f3f2ed (light scenes, nav bg)
- paper-2: #eae7e0 (Logo scene bg)
- orange: #da562f (accent, orange scenes)
- sage: ~#6e9680 (diagram accents on dark/light)
- muted text on light: ~#5b5b57; muted text on dark: ~#8d8d89
- Headline font: heavy grotesk, weight 800, uppercase, letter-spacing -0.02em, line-height 1.0. Closest match: "Archivo" (width ~100-112) via next/font/google. Easy to swap.
- Label/eyebrow font: "Space Grotesk" 500, uppercase, letter-spacing 0.22em, 11-13px.
- Italic serif accent: "Instrument Serif" italic (for the word "humans").
- Reference layout width is 1400px. Unit "vw" below is relative to that. Left content padding = 7.1vw. Hero headline ≈ 9.2vw. Section titles ≈ 8vw. Use clamp() with sensible mobile minimums.
- Light scenes and the dark hero have a very faint 1px grid overlay (rgba(0,0,0,.04) on light, rgba(255,255,255,.04) on dark, ~60-80px cells). It is clearly visible in the hero and the final two scenes.

# PERSISTENT NAV (always visible, not part of the loop)
Height ≈ 4.7vw, bg paper. Left: wordmark "MARKTECH" in heavy grotesk with an orange period. Right: links "Services, About, Work, Blogs" (13px, muted) and a "TALK TO US" button (ink bg, paper text, 12px bold, square corners, ~8x16px padding).

# SCENE TRANSITIONS (use these consistently)
- Dark → light and light → dark: "panel wipe". The outgoing panel is clipped from the right edge toward the left (clip-path inset right → 100%) over ~0.35 s, power3.inOut, revealing the incoming scene already laid out underneath.
- Orange scenes: the orange panel wipes vertically (top edge moves down, revealing the beige page behind) over ~0.35 s when leaving.
- Between "Creative Production" → "Custom Software" and "Built by AI" → "MARKTECH": a ~0.3 s cross-fade/dip instead of a wipe.
- Titles on incoming dark scenes first appear in dim gray (#c9c9c6, ~70% opacity) for ~0.25 s, then snap to full white. This gives a "wake-up" feel.

# TIMELINE (seconds, from loop start)

## S1 — 0.00–2.70 | Hero, dark (#1a1b1d)
Headline, 3 lines, left aligned, vertically centred slightly above middle:
"YOUR FEED" / "IS ASLEEP" + orange period / "WAKE IT UP." (entire line orange, with orange period).
- 0.00: "YOUR FEED" types/reveals in from the left (clip-path left→right, 0.3 s), dim gray → paper-white.
- 0.35: "IS ASLEEP" reveals, then the orange dot pops (scale 0→1, back.out).
- 0.70: "WAKE IT UP." reveals in orange.
- 1.00–1.60: strikethrough chips fade in at staggered positions, small mono caps with a 1px orange line through them, muted red-gray color: "BEIGE CREATIVES" (above headline, left), "STOCK PHOTOS" (right, upper), "RECYCLED TRENDS" (right, middle), "SAME THREE HOOKS" (right, lower), "TEMPLATE ADS" (bottom, centre-left). The strike line draws left→right (scaleX 0→1).
- 1.60: bottom-left micro label "+ [ DIAGNOSIS : BORING ]" fades in. Far right vertical text (rotated 90°) "WAKE UP · WAKE UP · WAKE UP" fades in.
- Hold until 2.35, then panel wipe to S2.

## S2 — 2.70–5.00 | "01 / WHAT WE DO" — CREATIVE PRODUCTION, light (paper)
- Eyebrow "01 / WHAT WE DO" (muted), title in 2 lines "CREATIVE / PRODUCTION" in ink (vertical mask reveal: each line slides up from a clipped container, 0.4 s, stagger 0.1).
- Subtitle "STATIC IMAGES + VIDEO, CAMPAIGN-READY" (small caps, tracking 0.22em, muted).
- Right side (x ≈ 70–92vw): label "PROMPT_01 · GENERATING" (top, small caps). Below it an ASCII-art silhouette (a stylised plant/figure) built from the characters # * = : @ . and scattered dots, colored in muted terracotta (#a0594a at ~70% opacity). Animate as an image "being generated": characters appear row by row from top to bottom (~1.6 s), with scattered noise dots flickering. Render on <canvas> or as a monospace <pre> (font-size ~11px, line-height 1). Fade out all of S2 from 4.6 to 5.0.

## S3 — 5.00–7.20 | "02" — CUSTOM SOFTWARE, dark
- Eyebrow "02" in orange. Title "CUSTOM / SOFTWARE" (paper-white, with the gray→white wake-up). Subtitle "TOOLS AND DASHBOARDS BUILT FOR YOUR WORKFLOW".
- Right-side UI diagram: a 1px outlined box labelled "MODULE_B43" with a 5-segment mini bar (green, orange, green, gray, gray) that fills sequentially; a green "</>" glyph (top right, sage); an 11×2 dot grid (gray dots with 3-4 random orange dots, twinkling); "[ BUILD : OK ]" and "SHIP → LIVE" right-aligned small caps; a segmented progress track (3 gray bars + a small orange marker at the end) whose marker slides to the right end; a 1px divider line; "YOUR STACK · YOUR RULES" caption.
- Elements stagger in 5.4→6.3. Hold. Wipe at 7.0.

## S4 — 7.20–9.40 | "03" — SEO / AEO, orange (#da562f)
- Title in ink, "SEO / AI" first, then the "I" morphs to "EO" so it reads "SEO / AEO" at ~7.5 s (quick text swap with a brief slide). Eyebrow "03" (ink). Subtitle "FOUND ON GOOGLE. CITED BY AI."
- Right: 8-direction compass/radar of thin ink arrows (1.5px lines with filled arrowheads) from a small central filled square (~10px). Draw the arrows out radially over 0.7 s (stroke-dashoffset), staggered clockwise. Labels at the 4 cardinals in small caps: GOOGLE (top), CHATGPT (right), PERPLEXITY (bottom), GEMINI (left).
- A thin, semi-transparent red line (radar sweep) rotates about the centre briefly at 8.0–8.6 s.
- 9.05–9.40: vertical wipe out (beige reveals from the top).

## S5 — 9.40–11.65 | "04" — LOGO ANIMATIONS, paper-2 (#eae7e0)
- Eyebrow "04". Title "LOGO / ANIMATIONS". Subtitle "YOUR MARK, IN MOTION."
- Right: an orange square (~7vw) inside a 1px dotted bounding box with small square handles at TL and BR corners. Callout lines: "ANCHOR" (top right, with a horizontal rule), "SCALE" (left, with a rule), "BASELINE LOCKED" (below). The orange square scales from ~100% down to ~65% then eases back (elastic-ish, 0.8 s, yoyo once) while the dotted frame stays fixed.

## S6 — 11.65–13.60 | "05" — WEBSITES, dark
- Eyebrow "05" in orange. Title "WEBSITES" on a single line (white). Subtitle "FAST, SHARP, BUILT TO CONVERT".
- Right: a wireframe browser. Outlined bar with 3 dots (first orange, other two gray); beneath it an outlined panel containing a white bar and an orange button; beneath that three outlined cards that each fill with a gray (#3a3b3d) background one after another (0.2 s stagger, ~12.3–12.9 s). Caption "WIREFRAME → LIVE IN DAYS".
- Wipe out at 13.4.

## S7 — 13.60–16.00 | "06" — AUTOMATIONS, light
- Eyebrow "06". Title "AUTOMATIONS" (one line, wide, ink) slides up from a mask. A 3px-high × ~17vw-wide orange bar draws under it (scaleX 0→1 from left). Subtitle "THE UNSEXY STUFF THAT MAKES EVERYTHING ELSE POSSIBLE".
- Right: label "PIPELINE_01 · ALWAYS ON". Three outlined squares (sage border, #e3ebe4 fill, inner solid sage square) connected by 1.5px sage lines, labelled TRIGGER, GENERATE, PUBLISH. A small orange dot travels along the line from TRIGGER → GENERATE → PUBLISH (14.0–14.9 s). On arrival, the PUBLISH inner square turns orange and three small orange-outlined squares pop above it (stagger 0.08 s, back.out).

## S8 — 16.00–19.50 | PROOF (image marquee), dark
- Full-stage layout: top image row, a middle band, bottom image row.
- Top row: images ~16vw wide, aspect ~1.55, gap 1.2vw, scrolling continuously LEFT. Bottom row: slightly taller images, scrolling RIGHT, ~same speed (~120px/s). Rows bleed off both edges.
- Middle band: 1px orange hairlines at top and bottom, containing "PROOF" (heavy grotesk, paper-white, ~4.5vw), an orange filled square, "OUTPUT SPEAKS FOR ITSELF" (small caps, tracking 0.3em) on the left; right-aligned two lines of micro text "SELECTED WORK — DRINK ANOTHR + ORGANIC SMOKES" / "ARCHIVE_01 · REAL CLIENT OUTPUT".
- Images in my recording are client work (beverage cans, a red vape bottle, a poster). Use placeholder images via next/image from /public/proof/*.jpg (I will supply my own). 6-8 per row, duplicated for seamless infinite scrolling.
- 16.0–16.3 the rows slide in from opposite sides; 19.2 wipe out to orange.

## S9 — 19.50–21.90 | BUILT BY AI, orange
- Small solid ink square (~1vw) at the top-left above the text.
- Text: "BUILT BY AI." / "DIRECTED BY *humans*." Heavy grotesk in ink; the word "humans" is Instrument Serif italic, larger optical size, with an ink period. Mask-reveal line by line.
- Giant ghost "AI" at the top right, bleeding off the edge, color rgba(0,0,0,.08), ~28vw.
- Vertical rotated micro text on the right of the headline: "HUMAN IN THE LOOP · ALWAYS".
- At ~20.3 a stamp badge appears bottom-right with a stamp-in animation (scale 1.4 → 1, rotate -4° → 0°, opacity 0 → 1, 0.25 s): 1.5px ink outline with perforated (dashed/stamp-edge) top and bottom borders, a 4-point star icon on the left, text "RESTRICTED TO" (tiny) over "BOLD BRANDS ONLY" (bold, small caps).
- 21.6–21.9 cross-fade to paper.

## S10 — 22.00–24.00 | MARKTECH wordmark, paper + grid
- Visible grid background (lines rgba(0,0,0,.05)).
- 22.0: "MARKTECH" (very large, ~13vw, ink, heavy grotesk) types in letter by letter (each letter fades from gray 0.05 s stagger).
- 22.7: orange dot pops after the H (scale 0→1, back.out).
- 23.0: an orange horizontal line (~6vw wide, 2px) grows under the wordmark, then the tagline "GO AHEAD. SCROLL." (small caps, tracking 0.3em, muted) fades in below.
- 23.3–23.7: corner labels fade in: top-left "+" crosshair then "AI MARKETING STUDIO"; top-right globe icon + "INDIA → GLOBAL"; bottom micro text line (very faint, small).
- 23.8: wordmark and labels fade to paper (clean empty grid frame at ~24.0).

## S11 — 24.00–27.40 | "FOR D2C BRANDS DONE WITH AVERAGE", paper + grid
- Eyebrow centred above: "FOR D2C BRANDS DONE WITH" (small caps, tracking 0.3em).
- "AVERAGE" centred, ~12vw, ink, with a soft warm orange glow behind the letters (text-shadow 0 0 30px rgba(218,86,47,.25)). Reveal: clip-path left → right over 0.6 s (24.2–24.8).
- Heat sweep: a gradient mask (ink → orange #da562f → ink, ~25% wide) travels left → right across the word between 24.6 and 25.5 s, with a small orange bar leading the sweep on the left side of the word. Letters return to solid ink afterwards.
- Ghost giant "AVERAGE." at the bottom, bleeding off the edges, ~22vw, color rgba(0,0,0,.06).
- Corner labels: top-left "MARKTECH STUDIOS", top-right "AI-NATIVE". Bottom-left micro block: "©2025 MARKTECH STUDIOS [TXT2IMG]" (the tag is outlined), "ALGORITHMICALLY GENERATED · HUMAN DIRECTED", "/STACK TXT2IMG · IMG2VID · AGENT_OPS · MKT_OS", and below a "+" with 5 small squares and a double-circle icon. Bottom-right: barcode glyph + "MKT-IND-2025".
- 25.6: a 10px-tall orange strikethrough bar draws left→right across the middle of "AVERAGE" (slightly wider than the word, 0.35 s, power4.out). An orange square (~2vw) pops after the last letter, as a period.
- Hold to 27.2, then a quick dark panel wipe (0.3 s) straight into S1 and the loop restarts.

# IMPLEMENTATION REQUIREMENTS
1. File structure:
   - components/hero/HeroReel.tsx (client component, owns master timeline, `useGSAP`)
   - components/hero/scenes/Scene01Hero.tsx … Scene11Average.tsx (each exports a presentational component + a `build` function)
   - components/hero/AsciiCanvas.tsx, components/hero/Marquee.tsx
   - lib/hero/timeline.ts exporting SCENE_TIMES constants so all timecodes live in one place
2. All scenes are absolutely positioned layers inside one `relative overflow-hidden` stage with `height: calc(100svh - nav-height)` (min 560px). Only animate transform, opacity, clip-path. Add will-change sparingly.
3. Default easing: power3.out for entrances, power3.inOut for wipes, back.out(1.7) for pops. Keep all micro-animations ≤ 0.8 s.
4. Respect `prefers-reduced-motion`: show a static composite of the first scene and skip the loop.
5. Pause the timeline when the tab is hidden or the stage is off-screen (IntersectionObserver) and resume afterwards.
6. Fonts through next/font, preloaded, no layout shift. Headlines are real text (not images), the stage gets `aria-label` and the decorative layers `aria-hidden`.
7. The loop must be seamless: S11 → S1 must not flash. Reset each scene's inline styles on `onRepeat`.
8. Mobile (<768px): stack diagrams under titles, scale titles to ~14vw, hide ghost text and the micro-label blocks, and keep the same timings.
9. Provide a debug toggle (`?debug=1`) that shows the current time and lets me scrub the timeline with a range input.
10. Deliver complete, runnable code for every file, plus the `npm i gsap @gsap/react` instruction.