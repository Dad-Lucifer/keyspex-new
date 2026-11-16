// frontend/src/context/EmployeeContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";

export type EmployeeTabKey =
  | "overview"
  | "projects"
  | "tasks"
  | "salary"
  | "payments"
  | "slips"
  | "contracts";

export type CurrencyCode = "INR" | "USD" | "EUR";

const CURRENCY_RATES: Record<
  CurrencyCode,
  { rate: number; symbol: string; locale: string }
> = {
  INR: { rate: 1, symbol: "₹", locale: "en-IN" },
  USD: { rate: 1 / 84, symbol: "$", locale: "en-US" },
  EUR: { rate: 1 / 91, symbol: "€", locale: "de-DE" },
};

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  linkUrl: string;
  tags?: string[];
}

export interface EmployeeUser {
  uid: string;
  displayName: string;
  email: string;
  title: string;
  baseSalary: number;
  contactNo?: string;
  contactEmail?: string;
  portfolioUrl?: string;
  bio?: string;
  portfolioItems?: PortfolioItem[];
}

export interface EmployeeStats {
  monthlySalary: number;
  projectEarnings?: number;
  totalProjectValue?: number;
  activeProjects: number;
  inProgressProjects: number;
  completedProjects: number;
  pendingTasks: number;
  completedTasks: number;
  dueThisWeekTasks?: number;
  sprintVelocity?: string;
}

export interface EmployeeContextData {
  user: EmployeeUser;
  stats: EmployeeStats;
  projects: any[];
  tasks: any[];
  contracts: any[];
  paymentEntries: any[];
  latestSalary: any;
  salaryHistory: any[];
  loading: boolean;
  refresh: () => Promise<void>;
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  currentTab: EmployeeTabKey;
  setCurrentTab: (tab: EmployeeTabKey) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatCurrency: (amountInInr: number) => string;
}

const DEFAULT_STATE: Omit<
  EmployeeContextData,
  | "loading"
  | "refresh"
  | "isProfileModalOpen"
  | "openProfileModal"
  | "closeProfileModal"
  | "currentTab"
  | "setCurrentTab"
  | "currency"
  | "setCurrency"
  | "formatCurrency"
> = {
  user: {
    uid: "",
    displayName: "Employee",
    email: "",
    title: "Team Member",
    baseSalary: 0,
    contactNo: "",
    contactEmail: "",
    portfolioUrl: "",
    bio: "",
    portfolioItems: [],
  },
  stats: {
    monthlySalary: 0,
    projectEarnings: 0,
    totalProjectValue: 0,
    activeProjects: 0,
    inProgressProjects: 0,
    completedProjects: 0,
    pendingTasks: 0,
    completedTasks: 0,
    dueThisWeekTasks: 0,
    sprintVelocity: "No tasks yet",
  },
  projects: [],
  tasks: [],
  contracts: [],
  paymentEntries: [],
  latestSalary: null,
  salaryHistory: [],
};

const EmployeeContext = createContext<EmployeeContextData | null>(null);

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentTab, setCurrentTabState] = useState<EmployeeTabKey>("overview");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  const formatCurrency = (amountInInr: number): string => {
    const cfg = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    const converted = Math.round((Number(amountInInr) || 0) * cfg.rate);
    return `${cfg.symbol}${converted.toLocaleString(cfg.locale)}`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const syncTabFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const tabParam = (params.get("tab") as EmployeeTabKey) || "overview";
        if (
          [
            "overview",
            "projects",
            "tasks",
            "salary",
            "payments",
            "slips",
            "contracts",
          ].includes(tabParam)
        ) {
          setCurrentTabState(tabParam);
        }
      };

      syncTabFromUrl();
      window.addEventListener("popstate", syncTabFromUrl);
      return () => window.removeEventListener("popstate", syncTabFromUrl);
    }
  }, []);

  const setCurrentTab = (tab: EmployeeTabKey) => {
    setCurrentTabState(tab);
    if (typeof window !== "undefined") {
      const url =
        tab === "overview"
          ? "/dashboard/employee"
          : `/dashboard/employee?tab=${tab}`;
      window.history.pushState(null, "", url);
    }
  };

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const loadData = async () => {
    let sessionUser: Partial<EmployeeUser> = {};
    if (typeof window !== "undefined") {
      try {
        const storedStr = sessionStorage.getItem("ks_user");
        if (storedStr) {
          sessionUser = JSON.parse(storedStr);
        }
      } catch {}
    }

    const fallback: typeof DEFAULT_STATE = {
      user: {
        uid: sessionUser.uid || "",
        displayName: sessionUser.displayName || "Employee",
        email: sessionUser.email || "",
        title: (sessionUser as any)?.title || "Team Member",
        baseSalary: (sessionUser as any)?.baseSalary || 0,
        contactNo: (sessionUser as any)?.contactNo || "",
        contactEmail:
          (sessionUser as any)?.contactEmail || sessionUser.email || "",
        portfolioUrl: (sessionUser as any)?.portfolioUrl || "",
        bio: (sessionUser as any)?.bio || "",
      },
      stats: {
        monthlySalary: 0,
        projectEarnings: 0,
        totalProjectValue: 0,
        activeProjects: 0,
        inProgressProjects: 0,
        completedProjects: 0,
        pendingTasks: 0,
        completedTasks: 0,
        dueThisWeekTasks: 0,
        sprintVelocity: "No tasks yet",
      },
      projects: [],
      tasks: [],
      contracts: [],
      paymentEntries: [],
      latestSalary: null,
      salaryHistory: [],
    };

    try {
      const res = await fetchWithAuth<any>("/api/employee/dashboard");
      if (res?.data) {
        setData({
          user: {
            uid: res.data.user?.uid || fallback.user.uid,
            displayName: res.data.user?.displayName || fallback.user.displayName,
            email: res.data.user?.email || fallback.user.email,
            title: res.data.user?.title || fallback.user.title,
            baseSalary: res.data.user?.baseSalary || 0,
            contactNo: res.data.user?.contactNo || fallback.user.contactNo,
            contactEmail:
              res.data.user?.contactEmail || fallback.user.contactEmail,
            portfolioUrl:
              res.data.user?.portfolioUrl || fallback.user.portfolioUrl,
            bio: res.data.user?.bio || fallback.user.bio,
          },
          stats: res.data.stats || fallback.stats,
          projects: res.data.projects || [],
          tasks: res.data.tasks || [],
          contracts: res.data.contracts || [],
          paymentEntries: res.data.paymentEntries || [],
          latestSalary: res.data.latestSalary || null,
          salaryHistory: res.data.salaryHistory || [],
        });
      } else {
        setData(fallback);
      }
    } catch {
      setData(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        ...data,
        loading,
        refresh: loadData,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        currentTab,
        setCurrentTab,
        currency,
        setCurrency,
        formatCurrency,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
}