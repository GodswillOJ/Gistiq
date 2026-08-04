import { MetadataRoute } from "next";
import { getPosts } from "@/src/features/auth/services/auth.service";
import { Post } from "@/src/features/auth/types/post.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const postUrls = posts.map((post: Post) => ({
    url: `https://afrocrymedia.com/news/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [
    {
      url: "https://afrocrymedia.com",
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}