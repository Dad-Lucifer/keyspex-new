// frontend/src/components/employee/EmployeeProfileModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  UserCheck,
  Globe,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import { useEmployee } from "@/context/EmployeeContext";
import { getInitials } from "@/lib/utils";

export function EmployeeProfileModal() {
  const { user, isProfileModalOpen, closeProfileModal, refresh } = useEmployee();
  const initials = getInitials(user?.displayName);

  // Form State
  const [displayName, setDisplayName] = useState("");
  const [title, setTitle] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bio, setBio] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  // Status State
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Populate form with live user data whenever modal opens
  useEffect(() => {
    if (isProfileModalOpen && user) {
      setDisplayName(user.displayName || "");
      setTitle(user.title || "");
      setContactNo(user.contactNo || "");
      setContactEmail(user.contactEmail || user.email || "");
      setBio(user.bio || "");
      setPortfolioUrl(user.portfolioUrl || "");
      setSuccessMsg(null);
      setErrorMsg(null);
    }
  }, [isProfileModalOpen, user]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProfileModal();
    };
    if (isProfileModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileModalOpen, closeProfileModal]);

  if (!isProfileModalOpen) return null;

  // Save Changes Handler
  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      setErrorMsg("Full name is required.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const token = sessionStorage.getItem("ks_access_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      // 1. Update backend user record
      if (user?.uid && token) {
        await fetch(`${apiUrl}/api/users/${user.uid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            displayName: displayName.trim(),
            contactNo: contactNo.trim(),
            contactEmail: contactEmail.trim(),
            portfolioUrl: portfolioUrl.trim(),
          }),
        }).catch(() => {});
      }

      // 2. Persist locally to session storage
      const stored = sessionStorage.getItem("ks_user");
      const parsed = stored ? JSON.parse(stored) : {};
      const updatedUser = {
        ...parsed,
        displayName: displayName.trim(),
        title: title.trim(),
        contactNo: contactNo.trim(),
        contactEmail: contactEmail.trim(),
        portfolioUrl: portfolioUrl.trim(),
        bio: bio.trim(),
      };
      sessionStorage.setItem("ks_user", JSON.stringify(updatedUser));

      await refresh();
      setSuccessMsg("Profile information updated successfully!");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProfileModal();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#004AC6] text-white font-bold text-sm flex items-center justify-center ring-2 ring-blue-100 shadow-xs">
              {initials}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {displayName || "Employee Profile"}
              </h2>
              <p className="text-xs text-slate-500">
                {title || "Team Member"} • {user?.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeProfileModal}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-xs transition-colors cursor-pointer"
            aria-label="Close profile modal"
          >
            <X className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Feedback Alerts */}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-800 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004AC6] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Designation / Job Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004AC6] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work Email (Read Only)
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contact Phone Number
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004AC6] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Professional Bio / Summary
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell team members and administrators about your core expertise, key libraries, and engineering focus..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004AC6] focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Portfolio / GitHub / LinkedIn Link
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/your-username"
                className="w-full pl-9 pr-20 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004AC6] focus:bg-white"
              />
              {portfolioUrl && (
                <a
                  href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#004AC6] font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-slate-50">
          <p className="text-[11px] text-slate-400">
            Changes will update your employee profile across KeySpex.
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={closeProfileModal}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}