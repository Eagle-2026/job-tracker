"use client";

import { FcGoogle } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { useState, useEffect } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // message text
  const [message, setMessage] = useState("");
  // controls message color
  const [isSuccess, setIsSuccess] = useState(false);

  // auto clear message after 3 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setIsSuccess(true); // success → green
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setIsSuccess(false); // error → red
      }
    } catch (error) {
      setMessage("Something went wrong");
      setIsSuccess(false);
    }
  };

  return (
    <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="p-1 text-slate-500 font-bold">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-500 rounded-lg px-2 py-1 text-xl text-slate-900"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col mb-3">
        <label htmlFor="email" className="p-1 text-slate-500 font-bold">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-500 rounded-lg px-2 py-1 text-xl text-slate-900"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col mb-3">
        <label htmlFor="password" className="p-1 text-slate-500 font-bold">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-500 rounded-lg px-2 py-1 text-xl text-slate-900"
        />

        {/* Message */}
        {message && (
          <span
            className={`mt-1 font-semibold ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </span>
        )}
      </div>

      {/* Register button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-900 mt-4 text-white rounded-lg w-full p-2 text-xl"
      >
        <BsPersonPlus className="text-2xl" />
        Register
      </button>

      {/* Google signup (UI only for now) */}
      <button
        type="button"
        className="flex items-center justify-center gap-3 bg-blue-100 hover:bg-blue-200 border rounded-lg w-full p-2 text-xl mt-4"
      >
        <FcGoogle className="text-3xl" />
        <span className="font-semibold text-slate-700">
          Sign up with Google
        </span>
      </button>
    </form>
  );
};

export default RegisterForm;
