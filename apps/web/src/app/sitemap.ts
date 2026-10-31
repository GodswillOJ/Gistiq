
import { MetadataRoute } from "next";
import { getPosts } from "@/src/features/auth/services/auth.service";
import { Post } from "@/src/features/auth/types/post.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://afrocrymedia.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  try {
    const posts = await getPosts();

    const postUrls = posts
      .filter((post: Post) => post.status === "published")
      .map((post: Post) => ({
        url: `${baseUrl}/news/${post.slug}`,
        lastModified: post.publishedAt
          ? new Date(post.publishedAt)
          : new Date(),
      }));

    return [...staticPages, ...postUrls];
  } catch (error) {
    console.error("Sitemap: Failed to fetch posts:", error);

    return staticPages;
  }
}
