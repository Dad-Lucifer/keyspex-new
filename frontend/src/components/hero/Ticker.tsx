interface TickerProps {
  items: string[];
}

export function Ticker({ items }: TickerProps) {
  // Quadruple items to prevent any gaps on ultra-wide screens
  const row = [...items, ...items, ...items, ...items];

  return (
    <div
      data-ticker
      className="overflow-hidden border-y bg-white py-5"
      style={{ borderColor: "var(--line)" }}
      aria-hidden="true"
    >
      <div
        className="marquee-track flex w-max font-mono text-xs uppercase tracking-[0.18em]"
        style={{ color: "var(--ink)" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="font-semibold">{t}</span>
            <span
              className="mx-6 select-none font-bold"
              style={{ color: "var(--brand-bright)" }}
            >
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
