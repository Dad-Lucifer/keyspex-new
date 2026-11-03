"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function KeyMotif() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const strokeElements = svgRef.current?.querySelectorAll(".motif-stroke");
      if (strokeElements && strokeElements.length > 0) {
        gsap.fromTo(
          strokeElements,
          { strokeDashoffset: 1000, strokeDasharray: 1000 },
          { strokeDashoffset: 0, duration: 1.4, ease: "power3.out", delay: 0.2, stagger: 0.15 }
        );
      }

      const fadeElements = svgRef.current?.querySelectorAll(".motif-fade");
      if (fadeElements && fadeElements.length > 0) {
        gsap.fromTo(
          fadeElements,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
        );
      }
    });
  }, { scope: svgRef });

  return (
    <div
      className="pointer-events-none absolute right-[-8%] top-1/2 hidden -translate-y-1/2 select-none md:block md:w-[480px] lg:w-[620px] xl:w-[720px] overflow-hidden opacity-[0.88]"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full overflow-visible"
      >
        <defs>
          <linearGradient id="keyGradient" x1="120" y1="480" x2="480" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0842B0" />
            <stop offset="50%" stopColor="#0A5CF0" />
            <stop offset="100%" stopColor="#0068FE" />
          </linearGradient>
          <linearGradient id="ringGradient" x1="380" y1="80" x2="520" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0068FE" />
            <stop offset="100%" stopColor="#3884FF" />
          </linearGradient>
        </defs>

        {/* Faint ambient blueprint grid lines */}
        <g opacity="0.15" stroke="#0E0F12" strokeWidth="1" strokeDasharray="4 6">
          <circle cx="450" cy="150" r="140" />
          <line x1="80" y1="150" x2="550" y2="150" />
          <line x1="450" y1="50" x2="450" y2="550" />
          <line x1="60" y1="540" x2="540" y2="60" />
        </g>

        {/* The Black Block "K" Stem */}
        <rect
          className="motif-fade"
          x="100"
          y="100"
          width="54"
          height="400"
          rx="10"
          fill="#0E0F12"
          opacity="0.95"
        />

        {/* The Lower Diagonal Leg */}
        <path
          className="motif-fade"
          d="M154 320L360 500H440L234 320H154Z"
          fill="#0842B0"
          opacity="0.9"
        />

        {/* The Thick Diagonal Key Shaft */}
        <path
          className="motif-stroke"
          d="M154 300L390 140"
          stroke="url(#keyGradient)"
          strokeWidth="48"
          strokeLinecap="round"
        />

        {/* Key Bits / Notches */}
        <path
          className="motif-fade"
          d="M320 186L348 142L378 162L350 206Z"
          fill="#0068FE"
        />
        <path
          className="motif-fade"
          d="M260 228L284 192L310 208L286 244Z"
          fill="#0A5CF0"
        />

        {/* The Key Ring at Top Right */}
        <circle
          className="motif-stroke"
          cx="450"
          cy="150"
          r="84"
          stroke="url(#ringGradient)"
          strokeWidth="38"
          fill="none"
        />

        {/* Inner Ring Opening */}
        <circle
          cx="450"
          cy="150"
          r="48"
          fill="#FFFFFF"
        />

        {/* Accent Center Dot */}
        <circle
          className="motif-fade"
          cx="450"
          cy="150"
          r="10"
          fill="#0068FE"
        />
      </svg>
    </div>
  );
}
