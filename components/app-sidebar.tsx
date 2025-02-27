"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AppSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className, ...props }: AppSidebarProps) {
  return (
    <div className={cn("bg-sidebar border-r border-sidebar-border", className)} {...props}>
      {/* Заглушка для сайдбару */}
    </div>
  )
} 