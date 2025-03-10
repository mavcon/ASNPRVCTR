"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Only show the UI after the theme is available to prevent flashing
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider {...props} enableSystem={true} enableColorScheme={true} storageKey="asnprvctr-theme">
      {mounted ? (
        children
      ) : (
        // Use a placeholder with the same structure to prevent layout shift
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </NextThemesProvider>
  )
}

