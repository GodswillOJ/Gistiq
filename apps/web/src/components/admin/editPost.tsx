"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { getPosts } from "@/src/features/auth/services/auth.service";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
}

type GroupedPosts = Record<string, Post[]>;

export default function EditPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        toast.error("Failed to load posts", {
          description: "Unable to retrieve posts.",
        });
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const groupedPosts = posts.reduce<GroupedPosts>(
    (acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = [];
      }

      acc[post.category].push(post);

      return acc;
    },
    {}
  );

  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-8">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-white p-8">
        <h1 className="text-3xl font-black">
          Edit Posts
        </h1>

        <p className="text-gray-500 mt-2">
          Manage published posts.
        </p>
      </div>

      {/* Categories */}
      {Object.entries(groupedPosts).map(
        ([category, categoryPosts]) => (
          <section
            key={category}
            className="space-y-4"
          >
            <h2 className="text-2xl font-black">
              {category}
            </h2>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {categoryPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/dashboard/posts/${post.id}`}
                >
                  <article className="overflow-hidden rounded-3xl bg-white transition hover:shadow-lg">
                    <div className="relative h-52">
                      <Image
                        fill
                        alt={post.title}
                        src={post.featuredImage}
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-2 font-bold">
                        {post.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )
      )}

      {!posts.length && (
        <div className="rounded-3xl border bg-white p-8 text-center text-gray-500">
          No posts found.
        </div>
      )}
    </div>
  );
}