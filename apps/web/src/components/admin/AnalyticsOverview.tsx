"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

const trafficData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 2100 },
  { month: "Mar", users: 1800 },
  { month: "Apr", users: 3400 },
  { month: "May", users: 4200 },
  { month: "Jun", users: 5100 },
];

const engagementData = [
  { name: "Comments", value: 35 },
  { name: "Likes", value: 25 },
  { name: "Shares", value: 20 },
  { name: "Bookmarks", value: 20 },
];

const categoryData = [
  { category: "Politics", posts: 42 },
  { category: "Technology", posts: 58 },
  { category: "Finance", posts: 35 },
  { category: "Sports", posts: 49 },
  { category: "Entertainment", posts: 28 },
];

const COLORS = [
  "#000000",
  "#404040",
  "#737373",
  "#a3a3a3",
];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          {
            title: "Total Users",
            value: "24,920",
            growth: "+12.5%",
          },
          {
            title: "Total Posts",
            value: "3,842",
            growth: "+8.2%",
          },
          {
            title: "Monthly Views",
            value: "1.2M",
            growth: "+18.1%",
          },
          {
            title: "Engagement Rate",
            value: "84%",
            growth: "+6.4%",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
            "
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-3 text-4xl font-black text-black">
              {item.value}
            </h2>

            <p className="mt-2 text-sm text-green-600">
              {item.growth} this month
            </p>
          </div>
        ))}
      </div>

      {/* MAIN CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* TRAFFIC */}
        <div
          className="
            xl:col-span-2
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-6
          "
        >
          <div className="mb-6">
            <h2 className="text-2xl font-black text-black">
              Platform Traffic
            </h2>

            <p className="text-gray-500 mt-1">
              Monthly active users growth.
            </p>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trafficData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="users"
                stroke="#000"
                fill="#d4d4d4"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ENGAGEMENT */}
        <div
          className="
            bg-black
            text-white
            rounded-3xl
            p-6
          "
        >
          <div className="mb-6">
            <h2 className="text-2xl font-black">
              Engagement
            </h2>

            <p className="text-gray-300 mt-1">
              User interaction breakdown.
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Tooltip />

              <Pie
                data={engagementData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
              >
                {engagementData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CATEGORY CHART */}
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          p-6
        "
      >
        <div className="mb-6">
          <h2 className="text-2xl font-black text-black">
            Category Performance
          </h2>

          <p className="text-gray-500 mt-1">
            Published posts by category.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="posts"
              fill="#000"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}