
"use client";

import { useBreakingNews } from "@/src/context/BreakingNewsContext";
import HeroCard from "./HeroCard";

export default function HeroGrid() {
  const { posts, loading } = useBreakingNews();

  if (loading) {
    return (
      <section className="hidden lg:grid grid-cols-4 grid-rows-2 gap-4 h-[85vh] px-6 py-6">
        <div className="col-span-4 flex items-center justify-center rounded-3xl bg-gray-100">
          <p className="text-gray-500">Loading breaking news...</p>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className="hidden lg:grid grid-cols-4 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-4 h-[85vh] px-6 py-6">
      {posts[0] && (
        <div className="col-span-2 row-span-2 min-h-0 min-w-0">
          <HeroCard {...posts[0]} size="large" />
        </div>
      )}

      {posts[1] && (
        <div className="col-span-1 row-span-1 min-h-0 min-w-0">
          <HeroCard {...posts[1]} size="small" />
        </div>
      )}

      {posts[2] && (
        <div className="col-span-1 row-span-1 min-h-0 min-w-0">
          <HeroCard {...posts[2]} size="small" />
        </div>
      )}

      {posts[3] && (
        <div className="col-span-2 row-span-1 min-h-0 min-w-0">
          <HeroCard {...posts[3]} size="medium" />
        </div>
      )}
    </section>
  );
}
