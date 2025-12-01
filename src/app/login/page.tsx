import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md bg-white shadow-md rounded-md p-5">
          <h1 className="font-bold text-3xl text-slate-700 mb-5 text-center">
            Sign in to your account
          </h1>
          <LoginForm />
          <p className="p-1 mt-3 text-left text-black">
            Don’t have an account?
            <Link href="/register" className="mx-1 text-blue-700 underline">
              Register
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
