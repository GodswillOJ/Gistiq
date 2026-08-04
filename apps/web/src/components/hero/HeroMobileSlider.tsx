"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useNews } from "@/src/context/DemoNewsContext";

export default function HeroMobileSlider() {
  const { posts } = useNews();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [posts.length]);

  return (
    <section className="lg:hidden relative h-[70vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={posts[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={posts[index].image}
            alt={posts[index].title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-10 left-6 right-6 text-white z-10">
            <span className="uppercase tracking-widest text-orange-300 text-xs">
              {posts[index].category}
            </span>

            <h1 className="text-4xl font-bold mt-3 leading-tight">
              {posts[index].title}
            </h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}