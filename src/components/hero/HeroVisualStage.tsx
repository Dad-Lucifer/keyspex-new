/* eslint-disable */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ─── Services Data (from services.md) ─────────────────────────────────────────
const SERVICES = [
  { id: 1, num: "01", tag: "WEBSITE",    title: "BUSINESS PORTFOLIO WEBSITE",   cat: "WEBSITE & BUSINESS" },
  { id: 2, num: "02", tag: "DASHBOARD",  title: "BUSINESS DASHBOARD",            cat: "WEBSITE & BUSINESS" },
  { id: 3, num: "03", tag: "STORE OS",   title: "STORE MANAGEMENT SYSTEM",       cat: "WEBSITE & BUSINESS" },
  { id: 4, num: "04", tag: "GOOGLE SEO", title: "GOOGLE BUSINESS SEO",           cat: "VISIBILITY & MARKETING" },
  { id: 5, num: "05", tag: "SOCIAL",     title: "SOCIAL MEDIA MARKETING",        cat: "VISIBILITY & MARKETING" },
  { id: 6, num: "06", tag: "CAMPAIGNS",  title: "SOCIAL MEDIA CAMPAIGNS",        cat: "VISIBILITY & MARKETING" },
  { id: 7, num: "07", tag: "DESIGN",     title: "GRAPHIC DESIGNING",             cat: "CREATIVE & CONTENT" },
  { id: 8, num: "08", tag: "VIDEO",      title: "VIDEO EDITING",                 cat: "CREATIVE & CONTENT" },
];

const WIPE = 0.24; // Ultra-short switch between two screens

