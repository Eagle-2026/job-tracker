"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomeButton() {
  const { data: session } = useSession();

  return (
    <Link
      href={session ? "/dashboard" : "/"}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
    >
      Home
    </Link>
  );
}
