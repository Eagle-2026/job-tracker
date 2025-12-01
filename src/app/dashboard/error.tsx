"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        Something went wrong in your dashboard 😔
      </h2>
      <p className="text-gray-700 mb-4">
        Please try again, or refresh the page.  
        If the problem persists, check your network or contact support.
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}

