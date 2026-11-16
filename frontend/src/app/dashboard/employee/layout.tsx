// frontend/src/app/dashboard/employee/layout.tsx
import React from "react";
import { EmployeeSidebar } from "@/components/employee/EmployeeSidebar";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { EmployeeProfileModal } from "@/components/employee/EmployeeProfileModal";
import { EmployeeProvider } from "@/context/EmployeeContext";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <EmployeeProvider>
      <div className="flex min-h-screen bg-[#F9FAFB] text-slate-900 antialiased font-sans">
        <EmployeeSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <EmployeeHeader />
          <main className="p-6 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
      {/* Global Profile & Portfolio Editor Modal */}
      <EmployeeProfileModal />
    </EmployeeProvider>
  );
}