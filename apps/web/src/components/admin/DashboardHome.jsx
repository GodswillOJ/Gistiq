"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useRouter } from "next/navigation";

const kpis = [
  {
    title: "Total Visitors",
    value: "1.2M",
    trend: "+18%",
    color: "#000000",
  },
  {
    title: "Ad Revenue",
    value: "$12,480",
    trend: "+9%",
    color: "#404040",
  },
  {
    title: "Engagement Rate",
    value: "74%",
    trend: "+12%",
    color: "#737373",
  },
  {
    title: "Published Posts",
    value: "428",
    trend: "+24",
    color: "#171717",
  },
];

const trafficData = [
  { month: "Jan", visitors: 1200 },
  { month: "Feb", visitors: 2100 },
  { month: "Mar", visitors: 3400 },
  { month: "Apr", visitors: 2900 },
  { month: "May", visitors: 4800 },
  { month: "Jun", visitors: 5300 },
];

const categoryData = [
  { name: "Politics", value: 35 },
  { name: "Technology", value: 25 },
  { name: "Sports", value: 18 },
  { name: "Entertainment", value: 22 },
];

const recentPosts = [
  {
    title: "Global Economic Shift & African Markets",
    category: "Business",
    views: "21K",
    status: "Published",
  },
  {
    title: "AI Revolution In African Journalism",
    category: "Technology",
    views: "14K",
    status: "Published",
  },
  {
    title: "Champions League Final Review",
    category: "Sports",
    views: "8K",
    status: "Draft",
  },
  {
    title: "Election Analysis Across West Africa",
    category: "Politics",
    views: "32K",
    status: "Published",
  },
];

const activityBreakdown = [
  "#000000",
  "#404040",
  "#737373",
  "#A3A3A3",
];

export default function DashboardHome() {
  const [welcome, setWelcome] = useState(() => {
    if (typeof window === "undefined") return false;

    const shown = sessionStorage.getItem("afrocry-admin-welcome");

    if (!shown) {
      sessionStorage.setItem("afrocry-admin-welcome", "true");
      return true;
    }

    return false;
  });
  const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              credentials: "include",
            }
          );

          if (!res.ok) {
            router.push("/login");
          }
        } catch {
          router.push("/login");
        }
      };

      checkAuth();
    }, [router]);

  return (
    <div className="space-y-8">

      {/* WELCOME */}
      {welcome && (
        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-6
            shadow-sm
            flex
            flex-col
            lg:flex-row
            justify-between
            gap-6
          "
        >
          <div>
            <p className="text-sm text-gray-500">
              AfroCry Media Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-black text-black">
              Welcome back Admin 👋
            </h1>

            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
              Monitor analytics, manage posts, control platform
              users, oversee content performance, and optimize
              engagement across the AfroCry Media ecosystem.
            </p>
          </div>

          <button
            onClick={() => setWelcome(false)}
            className="
              h-fit
              px-5
              py-3
              rounded-2xl
              bg-black
              text-white
              text-sm
              font-medium
              hover:opacity-90
              transition
            "
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >
        {kpis.map((item) => (
          <div
            key={item.title}
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              shadow-sm
            "
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-3 text-4xl font-black text-black">
              {item.value}
            </h2>

            <p
              className="mt-2 text-sm font-medium"
              style={{ color: item.color }}
            >
              {item.trend} this month
            </p>

            <div className="h-[100px] w-full mt-4">
              <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={trafficData}>
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke={item.color}
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* VISITORS */}
        <div
          className="
            xl:col-span-2
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-6
            shadow-sm
          "
        >
          <div className="mb-6">
            <h2 className="text-2xl font-black text-black">
              Audience Growth
            </h2>

            <p className="text-gray-500 mt-1">
              Monthly traffic and platform engagement.
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={trafficData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide />

              <Tooltip />

              <Bar
                dataKey="visitors"
                fill="#000000"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY */}
        <div
          className="
            bg-black
            text-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <div className="mb-6">
            <h2 className="text-2xl font-black">
              News Categories
            </h2>

            <p className="text-gray-300 mt-1">
              Most consumed content categories.
            </p>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Tooltip />

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={55}
                stroke="none"
              >
                {categoryData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={activityBreakdown[i]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {categoryData.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        activityBreakdown[i],
                    }}
                  />

                  <span className="text-sm">
                    {item.name}
                  </span>
                </div>

                <span className="text-sm font-medium">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POSTS TABLE */}
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          shadow-sm
          overflow-hidden
        "
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-black">
            Recent Posts
          </h2>

          <p className="text-gray-500 mt-1">
            Track latest content performance.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-5 px-6 text-sm text-gray-500">
                  Post
                </th>

                <th className="text-left py-5 px-6 text-sm text-gray-500">
                  Category
                </th>

                <th className="text-left py-5 px-6 text-sm text-gray-500">
                  Views
                </th>

                <th className="text-left py-5 px-6 text-sm text-gray-500">
                  Status
                </th>

                <th className="text-left py-5 px-6 text-sm text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {recentPosts.map((post, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100"
                >
                  <td className="py-6 px-6 font-medium text-black">
                    {post.title}
                  </td>

                  <td className="py-6 px-6 text-gray-600">
                    {post.category}
                  </td>

                  <td className="py-6 px-6 text-gray-600">
                    {post.views}
                  </td>

                  <td className="py-6 px-6">
                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        font-medium
                        ${
                          post.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {post.status}
                    </span>
                  </td>

                  <td className="py-6 px-6">
                    <button
                      className="
                        px-5
                        py-2
                        rounded-xl
                        border
                        border-black
                        text-black
                        text-sm
                        font-medium
                        hover:bg-black
                        hover:text-white
                        transition
                      "
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}