"use client";

import {
  Users,
  Newspaper,
  Eye,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,420",
    icon: Users,
  },
  {
    title: "Published Posts",
    value: "1,204",
    icon: Newspaper,
  },
  {
    title: "Monthly Views",
    value: "2.4M",
    icon: Eye,
  },
  {
    title: "Growth Rate",
    value: "+28%",
    icon: TrendingUp,
  },
];

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-3xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-4xl font-black mt-4 text-black">
                  {item.value}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}