"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeInitializer() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // Add a class to prevent transitions on initial load
    document.documentElement.classList.add("no-transitions")

    // Remove the class after a short delay to allow transitions after initial render
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("no-transitions")
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Update the meta theme-color based on the current theme
  useEffect(() => {
    if (!resolvedTheme) return

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", resolvedTheme === "dark" ? "#020817" : "#ffffff")
    } else {
      const meta = document.createElement("meta")
      meta.name = "theme-color"
      meta.content = resolvedTheme === "dark" ? "#020817" : "#ffffff"
      document.head.appendChild(meta)
    }
  }, [resolvedTheme])

  return null
}

