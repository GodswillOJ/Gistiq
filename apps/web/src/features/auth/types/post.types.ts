export interface ContentBlock {
  id?: string;
  type: "heading" | "paragraph" | "image";
  content: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  featuredImage: string;
  isBreaking?: boolean;
  breakingUntil?: string | null;
  isTrending?: boolean;
  isFeatured?: boolean;
  category: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  contentBlocks: ContentBlock[];
}

export interface CreatePostPayload {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  featuredImage: string;
  isBreaking?: boolean;
  breakingDurationHours?: number | null;
  isTrending?: boolean;
  isFeatured?: boolean;
  category: string;
  contentBlocks: ContentBlock[];
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  status: "draft" | "published";
}