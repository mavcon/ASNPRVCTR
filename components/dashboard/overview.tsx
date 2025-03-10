"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 2300,
  },
  {
    name: "Mar",
    total: 3200,
  },
  {
    name: "Apr",
    total: 4500,
  },
  {
    name: "May",
    total: 3800,
  },
  {
    name: "Jun",
    total: 5000,
  },
  {
    name: "Jul",
    total: 4800,
  },
  {
    name: "Aug",
    total: 5300,
  },
  {
    name: "Sep",
    total: 6000,
  },
  {
    name: "Oct",
    total: 5500,
  },
  {
    name: "Nov",
    total: 6500,
  },
  {
    name: "Dec",
    total: 7000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

