"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Something went wrong!");
    }
  }
  return (
     <div className="min-h-screen flex flex-col bg-white">
    
      <Navbar />
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-5">
        <h1 className="font-bold text-3xl text-slate-700 mb-5 text-center">
          Create new account
        </h1>
        <RegisterForm />
        <p className="p-1 mt-3 text-black">
          Already have an account?
          <Link href="/login" className="mx-1 text-blue-700 underline">
            Login
          </Link>
        </p>
      </div>
    </section>
      </div>
  );
};

export default RegisterPage;
