"use client";

import { useState } from "react";
import Image from "next/image";

export default function PostEditor() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      "
    >
      {/* FORM SIDE */}
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          p-8
        "
      >
        <div className="mb-8">
          <h1 className="text-3xl font-black text-black">
            Create News Post
          </h1>

          <p className="text-gray-500 mt-2">
            Publish breaking news and media content.
          </p>
        </div>

        <div className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Post Title
            </label>

            <input
              placeholder="Enter post title"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-gray-300
                px-4
                outline-none
                focus:border-black
              "
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Subtitle
            </label>

            <input
              placeholder="Enter subtitle"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-gray-300
                px-4
                outline-none
                focus:border-black
              "
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Excerpt
            </label>

            <textarea
              rows={5}
              placeholder="Write short excerpt..."
              className="
                w-full
                rounded-2xl
                border
                border-gray-300
                px-4
                py-4
                outline-none
                resize-none
                focus:border-black
              "
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-gray-300
                px-4
                outline-none
                focus:border-black
              "
            >
              <option>Politics</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Sports</option>
              <option>Entertainment</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Cover Image
            </label>

            <label
              className="
                h-52
                border-2
                border-dashed
                border-gray-300
                rounded-3xl
                flex
                items-center
                justify-center
                cursor-pointer
                hover:border-black
                transition
              "
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />

              <div className="text-center">
                <p className="font-semibold text-black">
                  Upload Image
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG or WEBP
                </p>
              </div>
            </label>
          </div>

          {/* BUTTON */}
          <button
            className="
              w-full
              h-14
              rounded-2xl
              bg-black
              text-white
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Publish Post
          </button>
        </div>
      </div>

      {/* PREVIEW SIDE */}
      <div
        className="
          bg-black
          rounded-3xl
          overflow-hidden
          text-white
          flex
          flex-col
        "
      >
        {/* IMAGE */}
        <div className="relative h-[350px] w-full">
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
              <p className="text-gray-400">
                Live Preview
              </p>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-8">
          <span
            className="
              inline-block
              px-4
              py-2
              rounded-full
              bg-white
              text-black
              text-xs
              font-semibold
            "
          >
            Breaking News
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight">
            Your News Headline Preview Appears Here
          </h2>

          <p className="mt-4 text-gray-300 leading-relaxed">
            This section previews how your article may appear
            to readers across the platform homepage and feeds.
          </p>
        </div>
      </div>
    </div>
  );
}