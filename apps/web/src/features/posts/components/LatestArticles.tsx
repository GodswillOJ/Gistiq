
"use client";

import { useEffect, useMemo, useState } from "react";

import { getPosts } from "@/src/features/auth/services/auth.service";
import type { Post } from "@/src/features/auth/types/post.types";

import PostCard from "./PostCard";
import CategoryFilter from "./CategoryFilter";

const POSTS_PER_LOAD = 6;

export default function LatestArticles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_LOAD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts:", err);
        setError("Unable to load articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(posts.map((post) => post.category))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return posts;
    }

    return posts.filter(
      (post) => post.category === activeCategory
    );
  }, [posts, activeCategory]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(POSTS_PER_LOAD);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_LOAD);
  };

  return (
    <section className="w-full px-5 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-black">
              Latest Posts
            </h2>

            <p className="mt-2 text-gray-500">
              Discover the latest stories and updates.
            </p>
          </div>

          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-16 text-center text-gray-500">
            Loading latest articles...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="py-16 text-center text-red-500">
            {error}
          </div>
        )}

        {/* ARTICLES GRID */}
        {!loading && !error && displayedPosts.length > 0 && (
          <div
            className="grid gap-6 lg:gap-8"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            }}
          >
            {displayedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="py-16 text-center rounded-3xl bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800">
              No articles found
            </h3>

            <p className="mt-2 text-gray-500">
              There are currently no posts in this category.
            </p>
          </div>
        )}

        {/* LOAD MORE */}
        {!loading &&
          !error &&
          displayedPosts.length > 0 &&
          displayedPosts.length < filteredPosts.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="rounded-full bg-black px-10 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Load More
              </button>
            </div>
          )}

      </div>
    </section>
  );
}
