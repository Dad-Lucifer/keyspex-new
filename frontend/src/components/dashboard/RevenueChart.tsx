"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { getRevenueData, RevenueChartData } from "@/lib/api";

interface RevenueChartProps {
  currency: "INR" | "USD" | "EUR";
}

const FALLBACK_DATA: Record<"6M" | "YTD" | "1Y", { months: string[]; current: number[]; previous: number[] }> = {
  "6M": {
    months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct (Current)"],
    current: [2.8, 4.4, 5.2, 5.8, 6.4, 8.45], // in Lakhs
    previous: [2.1, 3.8, 4.2, 4.9, 5.1, 6.2],
  },
  YTD: {
    months: ["Jan", "Mar", "May", "Jul", "Sep", "Oct (Current)"],
    current: [1.8, 3.2, 4.4, 5.8, 7.1, 8.45],
    previous: [1.2, 2.5, 3.8, 4.9, 5.6, 6.2],
  },
  "1Y": {
    months: ["Nov '23", "Feb '24", "Apr '24", "Jun '24", "Aug '24", "Oct '24"],
    current: [1.5, 2.9, 4.1, 5.4, 6.8, 8.45],
    previous: [1.1, 2.2, 3.2, 4.3, 5.1, 6.2],
  },
};

export function RevenueChart({ currency }: RevenueChartProps) {
  const [period, setPeriod] = useState<"6M" | "YTD" | "1Y">("6M");
  const [chartData, setChartData] = useState<{
    months: string[];
    current: number[];
    previous: number[];
  }>(FALLBACK_DATA["6M"]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getRevenueData(period)
      .then((data: RevenueChartData) => {
        if (!isMounted || !data || !data.months || data.months.length === 0) {
          setChartData(FALLBACK_DATA[period]);
          return;
        }

        // Convert raw INR to Lakhs (1 Lakh = 100,000 INR)
        const currentInLakhs = data.current.map((v) => Math.round((v / 100000) * 100) / 100);
        const prevInLakhs = data.previous.map((v) => Math.round((v / 100000) * 100) / 100);

        setChartData({
          months: data.months,
          current: currentInLakhs.length > 0 ? currentInLakhs : FALLBACK_DATA[period].current,
          previous: prevInLakhs.length > 0 ? prevInLakhs : FALLBACK_DATA[period].previous,
        });
        setHoveredIdx(data.months.length - 1);
      })
      .catch(() => {
        if (isMounted) {
          setChartData(FALLBACK_DATA[period]);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [period]);

  const formatLakhs = (valInLakhs: number) => {
    const rawInr = valInLakhs * 100000;
    if (currency === "USD") {
      const usdVal = Math.round(rawInr / 84);
      return `$${usdVal.toLocaleString("en-US")}`;
    }
    if (currency === "EUR") {
      const eurVal = Math.round(rawInr / 91);
      return `€${eurVal.toLocaleString("en-US")}`;
    }
    return `₹${valInLakhs.toFixed(2)}L`;
  };

  const currentPoints = chartData.current.length > 0 ? chartData.current : [0, 0];
  const previousPoints = chartData.previous.length > 0 ? chartData.previous : [0, 0];
  const maxVal = Math.max(10, ...currentPoints, ...previousPoints);

  // SVG coordinate calculations for smooth bezier curve (viewBox 0 0 600 220)
  const getCoords = (data: number[]) => {
    const len = data.length;
    const xStep = len > 1 ? 520 / (len - 1) : 520;
    return data.map((val, i) => {
      const x = 40 + i * xStep;
      const y = Math.max(20, Math.min(190, 190 - (val / maxVal) * 170));
      return { x, y, val };
    });
  };

  const currentCoords = getCoords(currentPoints);
  const prevCoords = getCoords(previousPoints);

  // Cubic bezier path builder
  const createPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      d += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const currentPath = createPath(currentCoords);
  const prevPath = createPath(prevCoords);
  const areaPath =
    currentCoords.length > 0
      ? `${currentPath} L ${currentCoords[currentCoords.length - 1].x} 190 L ${currentCoords[0].x} 190 Z`
      : "";

  const latestVal = currentPoints[currentPoints.length - 1] ?? 8.45;
  const projectedVal = Math.round((latestVal * 1.09) * 10) / 10;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
      {/* Card Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#f1f5f9]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-base sm:text-lg font-bold text-[#0f172a]">
              Revenue Overview
            </h3>
            <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#2563eb]">
              H1/H2 FY24
            </span>
            {isLoading && <Loader2 size={13} className="animate-spin text-blue-500" />}
          </div>
          <p className="mt-0.5 text-xs text-[#64748b]">
            Comparative trajectory across trailing periods
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs font-medium text-[#475569]">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-[#2563eb]" />
              Current
            </span>
            <span className="flex items-center gap-1.5 text-[#94a3b8]">
              <span className="h-2.5 w-2.5 rounded-xs bg-[#cbd5e1]" />
              Previous
            </span>
          </div>

          {/* Timeframe Tabs */}
          <div className="flex rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-0.5">
            {(["6M", "YTD", "1Y"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setPeriod(t)}
                className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold transition-all ${
                  period === t
                    ? "bg-white text-[#0f172a] shadow-xs"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative my-4 w-full overflow-hidden">
        {/* Tooltip */}
        {hoveredIdx !== null && currentCoords[hoveredIdx] && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl border border-[#e2e8f0] bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-xs transition-all duration-150"
            style={{
              left: `${(currentCoords[hoveredIdx].x / 600) * 100}%`,
              top: `${(currentCoords[hoveredIdx].y / 220) * 100}%`,
            }}
          >
            <p className="font-mono text-[10px] font-bold text-[#64748b] uppercase">
              {chartData.months[hoveredIdx] || `Point ${hoveredIdx + 1}`}
            </p>
            <p className="font-headline text-xs font-black text-[#2563eb]">
              {formatLakhs(chartData.current[hoveredIdx] || 0)}
            </p>
          </div>
        )}

        <svg
          viewBox="0 0 600 220"
          className="w-full h-48 sm:h-60 overflow-visible"
        >
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[
            { val: `₹${Math.round(maxVal)}L`, y: 20 },
            { val: `₹${Math.round(maxVal * 0.8)}L`, y: 54 },
            { val: `₹${Math.round(maxVal * 0.6)}L`, y: 88 },
            { val: `₹${Math.round(maxVal * 0.4)}L`, y: 122 },
            { val: `₹${Math.round(maxVal * 0.2)}L`, y: 156 },
            { val: "₹0", y: 190 },
          ].map((grid, i) => (
            <g key={i}>
              <text
                x="5"
                y={grid.y + 4}
                fill="#94a3b8"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {grid.val}
              </text>
              <line
                x1="40"
                y1={grid.y}
                x2="580"
                y2={grid.y}
                stroke="#f1f5f9"
                strokeWidth="1"
                strokeDasharray={i === 5 ? "none" : "3 3"}
              />
            </g>
          ))}

          {/* Area Fill */}
          {areaPath && <path d={areaPath} fill="url(#revenueFill)" />}

          {/* Previous Trajectory Line */}
          {prevPath && (
            <path
              d={prevPath}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          )}

          {/* Current Trajectory Line */}
          {currentPath && (
            <path
              d={currentPath}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Interactive Data Points */}
          {currentCoords.map((pt, i) => (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            >
              <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === i ? 6 : 4}
                fill="white"
                stroke="#2563eb"
                strokeWidth={hoveredIdx === i ? 3 : 2}
                className="transition-all duration-200"
              />
            </g>
          ))}

          {/* X Axis Month Labels */}
          {chartData.months.map((m, i) => {
            const x = currentCoords[i]?.x ?? 40;
            const isCurrent = i === chartData.months.length - 1;
            return (
              <text
                key={i}
                x={x}
                y="212"
                textAnchor="middle"
                fill={isCurrent ? "#2563eb" : "#64748b"}
                fontWeight={isCurrent ? "bold" : "normal"}
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {m}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Card Footer Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-[#f1f5f9] text-xs">
        <span className="flex items-center gap-1.5 font-medium text-[#0f172a]">
          <span className="text-base leading-none">📈</span>
          Monthly run-rate projected to breach{" "}
          <strong className="text-[#2563eb] font-bold">
            {formatLakhs(projectedVal)}
          </strong>{" "}
          in Nov 2024.
        </span>

        <button
          type="button"
          onClick={() => {}}
          className="mt-2 sm:mt-0 flex items-center gap-1 font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
        >
          <span>Full Financials</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
