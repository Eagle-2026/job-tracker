"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAuthenticated = !!session;
  const isHomePage = pathname === "/";
  const isDashboardPage = pathname === "/dashboard";
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-800 text-white shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          JobTracker
        </Link>

        {!isAuthPage && status !== "loading" && (
          <>
            {isHomePage && (
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="text-lg text-blue-300 hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
            )}
            {isDashboardPage && (
              <Link
                href="/"
                className="text-lg text-blue-300 hover:text-blue-400 transition"
              >
                Home
              </Link>
            )}
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {status === "loading" ? null : isAuthenticated ? (
          isHomePage ? (
            // Logout as red title on Home
            <span
              onClick={() => {
                if (confirm("Are you sure you want to logout?")) {
                  signOut({ callbackUrl: "/" });
                }
              }}
              className="text-lg text-red-500 hover:text-red-600 cursor-pointer transition"
            >
              Logout
            </span>
          ) : (
            // Logout as button on Dashboard
            <button
              onClick={() => {
                if (confirm("Are you sure you want to logout?")) {
                  signOut({ callbackUrl: "/" });
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition-all duration-200"
            >
              Logout
            </button>
          )
        ) : (
          !isAuthPage && (
            <>
              <Link href="/register" className="hover:text-blue-300 transition">
                Register
              </Link>
              <Link href="/login" className="hover:text-blue-300 transition">
                Login
              </Link>
            </>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
