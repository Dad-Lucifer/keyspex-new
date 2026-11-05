"use client";

import React, { useState } from "react";
import { X, UserPlus, ShieldAlert, CheckCircle2, Eye, EyeOff } from "lucide-react";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: () => void;
  defaultRole?: "employee" | "client";
}

export function CreateUserModal({
  isOpen,
  onClose,
  onUserCreated,
  defaultRole = "employee",
}: CreateUserModalProps) {
  const [role, setRole] = useState<"employee" | "client">(defaultRole);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("submitting");

    // Client-side quick validation matching backend schema
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setStatus("error");
      setErrorMessage(
        "Password must be at least 8 characters and include at least one uppercase letter and one digit."
      );
      return;
    }

    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("ks_access_token")
          : null;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          displayName: displayName.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error?.message ||
            (data?.error?.details
              ? data.error.details.map((d: any) => d.message).join(", ")
              : "Failed to create user. Please check permissions.")
        );
      }

      setStatus("success");
      if (onUserCreated) onUserCreated();
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to create user.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <UserPlus size={18} />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                Create Enterprise User
              </h3>
              <p className="font-mono text-[10px] text-[#64748b]">
                Add new team member or client account
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        {status === "success" ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 size={48} className="text-emerald-500 mb-2 animate-bounce" />
            <h4 className="font-bold text-sm text-[#0f172a]">User Created Successfully!</h4>
            <p className="text-xs text-[#64748b] mt-1">
              {displayName} has been provisioned with role &apos;{role}&apos;.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <ShieldAlert size={16} className="shrink-0 mt-0.5 text-red-600" />
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Role Selector Tabs */}
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Account Role *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("employee")}
                  className={`flex items-center justify-center rounded-xl border py-2 text-xs font-semibold transition-all ${
                    role === "employee"
                      ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                      : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
                  }`}
                >
                  Employee
                </button>
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={`flex items-center justify-center rounded-xl border py-2 text-xs font-semibold transition-all ${
                    role === "client"
                      ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                      : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
                  }`}
                >
                  Client
                </button>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Marcus Vance"
                className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@company.com"
                className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Temporary Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 chars, 1 uppercase, 1 digit"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2 pr-10 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a]"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="mt-1 font-mono text-[9px] text-[#94a3b8]">
                Must include 1 uppercase letter and 1 number (e.g. KeySpex2026!)
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={onClose}
                disabled={status === "submitting"}
                className="rounded-xl border border-[#e2e8f0] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1d4ed8] disabled:opacity-60"
              >
                {status === "submitting" ? "Provisioning..." : "Create Account →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

