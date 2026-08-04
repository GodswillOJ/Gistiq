"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogIn, LogOut, User } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UserMenu() {
  const router = useRouter();
  const { isAuthenticated, loading, refresh } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/auth/logout`,
        {},
        { withCredentials: true }
      );

      await refresh();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-zinc-400">Loading...</div>
    );
  }

  /* =========================
     NOT LOGGED IN
  ========================= */
  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black"
      >
        <LogIn size={18} />
        Login
      </Link>
    );
  }

  /* =========================
     LOGGED IN DROPDOWN
  ========================= */
  return (
    <div className="relative" ref={dropdownRef}>

      {/* USER ICON BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center justify-center
          w-9 h-9 rounded-full
          bg-zinc-100 hover:bg-zinc-200
          transition
        "
      >
        <User size={18} />
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-56
            bg-white border border-zinc-200
            rounded-xl shadow-lg
            overflow-hidden
            z-50
          "
        >
          {/* HEADER */}
          <div className="px-4 py-3 border-b border-zinc-100">
            <p className="text-sm font-semibold text-zinc-800">
              My Account
            </p>
            <p className="text-xs text-zinc-500">
              Manage your preferences
            </p>
          </div>

          {/* LINKS */}
          <div className="py-2">
            <Link
              href="/newsletter"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Newsletter
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Settings
            </Link>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-zinc-100" />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              w-full text-left px-4 py-3
              text-sm text-red-600 hover:bg-red-50
              flex items-center gap-2
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}