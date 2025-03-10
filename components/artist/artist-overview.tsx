"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Feb",
    total: 1900,
  },
  {
    name: "Mar",
    total: 1500,
  },
  {
    name: "Apr",
    total: 2200,
  },
  {
    name: "May",
    total: 2800,
  },
  {
    name: "Jun",
    total: 3100,
  },
  {
    name: "Jul",
    total: 2900,
  },
  {
    name: "Aug",
    total: 3300,
  },
  {
    name: "Sep",
    total: 3800,
  },
  {
    name: "Oct",
    total: 3500,
  },
  {
    name: "Nov",
    total: 4200,
  },
  {
    name: "Dec",
    total: 4800,
  },
]

export function ArtistOverview() {
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

