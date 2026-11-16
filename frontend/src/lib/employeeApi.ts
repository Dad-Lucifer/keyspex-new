// frontend/src/lib/employeeApi.ts
import { fetchWithAuth } from "@/lib/api";

export interface EmployeeProfile {
  name: string;
  roleTitle: string;
  avatarInitials: string;
  dateString: string;
}

export interface EmployeeStats {
  monthlySalary: number;
  activeProjects: number;
  inProgressProjects: number;
  completedProjects: number;
  pendingTasks: number;
  dueThisWeekTasks: number;
  completedTasks: number;
  sprintVelocity: string;
}

export interface EmployeeProject {
  id: string;
  code: string;
  title: string;
  role: string;
  dueDate: string;
  status: "In Progress" | "Completed" | "Near Deadline";
  progressPercent: number;
}

export interface EmployeeSalarySummary {
  periodMonthYear: string;
  monthlyBaseSalary: number;
  lastPaymentAmount: number;
  lastPaymentDate: string;
  lastPaymentStatus: "Paid" | "Pending";
  nextExpectedPaymentDate: string;
  nextPaymentStatus: "Scheduled" | "Processing";
  latestSlipId: string;
  latestSlipPeriod: string;
}

export interface EmployeeTask {
  id: string;
  title: string;
  projectCode: string;
  dueDate: string;
  dueSoonText?: string;
  status: "In Progress" | "To Do" | "Under Review" | "Completed";
}

export interface EmployeeDeadline {
  id: string;
  title: string;
  date: string;
  projectCode: string;
  time: string;
  isUrgent?: boolean;
}

export interface EmployeeDashboardData {
  profile: EmployeeProfile;
  stats: EmployeeStats;
  projects: EmployeeProject[];
  salarySummary: EmployeeSalarySummary;
  tasks: EmployeeTask[];
  deadlines: EmployeeDeadline[];
}
