"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ImagePlus,
  Trash2,
  Type,
  Heading2,
  Loader2,
} from "lucide-react";
import { uploadImage } from "@/src/features/auth/services/upload.service";
import { createPost } from "@/src/features/auth/services/auth.service";
import type { ContentBlock } from "@/src/features/auth/types/post.types";
import { toast } from "sonner";

type BlockType =
  | "paragraph"
  | "heading";

interface EditorBlock {
  id: number;
  type: "heading" | "paragraph" | "image";
  content: string;
}

export default function PostEditor() {
  /*
    =========================
    BASIC FIELDS
    =========================
  */

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] =
    useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [category, setCategory] =
    useState("Politics");

  const [seoTitle, setSeoTitle] =
    useState("");

  const [
    seoDescription,
    setSeoDescription,
  ] = useState("");

  const [tags, setTags] = useState("");

  /*
    =========================
    IMAGE
    =========================
  */

  const [preview, setPreview] =
    useState<string | null>(null);

  const [
    featuredImage,
    setFeaturedImage,
  ] = useState("");

  /*
    =========================
    LOADING
    =========================
  */

  const [loading, setLoading] =
    useState(false);

  /*
    =========================
    CONTENT BLOCKS
    =========================
  */

  const [blocks, setBlocks] = useState<
    EditorBlock[]
  >([
    {
      id: 1,
      type: "paragraph",
      content: "",
    },
  ]);

  /*
    =========================
    HERO IMAGE
    =========================
  */

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const handleHeroImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(
      URL.createObjectURL(file)
    );

    try {
      setUploadingImage(true);

      const cloudinaryUrl =
        await uploadImage(file);

      setFeaturedImage(cloudinaryUrl);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed", {
        description: "Unable to upload the featured image.",
      });
    } finally {
      setUploadingImage(false);
    }
  };
  /*
    =========================
    UPDATE BLOCK
    =========================
  */

