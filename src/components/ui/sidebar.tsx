import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider")
  return context
}

const SidebarProvider = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { defaultCollapsed?: boolean }>
(({ defaultCollapsed = false, className, style, children, ...props }, ref) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div ref={ref} className={cn("flex min-h-screen", className)} style={style} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, children }, ref) => {
  const { collapsed } = useSidebar()
  return (
    <div ref={ref} className={cn("flex flex-col border-r bg-background transition-all duration-300", collapsed ? "w-16" : "w-64", className)}>
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>
(({ className, ...props }, ref) => {
  const { collapsed, setCollapsed } = useSidebar()
  return (
    <Button ref={ref} variant="ghost" size="icon" className={className} onClick={() => setCollapsed(!collapsed)} {...props}>
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center border-b p-4", className)} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-auto py-2", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border-t p-4", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("py-2", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-4 py-1 text-xs font-semibold text-muted-foreground", className)} {...props} />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarMenu = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1 px-2", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean, isActive?: boolean }>
(({ className, asChild, isActive, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp ref={ref} className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground", isActive && "bg-accent text-accent-foreground", className)} {...props} />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuSub = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ml-4 flex flex-col gap-1 border-l pl-2", className)} {...props} />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>
(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground", className)} {...props} />
))
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

const SidebarRail = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-border", className)} {...props} />
))
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>
(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 flex-col", className)} {...props} />
))
SidebarInset.displayName = "SidebarInset"

export {
  useSidebar, SidebarProvider, Sidebar, SidebarTrigger,
  SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarMenu,
  SidebarMenuItem, SidebarMenuButton, SidebarMenuSub,
  SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarRail, SidebarInset,
}
