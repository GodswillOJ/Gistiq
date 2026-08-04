"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { registerUser } from "../services/auth.service";
import { useRouter } from "next/navigation";
import type { RegisterData } from "../types/auth.types";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterData>();

  const onSubmit = async (data: RegisterData) => {
    const loadingToast = toast.loading(
      "Creating your account..."
    );

    try {
      await registerUser(data);

      toast.dismiss(loadingToast);

      toast.success("Registration successful", {
        description:
          "Redirecting you to the login page...",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (error: unknown) {
      toast.dismiss(loadingToast);

      if (axios.isAxiosError(error)) {
        toast.error("Registration failed", {
          description:
            error.response?.data?.message ??
            "Unable to create your account.",
        });

        return;
      }

      toast.error("Registration failed", {
        description: "An unexpected error occurred.",
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
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          border
          border-gray-200
          grid
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex min-h-[750px] overflow-hidden bg-white">
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
                "url('https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1400&auto=format&fit=crop')",
            }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/55" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-gray-300">
                AfroCry Media
              </p>

              <h1 className="mt-6 text-5xl font-black leading-tight max-w-lg">
                Modern African News,
                Stories & Digital Media.
              </h1>

              <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-xl">
                Join a scalable media platform built for real-time news,
                intelligent discovery, social engagement, and SEO-first
                publishing across Africa and beyond.
              </p>
            </div>

            {/* SEO FEATURES */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                "SEO Optimized",
                "Real-Time News",
                "AI Discovery",
                "Social Feeds",
                "Scalable Infrastructure",
                "Fast Global Delivery",
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
            {/* MOBILE HERO */}
            <div className="lg:hidden mb-10">
              <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
                AfroCry Media
              </p>

              <h1 className="mt-4 text-4xl font-black text-black leading-tight">
                Create Your News Account
              </h1>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Join a next-generation digital news platform engineered for
                discovery, engagement, and scalable media experiences.
              </p>
            </div>

            {/* DESKTOP TITLE */}
            <div className="hidden lg:block mb-10">
              <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
                Registration
              </p>

              <h2 className="mt-3 text-4xl font-black text-black">
                Create Account
              </h2>

              <p className="mt-3 text-gray-500">
                Access personalized news feeds, social interactions, bookmarks,
                and intelligent recommendations.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Username
                </label>

                <input
                  suppressHydrationWarning
                  autoComplete="username"
                  {...register("username")}
                  placeholder="Enter username"
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

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Password
                </label>

                <input
                  suppressHydrationWarning
                  autoComplete="new-password"
                  type="password"
                  {...register("password")}
                  placeholder="Create password"
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
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-black font-semibold hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}