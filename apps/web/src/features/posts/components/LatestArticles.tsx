"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getPosts,
} from "@/src/features/auth/services/auth.service";

import type {
  Post,
} from "@/src/features/auth/types/post.types";

import PostCard from "./PostCard";
import CategoryFilter from "./CategoryFilter";

export default function LatestArticles() {

  const [posts, setPosts] =
    useState<Post[]>([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  useEffect(() => {
    const loadPosts =
      async () => {
        const data =
          await getPosts();

        setPosts(data);
      };

    loadPosts();
  }, []);

  const categories =
    useMemo(() => {
      return [
        ...new Set(
          posts.map(
            (x) =>
              x.category
          )
        ),
      ];
    }, [posts]);

  const filteredPosts =
    useMemo(() => {
      if (
        activeCategory ===
        "All"
      ) {
        return posts;
      }

      return posts.filter(
        (post) =>
          post.category ===
          activeCategory
      );
    }, [
      posts,
      activeCategory,
    ]);

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <h2 className="text-4xl font-black">
           Top Stories
        </h2>

        <CategoryFilter
          categories={
            categories
          }
          active={
            activeCategory
          }
          onChange={
            setActiveCategory
          }
        />

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredPosts.map(
          (post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          )
        )}

      </div>

    </section>
  );
}