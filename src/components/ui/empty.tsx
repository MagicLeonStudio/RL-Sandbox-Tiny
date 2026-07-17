import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, description = "No data", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex min-h-[160px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50", className)}
      {...props}
    >
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
)
Empty.displayName = "Empty"

export { Empty }
