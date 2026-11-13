import { redirect } from "next/navigation";

export default function DashboardTimelinePage() {
  redirect("/dashboard/admin?tab=timeline");
}

