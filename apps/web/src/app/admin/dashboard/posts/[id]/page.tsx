"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/src/components/admin/AdminLayout";

import type {
  Post,
  ContentBlock,
} from "@/src/features/auth/types/post.types";
import axios, {AxiosError} from "axios";
import {
  getPost,
  updatePost,
  deletePost,
} from "@/src/features/auth/services/auth.service";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      const data = await getPost(id as string);
      setPost(data);
      setBlocks(
        (data.contentBlocks || []).map((block: ContentBlock) => ({
          id: block.id,
          type: block.type,
          content: block.content,
        }))
      );
      setTags((data.tags || []).join(", "));
      setImage(data.featuredImage || "");
    };

    loadPost();
  }, [id]);

  const updateField = <K extends keyof Post>(key: K, value: Post[K]) => {
    if (!post) return;
    setPost({ ...post, [key]: value });
  };

  const updateBlock = (index: number, value: string) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === index
          ? { ...block, content: value }
          : block
      )
    );
  };

  const updateBlockType = (
    index: number,
    type: ContentBlock["type"]
  ) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === index
          ? {
              ...block,
              type,
            }
          : block
      )
    );
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleImageChange = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/uploads`,
      {
        method: "POST",
        body: form,
        credentials: "include",
      }
    );

    const data = await res.json();
    setImage(data.imageUrl);
  };

  const handleUpdate = async () => {
    if (!post) return;

    setLoading(true);

    try {
      const payload = {
        title: post.title,
        slug: post.slug,
        subtitle: post.subtitle,
        excerpt: post.excerpt,
        featuredImage: image,
        category: post.category,
        contentBlocks: blocks,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status: post.status,
      };

      console.log(
        JSON.stringify(payload, null, 2)
      );

      await updatePost(id as string, payload);

      toast.success("Post updated successfully");
    } catch (error: unknown) {
      console.error("UPDATE ERROR", error);

      if (axios.isAxiosError(error)) {
        console.log(
          "SERVER RESPONSE",
          error.response?.data
        );

        toast.error(
          error.response?.data?.message ??
          "Update failed"
        );
      } else {
        console.error("Unknown error", error);
        toast.error("Update failed");
      }
    } finally {
       setLoading(false);
    }
  };

  const handleDelete = async () => {
    const ok = confirm("Delete this post?");
    if (!ok) return;

    await deletePost(id as string);
    router.push("/admin/posts");
  };

  if (!post)
    return (
      <AdminLayout>
        <div className="p-10">Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>

      {/* TOP BAR */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
        <Link
          href="/admin/dashboard/posts/edit"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to posts
        </Link>

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-black text-white text-sm shadow-md hover:shadow-lg transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm shadow-md hover:shadow-lg transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* IMAGE */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            {image && (
              <img src={image} className="w-full h-64 object-cover" />
            )}

            <div className="p-5">
              <p className="text-xs text-gray-500 mb-2">
                Featured Image
              </p>

              <input
                type="file"
                className="text-sm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageChange(file);
                }}
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <input
              value={post.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              className="w-full text-3xl font-black outline-none"
            />

            <input
              value={post.subtitle}
              onChange={(e) =>
                updateField("subtitle", e.target.value)
              }
              className="w-full mt-3 text-gray-500 outline-none"
            />
          </div>

          {/* CONTENT */}
          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="font-bold">Content Builder</h2>

            </div>

            {blocks.map((block, i) => (
              <div
                key={block.id || i}
                className="bg-gray-50 rounded-2xl p-4 shadow-sm space-y-3"
              >
                <select
                  value={block.type}
                  onChange={(e) =>
                    updateBlockType(
                      i,
                      e.target.value as ContentBlock["type"]
                    )
                  }
                  className="bg-white shadow-sm rounded-lg p-2 text-sm"
                >
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                </select>

                <textarea
                  value={block.content}
                  onChange={(e) =>
                    updateBlock(i, e.target.value)
                  }
                  className="w-full bg-white shadow-sm rounded-xl p-3 outline-none"
                />

                <button
                  onClick={() => removeBlock(i)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          {/* META */}
          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">

            <input
              value={post.category}
              onChange={(e) =>
                updateField("category", e.target.value)
              }
              className="w-full bg-gray-50 rounded-xl p-3 shadow-sm"
            />

            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-gray-50 rounded-xl p-3 shadow-sm"
              placeholder="Tags"
            />

            <input
              value={post.seoTitle}
              onChange={(e) =>
                updateField("seoTitle", e.target.value)
              }
              className="w-full bg-gray-50 rounded-xl p-3 shadow-sm"
            />

            <textarea
              value={post.seoDescription}
              onChange={(e) =>
                updateField("seoDescription", e.target.value)
              }
              className="w-full bg-gray-50 rounded-xl p-3 shadow-sm"
            />

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">

            <h3 className="font-bold">Platform Preview</h3>

            <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
              <p className="text-blue-600 font-semibold">Facebook</p>
              <p className="font-bold">{post.title}</p>
              <p className="text-sm text-gray-500">{post.excerpt}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
              <p className="text-pink-600 font-semibold">Instagram</p>
              <p className="font-bold">{post.title}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
              <p className="text-blue-700 font-semibold">LinkedIn</p>
              <p className="font-bold">{post.title}</p>
            </div>

          </div>

          <div className="bg-black text-white rounded-3xl p-6 shadow-lg">
            <h3 className="font-bold">Live Preview</h3>
            <p className="text-sm text-gray-300 mt-2">
              {post.subtitle}
            </p>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}