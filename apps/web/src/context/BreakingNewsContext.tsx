"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getBreakingPosts } from "@/src/features/auth/services/auth.service";
import type {
  NewsPost,
  BreakingNewsResponse,
} from "@/src/types/news";

interface BreakingNewsContextType {
  posts: NewsPost[];
  loading: boolean;
  error: string | null;
}

const BreakingNewsContext =
  createContext<BreakingNewsContextType | null>(null);

export function BreakingNewsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        const data: BreakingNewsResponse[] = await getBreakingPosts();

        const formattedPosts: NewsPost[] = data.map((post) => ({
          id: post.id,
          title: post.title,
          category: post.category,
          image: post.featuredImage,
          excerpt: post.excerpt,
          slug: post.slug,
        }));

        setPosts(formattedPosts);
        setError(null);
      } catch (err) {
        console.error("Failed to load breaking news:", err);
        setError("Unable to load breaking news.");
      } finally {
        setLoading(false);
      }
    };

    loadBreakingNews();

    // Refresh periodically so expired stories disappear.
    const interval = setInterval(loadBreakingNews, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BreakingNewsContext.Provider
      value={{ posts, loading, error }}
    >
      {children}
    </BreakingNewsContext.Provider>
  );
}

export function useBreakingNews() {
  const context = useContext(BreakingNewsContext);

  if (!context) {
    throw new Error(
      "useBreakingNews must be used within a BreakingNewsProvider"
    );
  }

  return context;
}