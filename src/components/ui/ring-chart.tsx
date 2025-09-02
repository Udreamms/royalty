
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Pie, PieChart as RechartsPieChart, Cell } from "recharts"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

export interface RingChartData {
  name: string
  value: number
  color: string
  tooltip?: React.ReactNode
}

interface RingChartProps {
  data: RingChartData[]
  className?: string
  chartConfig?: ChartConfig
  width?: number
  height?: number
}

export function RingChart({ data, className, chartConfig, width, height }: RingChartProps) {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [data])

  return (
    <ChartContainer
      config={chartConfig || {}}
      className={cn("mx-auto aspect-square", className)}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <RechartsPieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={48}
          outerRadius={60}
          startAngle={90}
          endAngle={450}
          cy="50%"
          cx="50%"
          strokeWidth={2}
          stroke="hsl(var(--background))"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  )
}
