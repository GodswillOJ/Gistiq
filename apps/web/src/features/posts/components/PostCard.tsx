import Link from "next/link";
import type { Post } from "../../auth/types/post.types";
import { getPost } from "../../auth/services/auth.service";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block"
    >
      <article className="bg-white rounded-3xl overflow-hidden transition">

        <div className="h-56 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        <div className="p-5">

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span>{post.category}</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h3 className="font-bold text-lg leading-7 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-gray-600 mt-3 line-clamp-3">
            {post.excerpt}
          </p>

          {/* ❌ REMOVE THIS LINK */}
          {/* <Link ...>Read more</Link> */}

          {/* optional UI instead */}
          <span className="inline-block mt-5 font-semibold text-yellow-950">
            Read more →
          </span>

        </div>

      </article>
    </Link>
  );
}