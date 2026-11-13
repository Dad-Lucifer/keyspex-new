import { redirect } from "next/navigation";

export default function DashboardContractsPage() {
  redirect("/dashboard/admin?tab=contracts");
}

