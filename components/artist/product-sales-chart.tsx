"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

interface ProductSalesChartProps {
  productId: string
}

export function ProductSalesChart({ productId }: ProductSalesChartProps) {
  // In a real app, you would fetch this data based on the product ID
  const data = [
    { month: "Jan", sales: 5, revenue: 645 },
    { month: "Feb", sales: 8, revenue: 1032 },
    { month: "Mar", sales: 12, revenue: 1548 },
    { month: "Apr", sales: 10, revenue: 1290 },
    { month: "May", sales: 15, revenue: 1935 },
    { month: "Jun", sales: 18, revenue: 2322 },
    { month: "Jul", sales: 14, revenue: 1806 },
    { month: "Aug", sales: 12, revenue: 1548 },
    { month: "Sep", sales: 16, revenue: 2064 },
    { month: "Oct", sales: 10, revenue: 1290 },
    { month: "Nov", sales: 5, revenue: 645 },
    { month: "Dec", sales: 4, revenue: 516 },
  ]

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
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
                        <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                        <span className="font-bold">{payload[0].value} units</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                        <span className="font-bold">${payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Units Sold"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

