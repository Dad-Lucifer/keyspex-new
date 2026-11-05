"use client";
import { useState, useId, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// ─── Validation schema (mirrors backend) ─────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .email("Enter a valid email address.")
    .toLowerCase()
    .trim(),
  password: z
    .string({ error: "Password is required." })
    .min(8, "Password must be at least 8 characters."),
});

type FormState = {
  email: string;
  password: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "submitting" | "error";

// ─── Eye icon (show/hide password) ───────────────────────────────────────────
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function LoginForm() {
  const id = useId();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err === "auth_required") {
      setGlobalError("Please sign in with your administrator account to access the dashboard.");
    } else if (err === "admin_only" || err === "unauthorized_role") {
      setGlobalError("Access restricted: Administrator privileges required.");
    } else if (err === "session_expired") {
      setGlobalError("Your session has expired. Please sign in again.");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name as keyof FormState]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setGlobalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    // Client-side validation
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormState;
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // send/receive cookies
          body: JSON.stringify(result.data),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        setGlobalError(json?.error?.message ?? "Login failed. Please try again.");
        setStatus("error");
        return;
      }

      // Store access token in memory / sessionStorage
      const { accessToken, user } = json.data;
      sessionStorage.setItem("ks_access_token", accessToken);
      sessionStorage.setItem("ks_user", JSON.stringify(user));

      // Set cookies for Next.js middleware and route protection (15m expiration, same as access token)
      document.cookie = `ks_token=${accessToken}; path=/; max-age=900; SameSite=Lax`;
      document.cookie = `ks_role=${user.role}; path=/; max-age=900; SameSite=Lax`;

      // Redirect based on role
      const role: string = user.role;
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "employee") {
        router.push("/dashboard/employee");
      } else {
        router.push("/dashboard/client");
      }
    } catch {
      setGlobalError("Unable to connect. Check your internet and try again.");
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Global error banner */}
      {globalError && (
        <div
          role="alert"
          className="flex items-start gap-3 border px-4 py-3 text-sm"
          style={{
            borderColor: "#fca5a5",
            background: "#fef2f2",
            color: "#991b1b",
          }}
        >
          <span className="mt-0.5 shrink-0 text-base leading-none">⚠</span>
          <p>{globalError}</p>
        </div>
      )}

      {/* Email field */}
      <div>
        <label
          htmlFor={`${id}-email`}
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "#5a5a65", fontFamily: "var(--font-mono)" }}
        >
          Email Address *
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="you@company.com"
          aria-describedby={fieldErrors.email ? `${id}-email-err` : undefined}
          aria-invalid={!!fieldErrors.email}
          className="w-full rounded-none border bg-white px-4 py-3.5 text-sm outline-none transition-all disabled:opacity-50"
          style={{
            borderColor: fieldErrors.email ? "#ef4444" : "#e0dbd3",
            color: "#1a1a1f",
          }}
          onFocus={(e) => {
            if (!fieldErrors.email) e.currentTarget.style.borderColor = "#0A5CF0";
          }}
          onBlur={(e) => {
            if (!fieldErrors.email) e.currentTarget.style.borderColor = "#e0dbd3";
          }}
        />
        {fieldErrors.email && (
          <p
            id={`${id}-email-err`}
            role="alert"
            className="mt-1.5 font-mono text-[10px] tracking-[0.1em]"
            style={{ color: "#ef4444", fontFamily: "var(--font-mono)" }}
          >
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Password field */}
      <div>
        <label
          htmlFor={`${id}-password`}
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "#5a5a65", fontFamily: "var(--font-mono)" }}
        >
          Password *
        </label>
        <div className="relative">
          <input
            id={`${id}-password`}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Min. 8 characters"
            aria-describedby={fieldErrors.password ? `${id}-pw-err` : undefined}
            aria-invalid={!!fieldErrors.password}
            className="w-full rounded-none border bg-white px-4 py-3.5 pr-12 text-sm outline-none transition-all disabled:opacity-50"
            style={{
              borderColor: fieldErrors.password ? "#ef4444" : "#e0dbd3",
              color: "#1a1a1f",
            }}
            onFocus={(e) => {
              if (!fieldErrors.password) e.currentTarget.style.borderColor = "#0A5CF0";
            }}
            onBlur={(e) => {
              if (!fieldErrors.password) e.currentTarget.style.borderColor = "#e0dbd3";
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors"
            style={{ color: "#9ca3af" }}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        {fieldErrors.password && (
          <p
            id={`${id}-pw-err`}
            role="alert"
            className="mt-1.5 font-mono text-[10px] tracking-[0.1em]"
            style={{ color: "#ef4444", fontFamily: "var(--font-mono)" }}
          >
            {fieldErrors.password}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-none text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 disabled:opacity-60"
        style={{ background: isSubmitting ? "#374151" : "var(--brand)" }}
      >
        {isSubmitting ? (
          <>
            <span
              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
              aria-hidden="true"
            />
            Signing in...
          </>
        ) : (
          "Sign In →"
        )}
      </button>

      {/* Bottom note */}
      <p
        className="text-center font-mono text-[9px] tracking-[0.1em] uppercase"
        style={{ color: "#9ca3af", fontFamily: "var(--font-mono)" }}
      >
        Your session is encrypted and protected.
      </p>
    </form>
  );
}
