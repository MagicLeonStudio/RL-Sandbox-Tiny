import * as React from "react"
import { cn } from "@/lib/utils"

const Kbd = React.forwardRef<HTMLUnknownElement, React.HTMLAttributes<HTMLElement>>
(({ className, ...props }, ref) => (
  <kbd
    ref={ref as any}
    className={cn("pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100", className)}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
