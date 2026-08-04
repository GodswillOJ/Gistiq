"use client";

import { motion } from "framer-motion";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-800 to-green-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-center text-green-800">
          {title}
        </h1>

        <p className="text-center text-gray-500 mb-6">
          {subtitle}
        </p>

        {children}
      </motion.div>
    </div>
  );
}