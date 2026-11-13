import { Timestamp } from "firebase-admin/firestore";

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "review" | "completed";

export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  assignedTo: string; // employee uid
  assignedEmployeeName: string;
  assignedEmployeeEmail?: string;
  assignedEmployeeRole?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdBy?: string;
  createdByName?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  assignedEmployeeName: string;
  assignedEmployeeEmail?: string;
  assignedEmployeeRole?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  dueDate?: string;
  assignedTo?: string;
  assignedEmployeeName?: string;
  assignedEmployeeEmail?: string;
  assignedEmployeeRole?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

