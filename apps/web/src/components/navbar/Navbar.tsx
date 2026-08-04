"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "./NavLinks";
import UserMenu from "./UserMenu";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <header className="border-b border-zinc-200 bg-white relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* BRAND */}
        <Link href="/" onClick={close}>
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              AfroCry Media
            </h1>
            <p className="text-sm text-zinc-500">
              Modern African stories and intelligence.
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">

          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-zinc-700 hover:text-black transition"
            >
              {item.name}
            </Link>
          ))}

          {/* AUTH-BASED CONTACT */}
          {isAuthenticated && (
            <Link
              href="/contact"
              className="text-sm font-medium text-zinc-700 hover:text-black transition"
            >
              Contact
            </Link>
          )}

          <UserMenu />
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={toggle}
          className="md:hidden p-2 rounded-md hover:bg-zinc-100"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DRAWER (SLIDE DOWN ANIMATION) */}
      <div
        className={`
          md:hidden
          absolute left-0 w-full bg-white border-b border-zinc-200
          overflow-hidden transition-all duration-300 ease-in-out
          ${open
            ? "max-h-[500px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-6"
          }
        `}
      >
        <div className="flex flex-col px-6 py-4 gap-4">

          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={close}
              className="text-sm font-medium text-zinc-700 hover:text-black"
            >
              {item.name}
            </Link>
          ))}

          {/* AUTH-BASED CONTACT (MOBILE TOO) */}
          {isAuthenticated && (
            <Link
              href="/contact"
              onClick={close}
              className="text-sm font-medium text-zinc-700 hover:text-black"
            >
              Contact
            </Link>
          )}

          {/* USER MENU */}
          <div onClick={close}>
            <UserMenu />
          </div>

        </div>
      </div>
    </header>
  );
}