/* eslint-disable */
// KeySpex HeroTicker — dual-direction ticker with real services

const ROW_1 = [
  { label: "PORTFOLIO WEBSITE", num: "01" },
  { label: "BUSINESS DASHBOARD", num: "02" },
  { label: "STORE MANAGEMENT", num: "03" },
  { label: "GOOGLE BUSINESS SEO", num: "04" },
];

const ROW_2 = [
  { label: "SOCIAL MEDIA MARKETING", num: "05" },
  { label: "SOCIAL CAMPAIGNS", num: "06" },
  { label: "GRAPHIC DESIGNING", num: "07" },
  { label: "VIDEO EDITING", num: "08" },
];

function TickerRow({
  items,
  direction = "ltr",
  speed = 38,
}: {
  items: { label: string; num: string }[];
  direction?: "ltr" | "rtl";
  speed?: number;
}) {
  // Quadruple for seamless loop on ultra-wide screens
  const list = [...items, ...items, ...items, ...items];
  const animName = direction === "rtl" ? "ticker-rtl" : "ticker-ltr";

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex whitespace-nowrap w-max hover:[animation-play-state:paused] active:[animation-play-state:paused] cursor-grab active:cursor-grabbing"
        style={{ animation: `${animName} ${speed}s linear infinite` }}
      >
        {list.map(({ label, num }, i) => (
          <span
            key={i}
            className="inline-flex items-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {/* Number tag */}
            <span
              className="text-[8px] sm:text-[9px] tracking-[0.15em] mr-1.5 sm:mr-2 font-bold"
              style={{ color: "#0A5CF0" }}
            >
              {num}
            </span>
            {/* Label */}
            <span
              className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "#ffffff" }}
            >
              {label}
            </span>
            {/* Separator */}
            <span
              className="mx-3.5 sm:mx-6 text-xs sm:text-base leading-none select-none"
              style={{ color: "#0A5CF0", fontWeight: 900 }}
              aria-hidden="true"
            >
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroTicker() {
  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ background: "#0a0a0f", borderTop: "1px solid #1f2937", borderBottom: "1px solid #1f2937" }}
      aria-hidden="true"
    >
      {/* Luxury edge gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />

      {/* Row 1 — left to right */}
      <div className="py-2 sm:py-2.5 border-b" style={{ borderColor: "#1a2234" }}>
        <TickerRow items={ROW_1} direction="ltr" speed={32} />
      </div>

      {/* Row 2 — right to left */}
      <div className="py-2 sm:py-2.5">
        <TickerRow items={ROW_2} direction="rtl" speed={28} />
      </div>

      <style>{`
        @keyframes ticker-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-rtl {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
