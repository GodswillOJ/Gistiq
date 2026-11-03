
import Image from "next/image";
import Link from "next/link";
import type { Post } from "../../auth/types/post.types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block h-full min-w-0"
    >
      <article className="bg-white rounded-3xl overflow-hidden h-full transition duration-300 hover:shadow-xl">

        {/* IMAGE */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6">

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="font-semibold text-gray-700">
              {post.category}
            </span>

            <span>•</span>

            <span>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : "Recently published"}
            </span>
          </div>

          <h3 className="font-bold text-lg sm:text-xl leading-7 line-clamp-2 text-black group-hover:text-gray-600 transition">
            {post.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-7 line-clamp-3">
            {post.excerpt}
          </p>

          <span className="inline-block mt-5 font-semibold text-yellow-950">
            Read more →
          </span>

        </div>

      </article>
    </Link>
  );
}
