'use client'
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex flex-col flex-1 justify-center items-center px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Welcome to JobTracker!
        </h1>
        <p className="text-slate-600 text-lg max-w-md mb-8">
          Track your job applications easily, stay organized, and manage your
          career growth with confidence.
        </p>

        {!session && (
          <div className="flex gap-4">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg text-lg font-semibold transition"
            >
              Login
            </Link>
          </div>
        )}
      </main>

      <footer className="text-center py-4 text-slate-500 border-t mt-8">
        © {new Date().getFullYear()} JobTracker. All rights reserved.
      </footer>
    </div>
  );
}
