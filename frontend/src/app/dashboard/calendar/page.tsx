import { redirect } from "next/navigation";

export default function DashboardCalendarPage() {
  redirect("/dashboard/admin?tab=calendar");
}

