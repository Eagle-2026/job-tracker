"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative inline-block z-50">
      {/* Logout button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition-all duration-200"
      >
        Logout
      </button>

      {/* Backdrop (blocks page, stays behind popup) */}
      {showConfirm && (
        <div className="fixed inset-0 bg-transparent z-40 pointer-events-auto"></div>
      )}

      {/* Confirmation popup (always on top) */}
   {showConfirm && (
  <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-64">
    <p className="text-gray-800 font-medium mb-3">
      Are you sure you want to sign out?
    </p>
    <div className="flex justify-end gap-2">
      <button
        onClick={() => setShowConfirm(false)}
        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
      >
        Cancel
      </button>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white"
      >
        Yes, Sign Out
      </button>
    </div>
  </div>
)}

    </div>
  );
}



