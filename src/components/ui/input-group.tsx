import * as React from "react"
import { cn } from "@/lib/utils"

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative flex items-center", className)} {...props} />
))
InputGroup.displayName = "InputGroup"

const InputLeftAddon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground", className)} {...props} />
))
InputLeftAddon.displayName = "InputLeftAddon"

const InputRightAddon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground", className)} {...props} />
))
InputRightAddon.displayName = "InputRightAddon"

export { InputGroup, InputLeftAddon, InputRightAddon }
