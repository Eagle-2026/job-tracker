"use client";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };

  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      {/* ✅ Full-page section centered vertically and horizontally, white background */}

      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong
        {/* ✅ Main heading, visually indicates an error */}
      </h1>

      <p className="text-3xl text-gray-500 mb-6">
        {error.message}
        {/* ✅ Display the actual error message */}
      </p>

      <button
        onClick={() => reset()}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition"
      >
        Try again
      </button>
    </section>
  );
}
