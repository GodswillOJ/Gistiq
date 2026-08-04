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
  category: string;
  contentBlocks: ContentBlock[];
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  status: "draft" | "published";
}