"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function AdminTopbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        bg-[#f5f5f5]/80
        backdrop-blur-xl
        border-b
        border-gray-200
      "
    >
      <div
        className="
          h-[90px]
          px-6
          flex
          items-center
          justify-between
        "
      >
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-black text-black">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome back admin.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
              h-12
              px-4
              rounded-2xl
              bg-white
              border
              border-gray-200
              w-[300px]
            "
          >
            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              placeholder="Search..."
              className="
                flex-1
                outline-none
                bg-transparent
                text-sm
              "
            />
          </div>

          {/* NOTIFICATION */}
          <button
            className="
              w-12
              h-12
              rounded-2xl
              bg-white
              border
              border-gray-200
              flex
              items-center
              justify-center
            "
          >
            <Bell size={18} />
          </button>

          {/* AVATAR */}
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
          >
            A
          </div>

        </div>
      </div>
    </header>
  );
}