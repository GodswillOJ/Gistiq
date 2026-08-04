"use client";

import { useForm } from "react-hook-form";
import { adminLogin } from "../services/auth.service";
import { useRouter } from "next/navigation";
import type { LoginData } from "../types/auth.types";
import { toast } from "sonner";

export default function AdminLoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await adminLogin(data);

      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Admin login failed", {
        description: "Invalid admin credentials.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <section
        className="
          w-full
          max-w-md
          bg-white
          border
          border-gray-200
          rounded-3xl
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          p-8
        "
      >
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            AfroCry Media
          </p>

          <h1 className="mt-4 text-3xl font-black text-black">
            Admin Access
          </h1>

          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Restricted administrative portal for authorized personnel only.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>

            <input
              suppressHydrationWarning
              autoComplete="email"
              {...register("email")}
              placeholder="Enter admin email"
              className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-gray-300
                bg-white
                text-black
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-black
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                h-12
                px-4
                rounded-xl
                border
                border-gray-300
                bg-white
                text-black
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-black
              "
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={isSubmitting}
            className="
              w-full
              h-12
              rounded-xl
              bg-black
              text-white
              font-medium
              transition
              hover:opacity-90
            "
          >
            {isSubmitting ? "Authenticating..." : "Admin Login"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            This administrative area is protected, monitored, and restricted to
            verified AfroCry Media personnel.
          </p>
        </div>
      </section>
    </main>
  );
}