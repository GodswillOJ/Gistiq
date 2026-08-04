"use client";

import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Search,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    verified: true,
    joined: "12 May 2026",
  },
  {
    id: 2,
    name: "Sarah White",
    email: "sarah@example.com",
    role: "Admin",
    verified: true,
    joined: "08 April 2026",
  },
  {
    id: 3,
    name: "David Smith",
    email: "david@example.com",
    role: "Editor",
    verified: false,
    joined: "02 March 2026",
  },
];

export default function UsersTable() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-6
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >
        <div>
          <h2 className="text-3xl font-black text-black">
            Users Management
          </h2>

          <p className="text-gray-500 mt-2">
            Manage registered users, permissions, and verification
            statuses across AfroCry Media.
          </p>
        </div>

        {/* SEARCH */}
        <div
          className="
            flex
            items-center
            gap-3
            h-14
            px-4
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            w-full
            lg:w-[320px]
          "
        >
          <Search size={18} className="text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="
              bg-transparent
              outline-none
              text-sm
              w-full
              placeholder:text-gray-400
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-5 text-left text-sm font-semibold text-gray-500">
                User
              </th>

              <th className="py-5 text-left text-sm font-semibold text-gray-500">
                Role
              </th>

              <th className="py-5 text-left text-sm font-semibold text-gray-500">
                Verification
              </th>

              <th className="py-5 text-left text-sm font-semibold text-gray-500">
                Joined
              </th>

              <th className="py-5 text-left text-sm font-semibold text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="
                  border-b
                  border-gray-100
                  hover:bg-gray-50
                  transition-all
                  duration-300
                "
              >
                {/* USER INFO */}
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                      "
                    >
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-black">
                        {user.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* ROLE */}
                <td className="py-5">
                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        user.role === "Admin"
                          ? "bg-black text-white"
                          : user.role === "Editor"
                          ? "bg-gray-200 text-black"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {user.role}
                  </span>
                </td>

                {/* VERIFIED */}
                <td className="py-5">
                  {user.verified ? (
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-xs
                        font-semibold
                      "
                    >
                      <ShieldCheck size={14} />
                      Verified
                    </div>
                  ) : (
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-red-100
                        text-red-700
                        text-xs
                        font-semibold
                      "
                    >
                      <ShieldAlert size={14} />
                      Pending
                    </div>
                  )}
                </td>

                {/* DATE */}
                <td className="py-5 text-gray-600 text-sm">
                  {user.joined}
                </td>

                {/* ACTIONS */}
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    {/* VIEW */}
                    <button
                      className="
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-gray-200
                        flex
                        items-center
                        justify-center
                        hover:bg-black
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      <Eye size={18} />
                    </button>

                    {/* EDIT */}
                    <button
                      className="
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-gray-200
                        flex
                        items-center
                        justify-center
                        hover:bg-black
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    <button
                      className="
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-red-200
                        text-red-500
                        flex
                        items-center
                        justify-center
                        hover:bg-red-500
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div
        className="
          mt-6
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
        "
      >
        <p className="text-sm text-gray-500">
          Showing {filteredUsers.length} users
        </p>

        <div className="flex items-center gap-3">
          <button
            className="
              h-11
              px-5
              rounded-xl
              border
              border-gray-200
              text-sm
              font-medium
              hover:bg-gray-100
            "
          >
            Previous
          </button>

          <button
            className="
              h-11
              px-5
              rounded-xl
              bg-black
              text-white
              text-sm
              font-medium
            "
          >
            1
          </button>

          <button
            className="
              h-11
              px-5
              rounded-xl
              border
              border-gray-200
              text-sm
              font-medium
              hover:bg-gray-100
            "
          >
            2
          </button>

          <button
            className="
              h-11
              px-5
              rounded-xl
              border
              border-gray-200
              text-sm
              font-medium
              hover:bg-gray-100
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}