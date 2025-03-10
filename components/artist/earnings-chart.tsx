"use client"

import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 1000) + 100,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 1000) + 100,
  },
]

export function ArtistEarningsChart() {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Earnings</span>
                      <span className="font-bold">${payload[0].value.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke={theme === "dark" ? "hsl(var(--primary))" : "hsl(var(--primary))"}
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

