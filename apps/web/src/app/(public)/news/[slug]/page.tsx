import {
  getPostBySlug,
  getPosts,
} from "@/src/features/auth/services/auth.service";

import {
  Post,
  ContentBlock,
} from "@/src/features/auth/types/post.types";
import FacebookShareButton from "@/src/features/posts/components/FacebookShareButton";
import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/src/components/footer/Footer";

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

  const articleUrl = `https://gistiq.vercel.app/news/${post.slug}`;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,

    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: articleUrl,
      siteName: "Gistiq",
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
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
    dateModified: post.updatedAt || post.publishedAt,
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
    <main className="min-h-screen w-full overflow-x-hidden bg-zinc-50">
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
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* HERO */}
      <header className="relative flex min-h-[420px] h-[65vh] max-h-[680px] w-full items-end overflow-hidden sm:min-h-[480px]">
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 text-white sm:px-6 sm:pb-10 md:px-8 lg:pb-14">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300 sm:text-sm">
              {post.category}
            </p>

            <h1 className="mt-3 break-words text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                {post.subtitle}
              </p>
            )}

            <time
              dateTime={post.publishedAt}
              className="mt-5 block text-xs text-white/70 sm:text-sm"
            >
              {new Date(post.publishedAt).toDateString()}
            </time>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <section className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 sm:py-8 md:px-6 md:py-12 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

          {/* ARTICLE */}
          <article className="min-w-0 lg:col-span-8 xl:col-span-9">
            <div className="min-w-0 rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-8 lg:rounded-3xl lg:p-10">

              {/* BREADCRUMB */}
              <nav
                aria-label="Breadcrumb"
                className="mb-6 min-w-0 text-xs text-zinc-500 sm:mb-8 sm:text-sm"
              >
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <li>
                    <Link
                      href="/"
                      className="transition hover:text-emerald-600"
                    >
                      Home
                    </Link>
                  </li>

                  <li aria-hidden="true">/</li>

                  <li>
                    <Link
                      href="/news"
                      className="transition hover:text-emerald-600"
                    >
                      News
                    </Link>
                  </li>

                  <li aria-hidden="true">/</li>

                  <li
                    className="max-w-[180px] truncate font-medium text-zinc-900 sm:max-w-xs"
                    aria-current="page"
                    title={post.title}
                  >
                    {post.title}
                  </li>
                </ol>
              </nav>
              
              {/* Share to facebook */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <FacebookShareButton
                  url={`https://afrocry.vercel.app/news/${post.slug}`}
                />
              </div>
              
              {/* ARTICLE CONTENT */}
              <div className="article-content min-w-0">

                {post.contentBlocks?.map(
                  (block: ContentBlock, i: number) => {

                    if (block.type === "heading") {
                      return (
                        <h2 key={i}>
                          {block.content}
                        </h2>
                      );
                    }

                    if (block.type === "image") {
                      return (
                        <figure key={i} className="my-7 sm:my-9">
                          <img
                            src={block.content}
                            alt={post.title}
                            loading="lazy"
                            className="h-auto w-full rounded-xl object-cover shadow-sm sm:rounded-2xl"
                          />
                        </figure>
                      );
                    }

                    return (
                      <p key={i}>
                        {block.content}
                      </p>
                    );
                  }
                )}

              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-6 lg:col-span-4 xl:col-span-3">

            <h3 className="text-lg font-bold text-zinc-900 sm:text-xl">
              Related Stories
            </h3>

            {related.map((item: Post) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg sm:rounded-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    loading="lazy"
                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-48 lg:h-36"
                  />
                </div>

                <div className="min-w-0 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    {item.category}
                  </p>

                  <p className="mt-2 break-words text-sm font-semibold leading-snug text-zinc-900 transition group-hover:text-emerald-700 sm:text-base">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}

          </aside>
        </div>
      </section>
      <Footer />

      {/* BLOG TYPOGRAPHY */}
      <style>{`
        .article-content {
          font-family: Georgia, 'Times New Roman', serif;
          color: #3f3f46;
          font-size: clamp(1.05rem, 1.4vw, 1.2rem);
          line-height: 1.9;
          overflow-wrap: anywhere;
          word-break: normal;
        }

        .article-content p {
          margin-top: 0;
          margin-bottom: 1.5em;
        }

        .article-content p:last-child {
          margin-bottom: 0;
        }

        .article-content h2 {
          margin-top: 2em;
          margin-bottom: 0.8em;
          color: #18181b;
          font-family: inherit;
          font-size: clamp(1.4rem, 2.2vw, 1.9rem);
          font-weight: 700;
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        .article-content figure {
          max-width: 100%;
        }

        .article-content img {
          display: block;
          max-width: 100%;
          height: auto;
        }

        @media (max-width: 640px) {
          .article-content {
            font-size: 1.0625rem;
            line-height: 1.85;
          }

          .article-content p {
            margin-bottom: 1.35em;
          }

          .article-content h2 {
            margin-top: 1.7em;
            margin-bottom: 0.7em;
          }
        }
      `}</style>
    </main>
  );
}