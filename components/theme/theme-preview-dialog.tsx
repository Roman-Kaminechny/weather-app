"use client"

import * as React from "react"

interface ThemePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemePreviewDialog({ open, onOpenChange }: ThemePreviewDialogProps) {
  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      {/* Заглушка для діалогу перегляду теми */}
    </div>
  )
} 