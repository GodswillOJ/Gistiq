import {
  getPostBySlug,
  getPosts,
} from "@/src/features/auth/services/auth.service";

import {
  Post,
  ContentBlock,
} from "@/src/features/auth/types/post.types";

import Link from "next/link";
import { Metadata } from "next";

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description:
      post.seoDescription || post.excerpt,

    alternates: {
      canonical: `/news/${post.slug}`,
    },

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://afrocrymedia.com/news/${post.slug}`,
      siteName: "AfroCry Media",
      images: [
        {
          url: post.featuredImage,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

/* =========================
   PAGE
========================= */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  const allPosts = await getPosts();

  const related = allPosts
    .filter(
      (p: Post) =>
        p.category === post.category &&
        p.slug !== post.slug
    )
    .slice(0, 5);

  /* =========================
     ARTICLE SCHEMA
  ========================= */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    dateModified:
      post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://afrocrymedia.com/news/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author || "AfroCry Media",
    },
    publisher: {
      "@type": "Organization",
      name: "AfroCry Media",
      logo: {
        "@type": "ImageObject",
        url: "https://afrocrymedia.com/logo.png",
      },
    },
  };

  /* =========================
     BREADCRUMB SCHEMA
  ========================= */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://afrocrymedia.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: "https://afrocrymedia.com/news",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://afrocrymedia.com/news/${post.slug}`,
      },
    ],
  };

  return (
    <main className="bg-zinc-50 min-h-screen">
      {/* ARTICLE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema
          ),
        }}
      />

      {/* HERO */}
      <header className="relative h-[520px] w-full overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-10 text-white">
          <p className="text-sm uppercase tracking-wide text-emerald-300">
            {post.category}
          </p>

          <h1 className="mt-2 max-w-4xl text-4xl md:text-5xl font-extrabold leading-tight">
            {post.title}
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-white/80">
            {post.subtitle}
          </p>

          <time
            dateTime={post.publishedAt}
            className="mt-4 block text-sm text-white/60"
          >
            {new Date(
              post.publishedAt
            ).toDateString()}
          </time>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <section className="max-w-8xl mx-auto px-6 py-10">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* ARTICLE */}
          <article className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-8 md:p-12 shadow-sm">
              {/* BREADCRUMB */}
              <nav
                aria-label="Breadcrumb"
                className="mb-8 text-sm text-zinc-500"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-black transition"
                    >
                      Home
                    </Link>
                  </li>

                  <li>/</li>

                  <li>
                    <Link
                      href="/news"
                      className="hover:text-black transition"
                    >
                      News
                    </Link>
                  </li>

                  <li>/</li>

                  <li
                    className="text-zinc-900 font-medium truncate"
                    aria-current="page"
                  >
                    {post.title}
                  </li>
                </ol>
              </nav>

              {/* CONTENT */}
              <div className="space-y-8">
                {post.contentBlocks?.map(
                  (
                    block: ContentBlock,
                    i: number
                  ) => {
                    if (
                      block.type === "heading"
                    ) {
                      return (
                        <h2
                          key={i}
                          className="mt-10 text-2xl md:text-3xl font-bold text-zinc-900"
                        >
                          {block.content}
                        </h2>
                      );
                    }

                    if (
                      block.type === "image"
                    ) {
                      return (
                        <img
                          key={i}
                          src={block.content}
                          alt={post.title}
                          loading="lazy"
                          className="my-6 rounded-2xl shadow-md"
                        />
                      );
                    }

                    return (
                      <p
                        key={i}
                        className="text-xl leading-8 text-zinc-700"
                      >
                        {block.content}
                      </p>
                    );
                  }
                )}
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-6">
            <h3 className="text-lg font-bold text-zinc-900">
              Related Stories
            </h3>

            {related.map((item: Post) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
              >
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  loading="lazy"
                  className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-600">
                    {item.category}
                  </p>

                  <p className="mt-1 line-clamp-2 font-semibold text-zinc-900">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
}