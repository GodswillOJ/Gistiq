
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakingNews } from "@/src/context/BreakingNewsContext";

export default function HeroMobileSlider() {
  const { posts, loading } = useBreakingNews();
  const [index, setIndex] = useState(0);

  // Calculate a safe index without setting state in an effect.
  const safeIndex = posts.length > 0 ? index % posts.length : 0;
  const currentPost = posts[safeIndex];

  // Automatically change slides every 4 seconds.
  useEffect(() => {
    if (loading || posts.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [posts.length, loading]);

  if (loading) {
    return (
      <section className="lg:hidden relative h-[70vh] overflow-hidden bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">
          Loading breaking news...
        </p>
      </section>
    );
  }

  if (!currentPost) {
    return null;
  }

  return (
    <section className="lg:hidden relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPost.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {currentPost.image ? (
            <Image
              src={currentPost.image}
              alt={currentPost.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-10 left-6 right-6 z-10 text-white">
            <span className="uppercase tracking-widest text-orange-300 text-xs">
              {currentPost.category}
            </span>

            <h1 className="mt-3 text-4xl font-bold leading-tight">
              {currentPost.title}
            </h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
