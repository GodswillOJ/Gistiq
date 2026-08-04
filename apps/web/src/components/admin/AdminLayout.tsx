"use client";

import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <main className="h-screen overflow-hidden bg-[#f5f5f5] flex">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <AdminTopbar />

        {/* PAGE CONTENT */}
        <div
          className="
            flex-1
            overflow-y-auto
            p-6
          "
        >
          {children}
        </div>

      </div>
    </main>
  );
}