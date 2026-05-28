"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Mock data for Revenue vs Expenses
const chartData = [
  { date: "2024-04-01", revenue: 450, expenses: 300 },
  { date: "2024-04-15", revenue: 520, expenses: 380 },
  { date: "2024-05-01", revenue: 480, expenses: 410 },
  { date: "2024-05-15", revenue: 610, expenses: 390 },
  { date: "2024-06-01", revenue: 590, expenses: 450 },
  { date: "2024-06-15", revenue: 720, expenses: 510 },
  { date: "2024-06-30", revenue: 810, expenses: 480 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))", // Usually a green/success color
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))", // Usually a red/danger color
  },
}

export function RevenueBarChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  // Auto-adjust range for mobile users
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d")
    }
  }, [isMobile])

  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date)
      const referenceDate = new Date("2024-06-30")
      let daysToSubtract = 90
      if (timeRange === "30d") daysToSubtract = 30
      if (timeRange === "7d") daysToSubtract = 7
      
      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  }, [timeRange])

  return (
    <Card className="w-full pt-0">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-6">
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>
            Comparing total revenue and operational expenses.
          </CardDescription>
        </div>
        <div className="flex items-center px-6 py-4 sm:py-0">
          {/* Desktop Toggle */}
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value)}
            variant="outline"
            className="hidden sm:flex"
          >
            <ToggleGroupItem value="90d">90 Days</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 Days</ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Select */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32.5 sm:hidden" aria-label="Select range">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-75 w-full"
        >
          <BarChart data={filteredData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={20}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--background)", opacity: 0.1 }}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar 
              dataKey="revenue" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
            <Bar 
              dataKey="expenses" 
              fill="#f43f5e" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}