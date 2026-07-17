import * as React from "react"
import { cn } from "@/lib/utils"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full overflow-hidden rounded-lg border bg-card p-4", className)} {...props} />
))
Chart.displayName = "Chart"

const ChartHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4 flex items-center justify-between", className)} {...props} />
))
ChartHeader.displayName = "ChartHeader"

const ChartTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>
(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
ChartTitle.displayName = "ChartTitle"

export { Chart, ChartHeader, ChartTitle }
