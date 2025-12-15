"use client";

import { useJobs } from "@/components/hooks/useJobs";
import LogoutButton from "@/components/forms/LogoutButton";
import DashboardJobs from "@/app/dashboard/DashboardJobs";
import Link from "next/link";
import type { Session } from "next-auth";
import  AddJobForm  from "../forms/AddJobForm";

export default function DashboardClient({ session }: { session: Session }) {
  const { total, pending, interview, offer } = useJobs();

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 p-4 sm:p-6 lg:p-10">
      {/* Header */}
    <header className="flex flex-col lg:flex-row justify-between items-center mb-8 bg-white/80 backdrop-blur-md shadow-md p-5 rounded-2xl border border-slate-200">
  {/* Left: Home button */}
  <div className="flex justify-center lg:justify-start w-full lg:w-auto mb-4 lg:mb-0">
    <Link
      href="/"
      className="text-2xl font-semibold text-slate-800 hover:text-blue-600 transition"
    >
      Home
    </Link>
  </div>

  {/* Right: Welcome text + Logout */}
  <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
      Welcome,{" "}
      <span className="text-blue-600">
        {session?.user?.name || session?.user?.email}
      </span>
    </h1>
    <LogoutButton />
  </div>
</header>



      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Jobs */}
        <div className="bg-pink-400 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center h-40 sm:h-44 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110">
          <h2 className="text-lg sm:text-xl font-semibold">Total Jobs</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{total}</p>
        </div>

        {/* Pending */}
        <div className="bg-yellow-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center h-40 sm:h-44 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110">
          <h2 className="text-lg sm:text-xl font-semibold">Pending</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{pending}</p>
        </div>

        {/* Interviews */}
        <div className="bg-indigo-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center h-40 sm:h-44 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110">
          <h2 className="text-lg sm:text-xl font-semibold">Interviews</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{interview}</p>
        </div>

        {/* Offers */}
        <div className="bg-green-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center h-40 sm:h-44 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110">
          <h2 className="text-lg sm:text-xl font-semibold">Offers</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{offer}</p>
        </div>
      </div>

      {/* Add Job Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 border border-slate-200">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Add a New Job
        </h2>
       <AddJobForm/>
      </div>

      {/* Job List */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-slate-200">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Your Job Applications
        </h2>
        <DashboardJobs />
      </div>
    </section>
  );
}