const updateBlock = (id: number, value: string) => {
  setBlocks((prev) =>
    prev.map((block) =>
      block.id === id
        ? {
            ...block,
            content: value,
          }
        : block
    )
  );
};

  /*
    =========================
    ADD BLOCK
    =========================
  */

  const addBlock = (type: BlockType) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        content: "",
      },
    ]);
  };

  /*
    =========================
    REMOVE BLOCK
    =========================
  */

  const removeBlock = (id: number) => {
    setBlocks((prev) =>
      prev.filter((block) => block.id !== id)
    );
  };

  /*
    =========================
    CREATE SLUG
    =========================
  */

  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  /*
    =========================
    SUBMIT
    =========================
  */
 /* New fix */

  const handleSubmit = async () => {
    try {
      setLoading(true);

    const payload = {
      title,
      slug: createSlug(title),
      subtitle,
      excerpt,
      featuredImage,
      category,
      contentBlocks: blocks.map((block) => ({
        ...block,
        id: String(block.id),
      })),
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: "published" as const
    };
      await createPost(payload);

      alert("Post published!");

      /*
        RESET
      */

      setTitle("");
      setSubtitle("");
      setExcerpt("");
      setSeoTitle("");
      setSeoDescription("");
      setTags("");

      setBlocks([
        {
          id: 1,
          type: "paragraph",
          content: "",
        },
      ]);

      setPreview(null);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to publish article"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* ================================= */}
      {/* EDITOR */}
      {/* ================================= */}

      <div className="bg-white rounded-3xl border border-gray-200 p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-black text-black">
            Create News Post
          </h1>

          <p className="text-gray-500 mt-2">
            Publish professional
            SEO-ready news content.
          </p>
        </div>

        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Main Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter headline"
              className="w-full h-14 rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Subtitle
            </label>

            <input
              value={subtitle}
              onChange={(e) =>
                setSubtitle(
                  e.target.value
                )
              }
              placeholder="Enter subtitle"
              className="w-full h-14 rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Excerpt
            </label>

            <textarea
              rows={4}
              value={excerpt}
              onChange={(e) =>
                setExcerpt(
                  e.target.value
                )
              }
              placeholder="Short article summary"
              className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none resize-none focus:border-black"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
            >
              <option>
                Politics
              </option>

              <option>
                Technology
              </option>

              <option>
                Finance
              </option>

              <option>
                Sports
              </option>

              <option>
                Entertainment
              </option>
            </select>
          </div>

          {/* SEO */}
          <div className="grid gap-5">

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                SEO Title
              </label>

              <input
                value={seoTitle}
                onChange={(e) =>
                  setSeoTitle(
                    e.target.value
                  )
                }
                placeholder="SEO title"
                className="w-full h-14 rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                SEO Description
              </label>

              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) =>
                  setSeoDescription(
                    e.target.value
                  )
                }
                placeholder="SEO description"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none resize-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tags
              </label>

              <input
                value={tags}
                onChange={(e) =>
                  setTags(
                    e.target.value
                  )
                }
                placeholder="news, politics, lagos"
                className="w-full h-14 rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
              />
            </div>

          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Featured Image
            </label>

            <label className="h-52 border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center cursor-pointer hover:border-black transition">

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={
                  handleHeroImage
                }
              />

              <div className="text-center">
                <ImagePlus
                  size={32}
                  className="mx-auto mb-3"
                />

                <p className="font-semibold text-black">
                  Upload Featured
                  Image
                </p>
              </div>

            </label>
          </div>

          {/* BLOCKS */}
          <div>

            <div className="flex gap-3 mb-5">

              <button
                type="button"
                onClick={() =>
                  addBlock(
                    "paragraph"
                  )
                }
                className="px-4 py-2 rounded-xl bg-black text-white text-sm flex items-center gap-2"
              >
                <Type size={16} />
                Paragraph
              </button>

              <button
                type="button"
                onClick={() =>
                  addBlock("heading")
                }
                className="px-4 py-2 rounded-xl bg-gray-100 text-black text-sm flex items-center gap-2"
              >
                <Heading2
                  size={16}
                />
                Heading
              </button>

            </div>

            <div className="space-y-5">

              {blocks.map((block) => (
                <div
                  key={block.id}
                  className="border border-gray-200 rounded-2xl p-5 relative"
                >

                  <button
                    onClick={() =>
                      removeBlock(
                        block.id
                      )
                    }
                    className="absolute top-4 right-4 text-red-500"
                  >
                    <Trash2
                      size={18}
                    />
                  </button>

                  {block.type ===
                    "paragraph" && (
                    <textarea
                      rows={6}
                      value={
                        block.content
                      }
                      onChange={(e) =>
                        updateBlock(
                          block.id,
                          e.target
                            .value
                        )
                      }
                      placeholder="Write paragraph..."
                      className="w-full outline-none resize-none"
                    />
                  )}

                  {block.type ===
                    "heading" && (
                    <input
                      value={
                        block.content
                      }
                      onChange={(e) =>
                        updateBlock(
                          block.id,
                          e.target
                            .value
                        )
                      }
                      placeholder="Subheading"
                      className="w-full text-2xl font-bold outline-none"
                    />
                  )}

                </div>
              ))}

            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-3"
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            {loading
              ? "Publishing..."
              : "Publish Article"}
          </button>

        </div>
      </div>

      {/* ================================= */}
      {/* PREVIEW */}
      {/* ================================= */}

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">

        <div className="relative h-[350px] w-full">
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
              <p className="text-gray-400">
                Featured Image Preview
              </p>
            </div>
          )}
        </div>

        <div className="p-8">

          <span className="inline-flex px-4 py-2 rounded-full bg-black text-white text-xs font-semibold">
            {category}
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-black">
            {title ||
              "Headline Preview"}
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            {subtitle}
          </p>

          <p className="mt-6 text-xl text-gray-700 leading-relaxed border-l-4 border-black pl-5">
            {excerpt}
          </p>

          <div className="mt-10 space-y-6">

            {blocks.map((block) => (
              <div key={block.id}>

                {block.type ===
                  "heading" && (
                  <h2 className="text-3xl font-black text-black">
                    {
                      block.content
                    }
                  </h2>
                )}

                {block.type ===
                  "paragraph" && (
                  <p className="text-lg leading-9 text-gray-700">
                    {
                      block.content
                    }
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
}