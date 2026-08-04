"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const traffic = [
  { month: "Jan", users: 2400 },
  { month: "Feb", users: 3200 },
  { month: "Mar", users: 5100 },
  { month: "Apr", users: 4300 },
  { month: "May", users: 6500 },
  { month: "Jun", users: 8100 },
];

const posts = [
  { category: "Politics", posts: 120 },
  { category: "Sports", posts: 90 },
  { category: "Tech", posts: 180 },
  { category: "Finance", posts: 70 },
];

export default function DashboardCharts() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black">
            Audience Growth
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Monthly website traffic overview
          </p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={traffic}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#000"
              fill="#000"
              fillOpacity={0.08}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black">
            Top Categories
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Most published categories
          </p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={posts}>
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
    </section>
  );
}