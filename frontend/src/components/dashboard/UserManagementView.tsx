"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Building,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  RefreshCw,
  ArrowLeft,
  Shield,
  Clock,
  MoreVertical,
} from "lucide-react";
import { CreateUserModal } from "./CreateUserModal";

interface UserRecordItem {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "employee" | "client";
  active: boolean;
  createdAt?: any;
  lastLoginAt?: any;
  contactNo?: string;
  contactEmail?: string;
  portfolioUrl?: string;
}

interface UserManagementViewProps {
  roleFilter: "employee" | "client";
  onBackToDashboard: () => void;
  onRefreshStats?: () => void;
}

export function UserManagementView({
  roleFilter,
  onBackToDashboard,
  onRefreshStats,
}: UserManagementViewProps) {
  const [users, setUsers] = useState<UserRecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Fallback demo users if backend is offline or empty
  const defaultDemoUsers: UserRecordItem[] =
    roleFilter === "employee"
      ? [
          {
            uid: "emp-1001",
            email: "riya.sharma@brand.com",
            displayName: "Riya Sharma",
            role: "employee",
            active: true,
            lastLoginAt: "Today, 10:45 AM",
          },
          {
            uid: "emp-1002",
            email: "marcus.vance@brand.com",
            displayName: "Marcus Vance",
            role: "employee",
            active: true,
            lastLoginAt: "Yesterday, 04:30 PM",
          },
          {
            uid: "emp-1003",
            email: "priya.nair@brand.com",
            displayName: "Priya Nair",
            role: "employee",
            active: true,
            lastLoginAt: "2 days ago",
          },
          {
            uid: "emp-1004",
            email: "rahul.verma@brand.com",
            displayName: "Rahul Verma",
            role: "employee",
            active: false,
            lastLoginAt: "Last week",
          },
        ]
      : [
          {
            uid: "cli-2001",
            email: "contact@apexglobal.com",
            displayName: "Apex Global Corp",
            role: "client",
            active: true,
            lastLoginAt: "Yesterday, 02:15 PM",
          },
          {
            uid: "cli-2002",
            email: "billing@nexasystems.io",
            displayName: "Nexa Systems",
            role: "client",
            active: true,
            lastLoginAt: "3 days ago",
          },
          {
            uid: "cli-2003",
            email: "ops@vertexlabs.com",
            displayName: "Vertex Labs",
            role: "client",
            active: true,
            lastLoginAt: "5 days ago",
          },
          {
            uid: "cli-2004",
            email: "admin@novacustoms.in",
            displayName: "Nova Customs",
            role: "client",
            active: true,
            lastLoginAt: "Oct 18, 2024",
          },
        ];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("ks_access_token")
          : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/users?role=${roleFilter}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Unable to fetch users from backend, using current state.");
      }

      const json = await res.json();
      if (json?.data?.users && json.data.users.length > 0) {
        setUsers(json.data.users);
      } else {
        setUsers(defaultDemoUsers);
      }
    } catch {
      setUsers(defaultDemoUsers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const toggleStatus = async (user: UserRecordItem) => {
    const updatedStatus = !user.active;
    // Optimistic update
    setUsers((prev) =>
      prev.map((u) => (u.uid === user.uid ? { ...u, active: updatedStatus } : u))
    );

    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("ks_access_token")
          : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      await fetch(`${apiUrl}/api/users/${user.uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ active: updatedStatus }),
      });

      setActionMessage(
        `Account for ${user.displayName} is now ${
          updatedStatus ? "Active" : "Deactivated"
        }.`
      );
      setTimeout(() => setActionMessage(null), 3000);
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.warn("Status toggle backend error:", err);
    }
  };

  const deleteUser = async (uid: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return;
    }

    setUsers((prev) => prev.filter((u) => u.uid !== uid));

    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("ks_access_token")
          : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      await fetch(`${apiUrl}/api/users/${uid}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      setActionMessage(`User ${name} has been permanently deleted.`);
      setTimeout(() => setActionMessage(null), 3000);
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.warn("Delete user backend error:", err);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#475569] hover:bg-white hover:text-[#0f172a] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-lg sm:text-xl font-bold text-[#0f172a]">
                {roleFilter === "employee" ? "Team Directory" : "Client Accounts"}
              </h2>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#2563eb]">
                {users.length} Total
              </span>
            </div>
            <p className="text-xs text-[#64748b]">
              Manage credentials, permissions, and status in Firestore & Auth
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchUsers}
            className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f8fafc] shadow-2xs"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span>Sync</span>
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1d4ed8]"
          >
            <Plus size={15} />
            <span>Add {roleFilter === "employee" ? "Employee" : "Client"}</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Directory Table Card */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
        {/* Table Search Toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-9 pr-3 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#64748b]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>
              {users.filter((u) => u.active).length} Active
            </span>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#f1f5f9] font-mono text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                <th className="py-3 px-3">User & Contact</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last Login</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#94a3b8]">
                    No accounts found matching search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-[#f8fafc] transition-colors">
                    {/* User & Contact */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 font-mono text-xs font-bold text-[#1d4ed8]">
                          {user.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0f172a]">
                            {user.displayName}
                          </p>
                          <p className="font-mono text-[10px] text-[#64748b]">
                            {user.email}
                          </p>
                          {(user.contactNo || user.contactEmail || user.portfolioUrl) && (
                            <div className="flex flex-wrap items-center gap-2 mt-0.5 font-mono text-[10px] text-[#64748b]">
                              {user.contactNo && <span>{user.contactNo}</span>}
                              {user.contactEmail && user.contactEmail !== user.email && (
                                <span>• {user.contactEmail}</span>
                              )}
                              {user.portfolioUrl && (
                                <a
                                  href={
                                    user.portfolioUrl.startsWith("http://") ||
                                    user.portfolioUrl.startsWith("https://")
                                      ? user.portfolioUrl
                                      : `https://${user.portfolioUrl}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#2563eb] hover:underline"
                                >
                                  ↗ Portfolio
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-3">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569]">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => toggleStatus(user)}
                        title="Click to toggle status"
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold transition-transform active:scale-95 ${
                          user.active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.active ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        />
                        {user.active ? "Active" : "Deactivated"}
                      </button>
                    </td>

                    {/* Last Login */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#64748b]">
                      {user.lastLoginAt ? String(user.lastLoginAt) : "Never logged in"}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => toggleStatus(user)}
                          title={user.active ? "Deactivate account" : "Activate account"}
                          className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
                        >
                          {user.active ? <XCircle size={15} /> : <CheckCircle2 size={15} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteUser(user.uid, user.displayName)}
                          title="Delete user"
                          className="rounded-lg p-1.5 text-[#64748b] hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRole={roleFilter}
        onUserCreated={() => {
          fetchUsers();
          if (onRefreshStats) onRefreshStats();
        }}
      />
    </div>
  );
}

