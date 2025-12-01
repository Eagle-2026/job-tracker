"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);

  return (
      <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition"
      >
        Go Home
      </Link>
    </section>
    </div>
  );
}
