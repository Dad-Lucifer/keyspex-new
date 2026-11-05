import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/content/site";

export const metadata: Metadata = {
  title: "Sign In — KeySpex",
  description: "Sign in to your KeySpex account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)", color: "var(--ink)" }}
    >
      {/* Top bar */}
      <header className="border-b border-[#e0dbd3] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link
              href="/"
              className="flex items-center gap-3 font-headline text-2xl lg:text-3xl font-bold tracking-tight text-[#1a1a1f] transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-headline)" }}
              aria-label="KeySpex home"
            >
              <div className="relative size-7 shrink-0">
                <Image
                  src="/brand/icon.png"
                  alt="KeySpex mark"
                  fill
                  className="object-contain"
                  sizes="28px"
                />
              </div>
              <span>
                KEYSPEX<span style={{ color: "var(--brand)" }}>.</span>
              </span>
            </Link>
        <p
          className="font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ color: "var(--muted)" }}
        >
          Secure Portal
        </p>
      </header>

      {/* Center content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Eyebrow */}
          <p
            className="mb-3 font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--brand)", fontFamily: "var(--font-mono)" }}
          >
            KeySpex · Team Portal
          </p>

          {/* Headline */}
          <h1
            className="mb-2 font-headline font-black uppercase tracking-tight leading-[0.95]"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--ink)",
            }}
          >
            Sign in to your{" "}
            <span style={{ color: "var(--brand)" }}>account.</span>
          </h1>
          <p
            className="mb-10 text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            One portal for all roles — admin, employee and client.
          </p>

          {/* Card */}
          <div
            className="border border-[#e0dbd3] p-8 md:p-10"
            style={{ background: "#ffffff" }}
          >
            <LoginForm />
          </div>

          {/* Footer note */}
          <p
            className="mt-6 text-center font-mono text-[9px] tracking-[0.12em] uppercase"
            style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
          >
            Access is by invitation only.{" "}
            <Link
              href="/#contact"
              className="underline underline-offset-2 transition-colors hover:text-[var(--brand)]"
            >
              Contact us
            </Link>{" "}
            to get started.
          </p>
        </div>
      </main>

      {/* Bottom */}
      <footer
        className="border-t border-[#e0dbd3] px-6 py-5 text-center font-mono text-[9px] tracking-[0.1em] uppercase"
        style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
      >
        © 2026 KeySpex. All rights reserved.
      </footer>
    </div>
  );
}
