import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "wordmark" | "full" | "icon";
  className?: string;
  theme?: "light" | "dark";
}

export function BrandLogo({ variant = "wordmark", className = "", theme = "light" }: BrandLogoProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
      aria-label="KeySpex — Custom digital solutions for real businesses"
    >
      {/* Inline SVG Key Emblem echoing the real logo */}
      <div className="relative flex size-8 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Vertical K-stem in solid ink/paper */}
          <rect
            x="4"
            y="4"
            width="6"
            height="28"
            rx="1.5"
            fill={isDark ? "#FFFFFF" : "#0E0F12"}
          />
          {/* Lower diagonal leg */}
          <path
            d="M9 19L24 32H30L15 19H9Z"
            fill={isDark ? "#3884FF" : "#0842B0"}
          />
          {/* Upper diagonal key shaft & ring head */}
          <path
            d="M9 18L21 7.5L25 11.5L14 21.5H9V18Z"
            fill={isDark ? "#60A5FA" : "#0068FE"}
          />
          {/* Key Ring (Circular Head at top right) */}
          <circle
            cx="25.5"
            cy="10.5"
            r="6"
            stroke={isDark ? "#60A5FA" : "#0068FE"}
            strokeWidth="3"
            fill="none"
          />
          {/* Key notch/bit */}
          <rect
            x="20"
            y="5"
            width="2.5"
            height="4"
            rx="0.5"
            fill={isDark ? "#60A5FA" : "#0068FE"}
            transform="rotate(45 20 5)"
          />
        </svg>
      </div>

      {/* Typography wordmark */}
      <div className="flex flex-col">
        <span
          className="font-extrabold tracking-tight leading-none text-xl md:text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span style={{ color: isDark ? "#FFFFFF" : "#0E0F12" }}>Key</span>
          <span style={{ color: "var(--brand)" }}>Spex</span>
        </span>
      </div>
    </Link>
  );
}

/**
 * Optional component to render the high-res raster logo from assets when desired
 */
export function BrandImageLogo({ width = 160, height = 48, className = "" }: { width?: number; height?: number; className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`} aria-label="KeySpex home">
      <Image
        src="/brand/keyspex-logo-png.png"
        alt="KeySpex Logo"
        width={width}
        height={height}
        className="h-auto w-auto object-contain"
        priority
      />
    </Link>
  );
}
