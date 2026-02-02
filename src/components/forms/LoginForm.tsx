"use client";

import { FcGoogle } from "react-icons/fc";
import { IoMdLogIn } from "react-icons/io";
import { useState } from "react";
import { loginSchema } from "@/utils/validateUser";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // 👈 state for inline error
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(""); // clear previous error
    setLoading(true);

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setErrorMsg(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
      {/* Email input */}
      <div className="flex flex-col mb-3">
        <label className="p-1 text-slate-900 font-bold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-slate-900 rounded-lg px-2 py-1 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      {/* Password input */}
      <div className="flex flex-col mb-2">
        <label className="p-1 text-slate-900 font-bold" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border border-slate-900 rounded-lg px-2 py-1 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      {/* Inline error message */}
      {errorMsg && (
        <p className="text-red-600 text-sm font-semibold mt-1 mb-2">
          {errorMsg}
        </p>
      )}

      {/* Login button */}
      <button
        type="submit"
        disabled={loading}
        className="
    flex items-center justify-center gap-2
    bg-slate-900 hover:bg-slate-800
    text-white
    rounded-xl w-full p-3 text-lg mt-3
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
    hover:scale-[1.02] active:scale-[0.98]"
      >
        <IoMdLogIn className="text-2xl" />
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Google OAuth */}
      <button
        type="button"
        onClick={() => signIn("google")}
        className="flex items-center justify-center gap-3 bg-blue-100 hover:bg-blue-200 border rounded-lg w-full p-2 text-lg mt-4 cursor-pointer"
      >
        <FcGoogle className="text-3xl" />
        <span className="font-semibold text-slate-700">
          Sign in with Google
        </span>
      </button>
    </form>
  );
};

export default LoginForm;