// ─── Subtle Blueprint Grid Overlay ──────────────────────────────────────────
function Grid({ id, color }: { id: string; color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Main Hero Visual Stage Component ────────────────────────────────────────
export function HeroVisualStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef    = useRef<gsap.core.Timeline | null>(null);
  const progRef  = useRef<HTMLDivElement>(null);
  const progRefMobile = useRef<HTMLDivElement>(null);
  const dotRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const hudContainerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [playing,   setPlaying]   = useState(true);
  const [motionOk,  setMotionOk]  = useState<boolean | null>(null);

  // Client-side detection of reduced motion preference to avoid SSR mismatch
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOk(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMotionOk(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ─── GSAP Master Timeline ──────────────────────────────────────────────────
  useGSAP(
    () => {
      if (motionOk !== true) return;

      const stage = stageRef.current;
      if (!stage) return;
      const ease = "power4.out";

      const scenes = Array.from({ length: 8 }, (_, i) =>
        stage.querySelector<HTMLElement>(`#sc${i + 1}`)!
      );

      // Dot HUD styling without causing React re-renders
      let lastScene = -1;
      function highlightDot(idx: number) {
        dotRefs.current.forEach((d, i) => {
          if (!d) return;
          d.style.background  = i === idx ? "#0A5CF0" : "transparent";
          d.style.borderColor = i === idx ? "#0A5CF0" : "rgba(255,255,255,0.3)";
        });
        if (idx !== lastScene) {
          lastScene = idx;
          setActiveIdx(idx);
        }
      }

      // Reset state — guarantees Scene 1 is the ONLY active slide on load and repeat
      function resetAll() {
        scenes.forEach((sc, i) => {
          gsap.set(sc, {
            zIndex: i === 0 ? 10 : 1,
            autoAlpha: i === 0 ? 1 : 0,
            clipPath: i === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          });
        });
        if (progRef.current) gsap.set(progRef.current, { width: "0%" });
        if (progRefMobile.current) gsap.set(progRefMobile.current, { width: "0%" });
        highlightDot(0);
      }

      // Hard reset immediately on load
      resetAll();

      // Master Timeline
      const master = gsap.timeline({
        repeat: -1,
        onRepeat: resetAll,
        defaults: { ease: "power2.out" },
      });
      tlRef.current = master;

      // ─── Scene Animation Builders ──────────────────────────────────────────

      // ─── Scene Animation Builders (Cinematic, Liquid-Smooth Entrances) ────

      // 01: Portfolio Website
      function addScene1(pos: string) {
        const sc = scenes[0];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { y: "105%", opacity: 0 },
            { y: "0%", opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out" },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelector(".browser-mock"),
            { opacity: 0, y: 24, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(sc.querySelectorAll(".br-card"),
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, stagger: 0.08, duration: 0.45, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(sc.querySelector(".br-live"),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
            "-=0.2"
          );
      }

      // 02: Business Dashboard
      function addScene2(pos: string) {
        const sc = scenes[1];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { y: "105%", opacity: 0 },
            { y: "0%", opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out" },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelectorAll(".db-card"),
            { opacity: 0, y: 18, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelector(".db-line"),
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            "-=0.2"
          )
          .fromTo(sc.querySelector(".db-spark polyline"),
            { strokeDashoffset: 500 },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" },
            "-=0.4"
          );
      }

      // 03: Store Management
      function addScene3(pos: string) {
        const sc = scenes[2];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelectorAll(".st-row"),
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.07, duration: 0.42, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(sc.querySelector(".st-total"),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
            "-=0.2"
          );
      }

      // 04: Google Business SEO
      function addScene4(pos: string) {
        const sc = scenes[3];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelector(".goog-card"),
            { opacity: 0, y: 22, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelectorAll(".goog-star"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.05, duration: 0.3, ease: "back.out(1.8)" },
            "-=0.25"
          )
          .fromTo(sc.querySelectorAll(".goog-detail"),
            { x: -12, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.07, duration: 0.4 },
            "-=0.2"
          )
          .fromTo(sc.querySelector(".goog-badge"),
            { scale: 1.3, opacity: 0, rotation: 6 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.4, ease: "back.out(1.8)" },
            "-=0.15"
          )
          .fromTo(sc.querySelectorAll(".radar-ring"),
            { scale: 0.3, opacity: 0.8 },
            { scale: 2, opacity: 0, stagger: 0.22, duration: 1.3, ease: "power1.out" },
            "-=0.5"
          );
      }

      // 05: Social Media Marketing
      function addScene5(pos: string) {
        const sc = scenes[4];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { y: "105%", opacity: 0 },
            { y: "0%", opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out" },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelectorAll(".post-card"),
            { scale: 0.9, opacity: 0, y: 16 },
            { scale: 1, opacity: 1, y: 0, stagger: 0.09, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelectorAll(".soc-stat"),
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.07, duration: 0.4 },
            "-=0.2"
          );
      }

      // 06: Social Media Campaigns
      function addScene6(pos: string) {
        const sc = scenes[5];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1, stagger: 0.08, duration: 0.6 },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelectorAll(".pipe-node"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.09, duration: 0.45, ease: "back.out(1.8)" },
            "-=0.3"
          )
          .fromTo(sc.querySelector(".pipe-bullet"),
            { left: "0%" },
            { left: "calc(100% - 12px)", duration: 1.2, ease: "power1.inOut" },
            "-=0.25"
          )
          .fromTo(sc.querySelectorAll(".pipe-tag"),
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, stagger: 0.07, duration: 0.38 },
            "-=0.3"
          );
      }

      // 07: Graphic Designing
      function addScene7(pos: string) {
        const sc = scenes[6];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { y: "105%", opacity: 0 },
            { y: "0%", opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out" },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelector(".canvas-frame"),
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelector(".canvas-dark"),
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.55, ease: "power3.out" },
            "-=0.25"
          )
          .fromTo(sc.querySelectorAll(".canvas-bar"),
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, stagger: 0.08, duration: 0.35 },
            "-=0.2"
          )
          .fromTo(sc.querySelector(".canvas-accent"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.8)" },
            "-=0.15"
          )
          .fromTo(sc.querySelectorAll(".canvas-handle"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.04, duration: 0.28, ease: "back.out(1.8)" },
            "-=0.15"
          )
          .fromTo(sc.querySelector(".export-bar"),
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.9, ease: "none" },
            "-=0.3"
          );
      }

      // 08: Video Editing
      function addScene8(pos: string) {
        const sc = scenes[7];
        master
          .fromTo(sc.querySelectorAll(".h-line"),
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
            pos
          )
          .fromTo(sc.querySelector(".sc-sub"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelector(".vid-monitor"),
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(sc.querySelector(".vid-playbtn"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.38, ease: "back.out(1.8)" },
            "-=0.25"
          )
          .fromTo(sc.querySelectorAll(".vid-track"),
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, stagger: 0.08, duration: 0.45, ease: "power2.out" },
            "-=0.2"
          )
          .fromTo(sc.querySelector(".vid-playhead"),
            { left: "0%" },
            { left: "calc(100% - 2px)", duration: 1.4, ease: "none" },
            "-=0.3"
          )
          .fromTo(sc.querySelectorAll(".vid-label"),
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.28 },
            "-=1.1"
          );
      }

      const builders = [
        addScene1,
        addScene2,
        addScene3,
        addScene4,
        addScene5,
        addScene6,
        addScene7,
        addScene8,
      ];

      // Assemble all 8 scenes sequentially on master timeline
      for (let i = 0; i < 8; i++) {
        const label = `scene-${i}`;
        const currentScene = scenes[i];
        const nextScene = scenes[(i + 1) % 8];
        const isVertical = i % 2 === 1;

        // Label for instant laser-precise seeking
        master.addLabel(label);

        // Update HUD dot and active index
        master.call(() => {
          highlightDot(i);
        });

        // Scene content entrance animations (smooth, liquid reveals)
        builders[i](label);

        // Progress bar for this scene (~3.2s total smooth cycle)
        if (progRef.current) {
          master.fromTo(
            progRef.current,
            { width: "0%" },
            { width: "100%", duration: 3.2, ease: "none" },
            label
          );
        }
        if (progRefMobile.current) {
          master.fromTo(
            progRefMobile.current,
            { width: "0%" },
            { width: "100%", duration: 3.2, ease: "none" },
            label
          );
        }

        // Comfortable reading dwell time
        master.to({}, { duration: 2.2 });

        // Ultra-short switch between two screens (rapid snap/cut: 0.24s)
        master
          .set(nextScene, {
            zIndex: 20,
            autoAlpha: 1,
            clipPath: isVertical ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)",
          })
          .to(nextScene, {
            clipPath: "inset(0% 0 0 0)",
            duration: WIPE,
            ease,
          })
          .set(currentScene, {
            autoAlpha: 0,
            zIndex: 1,
            clipPath: "inset(0 100% 0 0)",
          })
          .set(nextScene, {
            zIndex: 10,
          });
      }

      // Explicitly start at slide 1, time 0 immediately
      master.seek(0);
      master.play();

      // Pause/resume when tab is hidden or element scrolls off screen
      const onVis = () => { document.hidden ? master.pause() : master.resume(); };
      document.addEventListener("visibilitychange", onVis);

      const io = new IntersectionObserver(
        ([e]) => e.isIntersecting ? master.resume() : master.pause(),
        { threshold: 0.1 }
      );
      io.observe(stage);

      return () => {
        document.removeEventListener("visibilitychange", onVis);
        io.disconnect();
        master.kill();
      };
    },
    { scope: stageRef, dependencies: [motionOk] }
  );

  // ─── Controls (Instant Kinetic Snap on Switch) ───────────────────────────
  const jump = useCallback((idx: number) => {
    if (!tlRef.current || !stageRef.current) return;
    const stage = stageRef.current;
    const scenes = Array.from({ length: 8 }, (_, i) =>
      stage.querySelector<HTMLElement>(`#sc${i + 1}`)!
    );

    const target = scenes[idx];

    // Instantly hide other scenes and wipe target into view with zero delay
    scenes.forEach((sc, i) => {
      if (i !== idx) {
        gsap.set(sc, {
          zIndex: 1,
          autoAlpha: 0,
          clipPath: "inset(0 100% 0 0)",
        });
      }
    });

    gsap.fromTo(target,
      { zIndex: 20, autoAlpha: 1, clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.2,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(target, { zIndex: 10 });
        },
      }
    );

    // Update HUD dots instantly
    dotRefs.current.forEach((d, i) => {
      if (!d) return;
      d.style.background  = i === idx ? "#0A5CF0" : "transparent";
      d.style.borderColor = i === idx ? "#0A5CF0" : "rgba(255,255,255,0.3)";
    });

    tlRef.current.seek(`scene-${idx}`);
    tlRef.current.play();
    setPlaying(true);
    setActiveIdx(idx);
  }, []);

  const togglePlay = useCallback(() => {
    if (!tlRef.current) return;
    if (playing) { tlRef.current.pause();  setPlaying(false); }
    else         { tlRef.current.resume(); setPlaying(true);  }
  }, [playing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { jump((activeIdx + 1) % 8); }
      if (e.key === "ArrowLeft")  { jump((activeIdx + 7) % 8); }
      if (e.key === " ")          { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, jump, togglePlay]);

  // Auto-center active HUD tab on mobile / small screens
  useEffect(() => {
    const btn = btnRefs.current[activeIdx];
    if (btn && hudContainerRef.current) {
      btn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIdx]);

  // Native mobile touch swipe gestures (fluid thumb swipe left/right)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        jump((activeIdx + 1) % 8);
      } else {
        jump((activeIdx + 7) % 8);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentSvc = SERVICES[activeIdx];

  // ─── Shared JSX Helpers ───────────────────────────────────────────────────
  function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
    return (
      <p className="h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase mb-2 sm:mb-4"
         style={{ color: light ? "rgba(255,255,255,0.7)" : "#0A5CF0", fontFamily: "var(--font-mono)", opacity: 0 }}>
        {text}
      </p>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section
      ref={stageRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full overflow-hidden select-none h-[calc(100svh-64px)] min-h-[580px] sm:min-h-[620px] md:h-[calc(100vh-64px)] md:min-h-[580px]"
      style={{ marginTop: 64 }}
      aria-label="KeySpex — Digital Services Showcase"
    >
      {/* ── Floating HUD: Service Switcher (Mobile Ergonomic Capsule) ────── */}
      <div className="absolute top-2.5 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4" aria-hidden="true">
        <div
          ref={hudContainerRef}
          className="flex items-center border border-[#1f2937]/90 bg-[#0a0a0f]/90 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full rounded-full sm:rounded-none px-1 sm:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { btnRefs.current[i] = el; }}
              onClick={() => jump(i)}
              className="relative px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[9px] sm:text-[11px] font-bold tracking-wider transition-all cursor-pointer border-r border-[#1f2937]/60 last:border-r-0 shrink-0 rounded-full sm:rounded-none"
              style={{
                background: i === activeIdx ? "#0A5CF0" : "transparent",
                color:      i === activeIdx ? "#ffffff" : "#9ca3af",
              }}
              title={s.title}
            >
              <span className="hidden sm:inline mr-1 opacity-60">{s.num}</span>
              {s.tag}
              {i === activeIdx && (
                <span className="hidden sm:block absolute bottom-0 left-0 right-0 h-[2px] bg-white/70" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 1 — PORTFOLIO WEBSITE (Dark #0a0a0f)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc1" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#0a0a0f", zIndex: 10, opacity: 1 }}>
        <Grid id="g1" color="rgba(10,92,240,0.08)" />

        {/* Left: Copy */}
        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <Eyebrow text="01 / WEBSITE & BUSINESS SOLUTIONS" />
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)", color: "#f8f9fc" }}>
            <div className="overflow-hidden"><span className="h-line anim block" style={{ opacity: 0 }}>YOUR BUSINESS</span></div>
            <div className="overflow-hidden"><span className="h-line anim block" style={{ opacity: 0 }}>DESERVES TO</span></div>
            <div className="overflow-hidden">
              <span className="h-line anim block" style={{ opacity: 0 }}>
                BE <span style={{ color: "#0A5CF0", textShadow: "0 0 24px rgba(10,92,240,0.6)" }}>FOUND.</span>
              </span>
            </div>
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md"
             style={{ color: "#9ca3af", fontFamily: "var(--font-mono)", opacity: 0 }}>
            A high-performance portfolio that turns visitors into paying clients before you even pick up the phone.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["LCP < 0.6s", "100/100 SPEED", "SEO READY"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#1f2937] bg-[#121318] text-[#60a5fa] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Browser Mockup */}
        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0" aria-hidden="true">
          <div className="browser-mock anim w-full max-w-[330px] sm:max-w-[390px] md:max-w-[440px] border border-[#1f2937] bg-[#0d0e12] shadow-2xl overflow-hidden" style={{ opacity: 0 }}>
            {/* Chrome bar */}
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#1f2937] bg-[#121318]">
              {["#0A5CF0","#374151","#1f2937"].map((c,i) => (
                <span key={i} className="size-2 sm:size-2.5 rounded-full" style={{ background: c }} />
              ))}
              <div className="ml-2 sm:ml-3 flex-1 h-5 border border-[#1f2937] bg-[#0a0a0f] px-2 flex items-center">
                <span className="font-mono text-[8px] sm:text-[9px] text-[#60a5fa] whitespace-nowrap truncate">
                  https://yourdomain.com
                </span>
              </div>
              <span className="font-mono text-[7px] sm:text-[8px] text-[#60a5fa] ml-2 flex items-center gap-1 shrink-0">
                <span className="size-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                LIVE
              </span>
            </div>
            {/* Body */}
            <div className="px-3.5 sm:px-5 py-2.5 sm:py-4 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-[#1f2937]">
                <span className="font-headline font-black text-[10px] sm:text-xs text-white tracking-wider">YOUR BRAND STUDIO</span>
                <span className="br-live anim font-mono text-[9px] sm:text-[10px] bg-[#0A5CF0] text-white px-2 sm:px-3 py-0.5 sm:py-1 font-bold" style={{ opacity: 0 }}>
                  BOOK CALL →
                </span>
              </div>
              {[
                { label: "CORE SERVICES & PORTFOLIO", stat: "0.3s LOAD" },
                { label: "LEAD INTAKE — WHATSAPP", stat: "3.4× CONVERT" },
                { label: "MOBILE + DESKTOP RESPONSIVE", stat: "ALL DEVICES" },
              ].map((item, i) => (
                <div key={i} className="br-card anim flex items-center justify-between border border-[#1f2937] bg-[#13141a] px-2.5 sm:px-3 py-1.5 sm:py-2.5" style={{ opacity: 0 }}>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/70 font-bold tracking-wide truncate">{item.label}</span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#0A5CF0] font-bold border border-[#0A5CF0]/30 px-1.5 py-0.5 whitespace-nowrap ml-2 shrink-0">{item.stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 2 — BUSINESS DASHBOARD (Light #f8f9fc)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc2" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#f8f9fc", zIndex: 1, opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
        <Grid id="g2" color="rgba(10,92,240,0.06)" />

        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <div className="overflow-hidden mb-1 sm:mb-2">
            <p className="h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase" style={{ color: "#0A5CF0", fontFamily: "var(--font-mono)", opacity: 0 }}>
              02 / BUSINESS TOOLS & METRICS
            </p>
          </div>
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight text-[#0a0a0f]"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)" }}>
            <div className="overflow-hidden"><span className="h-line anim block" style={{ opacity: 0 }}>YOUR DATA.</span></div>
            <div className="overflow-hidden">
              <span className="h-line anim block" style={{ opacity: 0 }}>
                ONE CLEAR <span style={{ color: "#0A5CF0" }}>DASHBOARD.</span>
              </span>
            </div>
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#6b7280]"
             style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
            From scattered WhatsApp notes and paper ledgers to a live command interface with real metrics.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["REAL-TIME SYNC", "MULTI-STORE", "ZERO LATENCY"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#e5e7eb] bg-white text-[#0A5CF0] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0" aria-hidden="true">
          <div className="w-full max-w-[330px] sm:max-w-[390px] md:max-w-[440px]">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
              {[
                { val: "₹4.8L",  label: "MONTHLY REVENUE",   delta: "↑ 24.8% MOM" },
                { val: "99.4%",  label: "ORDER FULFILLMENT",  delta: "TARGET: 98%" },
                { val: "1,240",  label: "ACTIVE CUSTOMERS",   delta: "+38 THIS WEEK" },
                { val: "18.2H",  label: "AVG TURNAROUND",     delta: "↓ 4.6H FASTER" },
              ].map((m, i) => (
                <div key={i} className="db-card anim relative border border-[#e5e7eb] bg-white px-2.5 sm:px-4 py-2 sm:py-3 shadow-xs" style={{ opacity: 0 }}>
                  <span className="absolute top-0 left-0 bottom-0 w-[2.5px] sm:w-[3px] bg-[#0A5CF0]" />
                  <p className="font-headline font-black text-base sm:text-xl leading-none text-[#0a0a0f]">{m.val}</p>
                  <p className="font-mono text-[7px] sm:text-[8px] tracking-widest text-[#6b7280] uppercase mt-1 truncate">{m.label}</p>
                  <p className="font-mono text-[7px] sm:text-[8px] text-[#0A5CF0] font-bold mt-0.5">{m.delta}</p>
                </div>
              ))}
            </div>

            {/* Sweep line */}
            <div className="db-line anim h-[2px] bg-[#0A5CF0] mb-2 sm:mb-3" style={{ transformOrigin: "left center", transform: "scaleX(0)" }} />

            {/* Sparkline area */}
            <div className="db-spark border border-[#e5e7eb] bg-white p-2.5 sm:p-3 shadow-xs">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="font-mono text-[8px] sm:text-[9px] text-[#4b5563] uppercase font-bold tracking-wider">REVENUE SPARKLINE (30d)</span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#0A5CF0] font-bold">PEAK: ₹2.8L</span>
              </div>
              <svg viewBox="0 0 360 70" className="w-full h-12 sm:h-16">
                <defs>
                  <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A5CF0" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0A5CF0" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon fill="url(#spGrad)"
                  points="0,65 40,52 80,58 120,36 160,44 200,22 240,32 280,14 320,20 360,8 360,70 0,70" />
                <polyline
                  className="anim"
                  fill="none" stroke="#0A5CF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="500"
                  style={{ strokeDashoffset: 500 }}
                  points="0,65 40,52 80,58 120,36 160,44 200,22 240,32 280,14 320,20 360,8"
                />
                <circle cx="360" cy="8" r="3.5" fill="#0A5CF0" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 3 — STORE MANAGEMENT (Dark Slate #0e131d)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc3" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#0e131d", zIndex: 1, opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
        <Grid id="g3" color="rgba(10,92,240,0.06)" />

        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <Eyebrow text="03 / RETAIL & STORE SOLUTIONS" light />
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight text-[#f8f9fc]"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)" }}>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>STOP COUNTING</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>INVENTORY</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
              BY <span style={{ color: "#0A5CF0" }}>HAND.</span>
            </span>
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#9ca3af]"
             style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
            Digital stock and sales ledger for offline store owners — barcode scanning, billing, and re-order alerts in one tap.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["INSTANT BILLING", "BARCODE SCAN", "AUTO-ALERT"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#1f2937] bg-[#12141e] text-[#60a5fa] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0" aria-hidden="true">
          <div className="w-full max-w-[330px] sm:max-w-[390px] md:max-w-[460px] border border-[#374151] bg-[#0c1017] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#1f2937] bg-[#12141e]">
              <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold tracking-widest uppercase">STORE_OS // SKU LEDGER</span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#60a5fa] border border-[#60a5fa]/40 px-2 py-0.5 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                SCANNER ON
              </span>
            </div>
            <div className="grid grid-cols-5 bg-[#161d2b] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-[9px] font-mono text-[#9ca3af] font-bold uppercase tracking-wider">
              <span className="col-span-2">SKU ITEM</span><span>STOCK</span><span>SOLD</span><span className="text-right">STATUS</span>
            </div>
            {[
              { sku: "OVERSHIRT-1048", stock: "142", sold: "38",  status: "IN STOCK",  dot: "#60a5fa" },
              { sku: "TROUSER-2091",   stock: "08",  sold: "94",  status: "LOW STOCK", dot: "#9ca3af" },
              { sku: "HOODIE-3120",    stock: "00",  sold: "210", status: "RESTOCK",   dot: "#0A5CF0" },
              { sku: "LEATHER-4910",   stock: "64",  sold: "19",  status: "IN STOCK",  dot: "#60a5fa" },
            ].map((row, i) => (
              <div key={i} className="st-row anim grid grid-cols-5 px-2.5 sm:px-3 py-2 sm:py-2.5 border-t border-[#1f2937] text-[9px] sm:text-[10px] font-mono text-white items-center bg-[#0e131d]" style={{ opacity: 0 }}>
                <span className="col-span-2 font-bold text-[10px] sm:text-xs truncate mr-1">{row.sku}</span>
                <span className="text-[#60a5fa]">{row.stock}</span>
                <span className="text-[#9ca3af]">{row.sold}</span>
                <span className="text-right text-[8px] sm:text-[9px] font-bold flex items-center justify-end gap-1" style={{ color: row.dot }}>
                  <span>●</span><span className="hidden sm:inline">{row.status}</span>
                </span>
              </div>
            ))}
            <div className="st-total anim px-3 sm:px-4 py-2 sm:py-3 border-t border-[#0A5CF0]/30 bg-[#0A5CF0]/10 flex items-center justify-between" style={{ opacity: 0 }}>
              <div>
                <p className="font-mono text-[8px] sm:text-[9px] text-[#60a5fa] uppercase font-bold tracking-wider">TOTAL REVENUE TODAY</p>
                <p className="font-headline font-black text-base sm:text-xl text-white mt-0.5">₹38,450.00</p>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] bg-[#0A5CF0] text-white px-2.5 sm:px-3 py-1 font-bold uppercase">EXPORT →</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 4 — GOOGLE BUSINESS SEO (Deep Cobalt #0A5CF0)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc4" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#0A5CF0", zIndex: 1, opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
        <Grid id="g4" color="rgba(255,255,255,0.08)" />

        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <Eyebrow text="04 / LOCAL VISIBILITY & SEO" light />
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight text-white"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)" }}>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>DOMINATE</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>LOCAL SEARCH</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
              <span style={{ color: "#0a0a0f" }}>RANK #1.</span>
            </span>
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-white/90"
             style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
            Optimize your Google Business Profile so local customers in your city call you before competitors.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["3.8× MORE CALLS", "MAP PACK #1", "GEO-TAGGED"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-white/30 bg-black/20 text-white font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 relative" aria-hidden="true">
          {/* Radar rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="radar-ring anim absolute size-32 sm:size-48 rounded-full border border-white/30" style={{ opacity: 0 }} />
            <span className="radar-ring anim absolute size-48 sm:size-72 rounded-full border border-white/20" style={{ opacity: 0 }} />
            <span className="radar-ring anim absolute size-64 sm:size-96 rounded-full border border-white/10" style={{ opacity: 0 }} />
          </div>

          <div className="goog-card anim w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] bg-white border border-white/40 shadow-2xl p-3.5 sm:p-5" style={{ opacity: 0 }}>
            {/* Search bar */}
            <div className="flex items-center gap-2 border border-[#e5e7eb] px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#f9fafb] mb-2 sm:mb-4">
              <span className="text-xs sm:text-sm">🔍</span>
              <span className="font-mono text-[9px] sm:text-[11px] text-[#374151] font-bold truncate">top rated studio near me</span>
              <span className="ml-auto font-mono text-[8px] sm:text-[9px] bg-[#0A5CF0] text-white px-1.5 sm:px-2 py-0.5 font-bold shrink-0">RANK #1</span>
            </div>

            {/* Profile */}
            <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-2 sm:pb-3 mb-2 sm:mb-3">
              <div>
                <h3 className="font-headline font-black text-xs sm:text-base text-[#0a0a0f]">YOUR BUSINESS NAME</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                  <span className="font-bold text-xs sm:text-sm text-[#0A5CF0]">5.0</span>
                  <div className="flex text-[#0A5CF0]">
                    {[1,2,3,4,5].map(i => <span key={i} className="goog-star anim text-xs sm:text-sm" style={{ opacity: 0 }}>★</span>)}
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#6b7280]">(184 Reviews)</span>
                </div>
              </div>
              <div className="goog-badge anim border border-[#0A5CF0] px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1 shrink-0" style={{ opacity: 0 }}>
                <span className="text-[#0A5CF0] text-[10px] sm:text-xs font-bold">✓</span>
                <span className="font-mono text-[7px] sm:text-[8px] text-[#0A5CF0] font-bold">VERIFIED</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5 sm:space-y-2">
              {[
                { ico: "📍", text: "123 Main Street, Your City" },
                { ico: "🕐", text: "Mon–Sat: 9:00 AM – 7:00 PM" },
                { ico: "📞", text: "+91 98765 43210" },
              ].map(({ ico, text }, i) => (
                <div key={i} className="goog-detail anim flex items-center gap-2" style={{ opacity: 0 }}>
                  <span className="text-xs sm:text-sm">{ico}</span>
                  <span className="font-mono text-[8px] sm:text-[10px] text-[#374151] truncate">{text}</span>
                </div>
              ))}
              <div className="goog-detail anim flex items-center gap-1.5 mt-1 sm:mt-2" style={{ opacity: 0 }}>
                <span className="size-1.5 sm:size-2 rounded-full bg-[#0A5CF0] animate-pulse" />
                <span className="font-mono text-[8px] sm:text-[9px] font-bold text-[#0A5CF0]">OPEN NOW</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2.5 sm:mt-4 font-mono text-[8px] sm:text-[10px] font-bold uppercase text-center">
              <div className="border border-[#e5e7eb] py-1.5 sm:py-2 bg-[#f8f9fc] text-[#0A5CF0]">🌐 WEBSITE</div>
              <div className="border border-[#e5e7eb] py-1.5 sm:py-2 bg-[#f8f9fc] text-[#0A5CF0]">📍 DIRECTIONS</div>
              <div className="bg-[#0A5CF0] text-white py-1.5 sm:py-2">📞 CALL NOW</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 5 — SOCIAL MEDIA MARKETING (Light #f8f9fc)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc5" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#f8f9fc", zIndex: 1, opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
        <Grid id="g5" color="rgba(10,92,240,0.06)" />

        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <div className="overflow-hidden mb-1 sm:mb-2">
            <p className="h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-[#0A5CF0]" style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
              05 / ORGANIC SOCIAL & RETENTION
            </p>
          </div>
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight text-[#0a0a0f]"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)" }}>
            {["CONSISTENT.", "ON-BRAND.", "EVERY POST."].map((t, i) => (
              <div key={i} className="overflow-hidden">
                <span className="h-line anim block" style={{ opacity: 0 }}>{t}</span>
              </div>
            ))}
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#6b7280]"
             style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
            Stop posting mismatched designs. We build a cohesive visual language that commands authority on every feed.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["BRAND GUIDES", "30 POSTS/MO", "RETENTION FIRST"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#e5e7eb] bg-white text-[#0A5CF0] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0" aria-hidden="true">
          <div className="w-full max-w-[330px] sm:max-w-[390px] md:max-w-[420px] space-y-2 sm:space-y-3">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { tag: "PRODUCT POST",     bg: "#eff6ff", accent: "#0A5CF0" },
                { tag: "PROMO BANNER",     bg: "#dbeafe", accent: "#3b82f6" },
                { tag: "BRAND STORY 9:16", bg: "#f0f4ff", accent: "#0842B0" },
              ].map((c, i) => (
                <div key={i} className="post-card anim border border-[#e5e7eb] bg-white shadow-xs overflow-hidden" style={{ aspectRatio: "4/5", opacity: 0 }}>
                  <div className="w-full flex-1 flex flex-col justify-between p-2 sm:p-2.5 h-full" style={{ background: c.bg }}>
                    <div className="flex items-center justify-between">
                      <span className="size-1.5 sm:size-2 rounded-full" style={{ background: "#0A5CF0" }} />
                      <span className="font-mono text-[6px] sm:text-[7px] font-bold" style={{ color: c.accent }}>KEYSPEX</span>
                    </div>
                    <div>
                      <div className="h-10 sm:h-16 border border-white/60 mb-1.5 sm:mb-2 flex items-center justify-center bg-white/40">
                        <span className="font-mono text-[6px] sm:text-[7px] font-bold" style={{ color: c.accent }}>CONTENT</span>
                      </div>
                      <p className="font-mono text-[6px] sm:text-[7px] uppercase font-bold truncate" style={{ color: c.accent }}>{c.tag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#e5e7eb] bg-white p-2.5 sm:p-3.5 flex items-center justify-between shadow-xs">
              <div className="flex gap-3 sm:gap-5">
                {[
                  { label: "AVG REACH",   val: "+184%" },
                  { label: "ENGAGEMENT",  val: "4.8×" },
                  { label: "RETENTION",   val: "92%" },
                ].map((s, i) => (
                  <div key={i} className="soc-stat anim" style={{ opacity: 0 }}>
                    <p className="font-mono text-[7px] sm:text-[8px] text-[#9ca3af] uppercase font-bold">{s.label}</p>
                    <p className="font-headline font-black text-xs sm:text-sm text-[#0a0a0f]">{s.val}</p>
                  </div>
                ))}
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] bg-[#0A5CF0] text-white px-2 sm:px-2.5 py-1 font-bold uppercase shrink-0">100% SCORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 6 — SOCIAL CAMPAIGNS (Dark Void #0a0a0f)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc6" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#0a0a0f", zIndex: 1, opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
        <Grid id="g6" color="rgba(10,92,240,0.08)" />

        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <Eyebrow text="06 / STRUCTURED PAID CAMPAIGNS" />
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight text-[#f8f9fc]"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)" }}>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>A PROMOTION</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>WITH A STRATEGIC</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
              <span style={{ color: "#0A5CF0" }}>PLAN.</span>
            </span>
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#9ca3af]"
             style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
            Goal → Plan → Create → Launch. Coordinated marketing sprints tailored for seasonal peaks and product launches.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["HIGH ROAS", "A/B CREATIVES", "LEAD FUNNELS"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#1f2937] bg-[#121318] text-[#60a5fa] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0" aria-hidden="true">
          <div className="w-full max-w-[330px] sm:max-w-[390px] md:max-w-[460px] border border-[#1f2937] bg-[#0d0f14] p-3 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1f2937] pb-2 sm:pb-3 mb-3 sm:mb-6">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#60a5fa] font-bold tracking-widest uppercase">CAMPAIGN_PIPELINE</span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#60a5fa] border border-[#0A5CF0]/40 px-1.5 sm:px-2 py-0.5">STATUS: LIVE</span>
            </div>

            {/* Pipeline nodes */}
            <div className="relative flex items-start justify-between">
              {/* Rail */}
              <div className="absolute" style={{ top: 16, left: 16, right: 16, height: 2, background: "#1f2937" }} />
              {/* Animated bullet */}
              <div className="pipe-bullet anim absolute size-2.5 sm:size-3 rounded-full bg-[#0A5CF0] z-10"
                   style={{ top: 11, left: 16, boxShadow: "0 0 12px #0A5CF0" }} />

              {[
                { num: "01", name: "GOAL",   desc: "ROAS" },
                { num: "02", name: "PLAN",   desc: "14-Day" },
                { num: "03", name: "CREATE", desc: "12 Ads" },
                { num: "04", name: "LAUNCH", desc: "Live" },
              ].map((node, i) => (
                <div key={i} className="pipe-node anim relative z-10 flex flex-col items-center" style={{ opacity: 0 }}>
                  <div className="size-8 sm:size-10 border flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs"
                       style={{
                         borderColor: i === 3 ? "#0A5CF0" : "#1f2937",
                         background:  i === 3 ? "#0A5CF0" : "#13161f",
                         color: "#fff",
                       }}>
                    {node.num}
                  </div>
                  <span className="font-headline font-bold text-[10px] sm:text-xs text-white mt-1 sm:mt-2">{node.name}</span>
                  <span className="font-mono text-[7px] sm:text-[8px] text-[#6b7280] uppercase">{node.desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-8 pt-2.5 sm:pt-4 border-t border-[#1f2937] grid grid-cols-3 gap-1.5 sm:gap-2 text-center font-mono text-[8px] sm:text-[9px]">
              {["PRODUCT LAUNCH", "FESTIVAL FLASH", "RETARGETING"].map((tag, i) => (
                <div key={i} className="pipe-tag anim border border-[#1f2937] py-1.5 sm:py-2 bg-[#12151d] text-[#9ca3af] font-bold uppercase truncate" style={{ opacity: 0 }}>
                  ✓ {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 7 — GRAPHIC DESIGNING (Light #f8f9fc)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc7" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#f8f9fc", zIndex: 1, opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
        <Grid id="g7" color="rgba(10,92,240,0.06)" />

        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <div className="overflow-hidden mb-1 sm:mb-2">
            <p className="h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-[#0A5CF0]" style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
              07 / CREATIVE DESIGN & COLLATERAL
            </p>
          </div>
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight text-[#0a0a0f]"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)" }}>
            {["LOOK SHARP.", "EVERY ASSET", "INTENTIONAL."].map((t, i) => (
              <div key={i} className="overflow-hidden">
                <span className="h-line anim block" style={{ opacity: 0 }}>{t}</span>
              </div>
            ))}
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#6b7280]"
             style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
            Brochures, packaging, banners, presentations and flyers crafted to make your brand look world-class.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["VECTOR PRECISION", "300 DPI PRINT", "FIGMA SYSTEM"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#e5e7eb] bg-white text-[#0A5CF0] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0" aria-hidden="true">
          <div className="canvas-frame anim w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] border border-[#e5e7eb] bg-white shadow-2xl p-3 sm:p-5" style={{ opacity: 0 }}>
            {/* Export bar */}
            <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-2 sm:pb-3 mb-2.5 sm:mb-4">
              <span className="font-mono text-[8px] sm:text-[9px] text-[#0a0a0f] font-bold uppercase tracking-wider">VECTOR_CANVAS // 300 DPI</span>
              <div className="w-24 sm:w-32 h-1.5 sm:h-2 border border-[#e5e7eb] bg-[#f3f4f6] overflow-hidden">
                <div className="export-bar anim h-full bg-[#0A5CF0]" style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />
              </div>
            </div>

            {/* Artboard */}
            <div className="relative border border-[#e5e7eb] bg-[#f8f9fc] p-3 sm:p-5" style={{ aspectRatio: "4/3" }}>
              {/* Corner Handles */}
              {[["0",  "0"],  ["0", "auto"],  ["auto", "0"],  ["auto", "auto"]].map(([t,b], i) => (
                <span key={i}
                  className="canvas-handle anim absolute w-1.5 sm:w-2 h-1.5 sm:h-2 border-2 bg-white"
                  style={{
                    borderColor: "#0A5CF0",
                    top:    t === "0" ? -3 : "auto", bottom: t === "auto" ? -3 : "auto",
                    left:   b === "0" ? -3 : "auto", right:  b === "auto" ? -3 : "auto",
                    opacity: 0,
                  }}
                />
              ))}
              {/* Dark rect */}
              <div className="canvas-dark anim mb-2 sm:mb-3" style={{ height: 28, background: "#0a0a0f", transform: "scaleX(0)", transformOrigin: "left center" }} />
              {/* Text bars */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="canvas-bar anim h-2 sm:h-2.5 w-full bg-[#e5e7eb]" style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />
                <div className="canvas-bar anim h-2 sm:h-2.5 w-2/3 bg-[#e5e7eb]" style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />
              </div>
              {/* Blue accent */}
              <div className="canvas-accent anim absolute bottom-3 sm:bottom-5 left-3 sm:left-5 w-10 sm:w-14 h-7 sm:h-10 bg-[#0A5CF0]" style={{ opacity: 0 }} />
            </div>
            <p className="font-mono text-[8px] sm:text-[9px] text-[#9ca3af] uppercase tracking-widest mt-2 sm:mt-3">EVERY PIXEL CRAFTED WITH PURPOSE</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 8 — VIDEO EDITING (Dark Slate #111827)
      ══════════════════════════════════════════════════════════════════ */}
      <div id="sc8" className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden" style={{ background: "#111827", zIndex: 1, opacity: 0, clipPath: "inset(0 100% 0 0)" }}>
        <Grid id="g8" color="rgba(10,92,240,0.06)" />

        <div className="relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0">
          <Eyebrow text="08 / DYNAMIC VIDEO PRODUCTION" light />
          <h2 className="font-headline font-black uppercase leading-[0.94] tracking-tight text-[#f8f9fc]"
              style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem,4.8vw,5.2rem)" }}>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>RAW FOOTAGE.</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>CINEMATIC</span>
            <span className="h-line anim block" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
              <span style={{ color: "#0A5CF0" }}>STORIES.</span>
            </span>
          </h2>
          <p className="sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#9ca3af]"
             style={{ fontFamily: "var(--font-mono)", opacity: 0 }}>
            Fast-paced reels, brand commercials and promotional cuts engineered to hook attention in the first 3 seconds.
          </p>
          <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {["4K 60FPS", "SOUND DESIGN", "RETENTION EDITS"].map((tag, i) => (
              <span key={i} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#374151] bg-[#0c1017] text-[#60a5fa] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0" aria-hidden="true">
          <div className="vid-monitor anim w-full max-w-[330px] sm:max-w-[390px] md:max-w-[460px] border border-[#374151] bg-[#0c1017] shadow-2xl p-3 sm:p-5" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between border-b border-[#1f2937] pb-1.5 sm:pb-2 mb-2 sm:mb-3">
              <span className="font-mono text-[8px] sm:text-[9px] text-white font-bold tracking-widest uppercase">TIMELINE // 4K 60FPS</span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#60a5fa]">TC: 00:01:24</span>
            </div>

            {/* Viewport */}
            <div className="relative border border-[#1f2937] bg-black h-24 sm:h-36 flex items-center justify-center overflow-hidden mb-2 sm:mb-3">
              <div className="vid-playbtn anim size-9 sm:size-12 rounded-full border-2 border-[#0A5CF0] bg-[#0A5CF0]/20 flex items-center justify-center" style={{ opacity: 0 }}>
                <span className="text-[#0A5CF0] text-xs sm:text-sm ml-0.5">▶</span>
              </div>
              <span className="absolute bottom-1.5 left-2 sm:bottom-2 sm:left-3 font-mono text-[7px] sm:text-[8px] bg-black/80 px-1.5 sm:px-2 py-0.5 text-white">
                REC.709 GRADE
              </span>
            </div>

            {/* Timeline tracks */}
            <div className="relative border border-[#1f2937] bg-[#131722] p-1.5 sm:p-2 space-y-1 sm:space-y-1.5">
              <div className="vid-playhead anim absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: "0%", boxShadow: "0 0 6px #fff" }} />
              {[
                { bg: "#0A5CF0", w: "88%" },
                { bg: "#3b82f6", w: "64%" },
                { bg: "#60a5fa", w: "76%", opacity: 0.6 },
              ].map((t, i) => (
                <div key={i} className="h-2 sm:h-3 bg-[#1e293b] overflow-hidden">
                  <div className="vid-track anim h-full" style={{ background: t.bg, width: t.w, opacity: t.opacity ?? 1, transform: "scaleX(0)", transformOrigin: "left center" }} />
                </div>
              ))}
              <div className="flex justify-between pt-1 border-t border-[#1f2937]">
                {["CUT", "COLOR", "EXPORT"].map((l, i) => (
                  <span key={i} className="vid-label anim font-mono text-[7px] sm:text-[8px] tracking-widest uppercase" style={{ color: i === 2 ? "#0A5CF0" : "rgba(248,249,252,0.35)", opacity: 0 }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Swipe Gesture Hint ───────────────────────────────────── */}
      <div className="sm:hidden absolute bottom-17 left-0 right-0 flex justify-center items-center pointer-events-none z-30" aria-hidden="true">
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/40 bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1.5">
          <span>‹</span>
          <span>SWIPE TO EXPLORE</span>
          <span>›</span>
        </span>
      </div>

      {/* ── HUD: 8 Dot Progress Indicators ──────────────────────────────── */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 flex justify-center gap-2 z-40 pointer-events-none" aria-hidden="true">
        {SERVICES.map((_, i) => (
          <span
            key={i}
            ref={el => { dotRefs.current[i] = el; }}
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.3)",
              background: "transparent",
              transition: "background 0.3s, border-color 0.3s",
            }}
          />
        ))}
      </div>

      {/* ── Bottom Control Bar ───────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#0a0a0f]/95 border-t border-[#1f2937] backdrop-blur-md px-4 sm:px-6 md:px-10 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Mobile active progress line along top edge */}
        <div className="sm:hidden absolute top-0 left-0 right-0 h-[2px] bg-[#1f2937] overflow-hidden">
          <div ref={progRefMobile} className="h-full bg-[#0A5CF0] shadow-[0_0_8px_#0A5CF0]" style={{ width: "0%" }} />
        </div>

        {/* Service label */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="font-mono text-[11px] sm:text-xs font-black text-[#0A5CF0] shrink-0">{currentSvc.num} / 08</span>
          <span className="font-headline font-bold text-xs sm:text-sm text-white uppercase tracking-wide truncate">
            {currentSvc.title}
          </span>
          <span className="hidden lg:inline font-mono text-[10px] text-[#4b5563] shrink-0">[{currentSvc.cat}]</span>
        </div>

        {/* Scene progress bar (Tablet & Desktop) */}
        <div className="hidden sm:flex flex-col gap-1 flex-1 max-w-xs mx-4">
          <div className="flex justify-between font-mono text-[8px] text-[#4b5563] uppercase">
            <span>SCENE TIMELINE</span>
            <span>AUTO-CYCLE</span>
          </div>
          <div className="w-full h-0.5 bg-[#1f2937]">
            <div ref={progRef} className="h-full bg-[#0A5CF0]" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => jump((activeIdx + 7) % 8)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 border border-[#1f2937] text-white active:bg-white/10 hover:border-[#0A5CF0] hover:text-[#0A5CF0] transition-colors font-mono text-xs cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="Previous (←)"
            aria-label="Previous slide"
          >
            ◀
          </button>
          <button
            onClick={togglePlay}
            className="px-2.5 sm:px-3 py-1.5 border border-[#1f2937] text-white active:bg-[#0842B0] hover:border-[#0A5CF0] hover:bg-[#0A5CF0] transition-all font-mono text-[9px] sm:text-[10px] font-bold cursor-pointer min-h-[32px]"
            title="Play/Pause (Space)"
            aria-label={playing ? "Pause animation" : "Play animation"}
          >
            {playing ? "⏸ PAUSE" : "▶ PLAY"}
          </button>
          <button
            onClick={() => jump((activeIdx + 1) % 8)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 border border-[#1f2937] text-white active:bg-white/10 hover:border-[#0A5CF0] hover:text-[#0A5CF0] transition-colors font-mono text-xs cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="Next (→)"
            aria-label="Next slide"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Reduced-motion fallback: Keeps Scene 1 cleanly static */}
      {motionOk === false && (
        <style>{`
          #sc1 { opacity:1!important; clip-path:none!important; visibility:visible!important; z-index:10!important; }
          #sc2,#sc3,#sc4,#sc5,#sc6,#sc7,#sc8 { display:none!important; }
          #sc1 .anim { opacity:1!important; clip-path:none!important; transform:none!important; }
        `}</style>
      )}
    </section>
  );
}
