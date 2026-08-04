"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Newspaper,
  ChevronDown,
  PlusSquare,
  Pencil,
  FolderKanban,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

const menu = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Posts",
    icon: FileText,
    children: [
      {
        label: "Create Post",
        href: "/admin/dashboard/posts/create",
        icon: PlusSquare,
      },
      {
        label: "Edit Posts",
        href: "/admin/dashboard/posts/edit",
        icon: Pencil,
      },
    ],
  },

  {
    label: "Categories",
    href: "/admin/dashboard/categories",
    icon: FolderKanban,
  },

  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },

  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },

  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] =
    useState("Posts");

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  return (
    <aside
      className="
        hidden
        lg:flex
        w-[290px]
        bg-white
        border-r
        border-gray-200
        flex-col
        h-screen
        sticky
        top-0
      "
    >
      {/* TOP */}
      <div
        className="
          px-6
          py-8
          border-b
          border-gray-100
        "
      >
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
            "
          >
            <Newspaper size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-black">
              AfroCry
            </h2>

            <p className="text-xs text-gray-500">
              Media Dashboard
            </p>
          </div>

        </div>
      </div>

      {/* NAVIGATION */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-4
          py-6
        "
      >
        <nav className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            /*
              =========================
              DROPDOWN MENU
              =========================
            */

            if (item.children) {
              const isOpen =
                openDropdown === item.label;

              return (
                <div key={item.label}>

                  <button
                    onClick={() =>
                      setOpenDropdown(
                        isOpen ? "" : item.label
                      )
                    }
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      px-5
                      py-4
                      rounded-2xl
                      text-gray-700
                      hover:bg-gray-100
                      transition-all
                    "
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={20} />
                      <span className="font-medium">
                        {item.label}
                      </span>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`
                        transition-transform
                        duration-300
                        ${
                          isOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {/* CHILDREN */}
                  {isOpen && (
                    <div className="ml-5 mt-2 space-y-2">

                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        const active =
                          pathname === child.href;

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              rounded-xl
                              text-sm
                              transition-all
                              ${
                                active
                                  ? "bg-black text-white"
                                  : "text-gray-600 hover:bg-gray-100"
                              }
                            `}
                          >
                            <ChildIcon size={16} />
                            {child.label}
                          </Link>
                        );
                      })}

                    </div>
                  )}
                </div>
              );
            }

            /*
              =========================
              NORMAL LINK
              =========================
            */

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href!}
                className={`
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  font-medium
                  ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-100">

      <button
        onClick={handleLogout}
        className="
          w-full
          rounded-2xl
          py-4
          bg-red-50
          text-red-500
          flex
          items-center
          justify-center
          gap-3
          hover:bg-red-100
          transition-all
          font-medium
        "
      >
        <LogOut size={18} />
        Logout
      </button>
      </div>
    </aside>
  );
}