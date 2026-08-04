"use client";

import { useForm } from "react-hook-form";
import { loginUser } from "../services/auth.service";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { LoginData } from "../types/auth.types";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await loginUser(data);

      const user = res.data.data;

      if (user.role === "User") {
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "Invalid login credentials.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full
          max-w-7xl
          bg-white
          rounded-3xl
          overflow-hidden
          border
          border-gray-200
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          grid
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex min-h-[750px] overflow-hidden bg-white">
          {/* BACKGROUND IMAGE */}
          <div
            className="
              absolute
              inset-0
              bg-cover
              bg-center
              scale-105
            "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1400&auto=format&fit=crop')",
            }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-gray-300">
                AfroCry Media
              </p>

              <h1 className="mt-6 text-5xl font-black leading-tight max-w-lg">
                Stay Connected To Breaking News & Global Stories.
              </h1>

              <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-xl">
                Login to gain full access to personalized feeds, intelligent
                recommendations, social interactions, bookmarks, comments, and
                real-time media experiences tailored to your interests.
              </p>
            </div>

            {/* FEATURE BOXES */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                "Personalized Feeds",
                "SEO Optimized News",
                "AI Recommendations",
                "Social Discussions",
                "Fast Global Delivery",
                "Real-Time Updates",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    bg-white/10
                    backdrop-blur-md
                    border
                    border-white/20
                    rounded-2xl
                    px-4
                    py-4
                    text-sm
                    font-medium
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white flex items-center justify-center px-6 py-12 md:px-14">
          <div className="w-full max-w-md">
            {/* MOBILE HEADER */}
            <div className="lg:hidden mb-10">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                    <button
                        onClick={() => router.push("/")}
                        className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-gray-600
                        hover:text-black
                        transition-all
                        duration-300
                        group
                        "
                    >
                        <ArrowLeft
                        size={18}
                        className="
                            transition-transform
                            duration-300
                            group-hover:-translate-x-1
                        "
                        />

                        Home
                    </button>
                    </div>
                </div>

              <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
                AfroCry Media
              </p>

              <h1 className="mt-4 text-4xl font-black text-black leading-tight">
                Welcome Back
              </h1>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Login to unlock full access to premium news experiences,
                personalized feeds, comments, and intelligent recommendations.
              </p>
            </div>

            {/* DESKTOP HEADER */}
            <div className="hidden lg:block mb-10">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                    <button
                        onClick={() => router.push("/")}
                        className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-gray-600
                        hover:text-black
                        transition-all
                        duration-300
                        group
                        "
                    >
                        <ArrowLeft
                        size={18}
                        className="
                            transition-transform
                            duration-300
                            group-hover:-translate-x-1
                        "
                        />

                        Home
                    </button>
                    </div>
                </div>

              <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
                Secure Login
              </p>

              <h2 className="mt-3 text-4xl font-black text-black">
                Welcome Back
              </h2>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Sign in to gain full access to AfroCry Media’s intelligent
                news ecosystem and personalized social experience.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </label>

                <input
                  suppressHydrationWarning
                  autoComplete="email"
                  {...register("email")}
                  placeholder="Enter email address"
                  className="
                    w-full
                    h-14
                    px-4
                    rounded-2xl
                    border
                    border-gray-300
                    bg-white
                    text-black
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    duration-300
                    focus:border-black
                    focus:ring-4
                    focus:ring-black/5
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Password
                </label>

                <input
                  suppressHydrationWarning
                  autoComplete="current-password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter password"
                  className="
                    w-full
                    h-14
                    px-4
                    rounded-2xl
                    border
                    border-gray-300
                    bg-white
                    text-black
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    duration-300
                    focus:border-black
                    focus:ring-4
                    focus:ring-black/5
                  "
                />
              </div>

              {/* EXTRA ROW */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a
                  href="/forgot-password"
                  className="text-black font-medium hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* BUTTON */}
              <button
                disabled={isSubmitting}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-black
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  hover:opacity-90
                  hover:scale-[1.01]
                  active:scale-[0.99]
                "
              >
                {isSubmitting ? "Signing In..." : "Login To Continue"}
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="text-black font-semibold hover:underline"
                >
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}