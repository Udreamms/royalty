
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, Menu } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- Constants ---
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";

// --- Context ---
type SidebarContextValue = {
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

// --- Provider ---
export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, style, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const toggleSidebar = React.useCallback(
    () => setOpenMobile((prev) => !prev),
    []
  );

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          ref={ref}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              ...style,
            } as React.CSSProperties
          }
          className={cn("flex min-h-svh w-full", className)}
          {...props}
        />
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

// --- Main Components ---
export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const sidebarContent = (
    <div data-sidebar="sidebar" className="flex h-full flex-col">
      {children}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className="w-[--sidebar-width-mobile] p-0"
          style={
            { "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
          }
        >
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-10 hidden h-full w-[--sidebar-width] flex-col border-r bg-background md:flex",
        className
      )}
      {...props}
    >
      {sidebarContent}
    </aside>
  );
});
Sidebar.displayName = "Sidebar";

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "flex-1 flex-col transition-[margin-left]",
        "md:ml-[--sidebar-width]",
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("md:hidden", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <Menu />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

// --- Building Blocks ---
export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-16 items-center justify-between p-4", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-4 overflow-auto p-4", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col p-4", className)} {...props} />
));
SidebarFooter.displayName = "SidebarFooter";

// --- Menu Components ---
const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2.5 overflow-hidden rounded-md p-2 text-left text-sm font-medium outline-none ring-ring transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "",
        secondary:
          "data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild, isActive, variant, tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  const button = (
    <Comp
      ref={ref}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        {...(typeof tooltip === "string" ? { children: tooltip } : tooltip)}
      />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";


// --- Collapsible Menu ---
export const SidebarCollapsible = Collapsible.Root;

export const SidebarCollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof SidebarMenuButton>
>(({ children, ...props }, ref) => (
  <SidebarMenuButton ref={ref} {...props}>
    {children}
    <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
  </SidebarMenuButton>
));
SidebarCollapsibleTrigger.displayName = "SidebarCollapsibleTrigger";

export const SidebarCollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Collapsible.Content>
>(({ className, ...props }, ref) => (
  <Collapsible.Content
    ref={ref}
    className={cn("space-y-1 py-1 pl-7", className)}
    {...props}
  />
));
SidebarCollapsibleContent.displayName = "SidebarCollapsibleContent";
