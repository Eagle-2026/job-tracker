
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Not logged in → redirect to login
    return redirect("/login");
  }

  // Logged in → render client dashboard
  return <DashboardClient session={session} />;
}