"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeStatus() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const themeLabels = {
    light: "Light Mode",
    dark: "Dark Mode",
    system: `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`,
  }

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Laptop,
  }

  const ThemeIcon = themeIcons[theme as keyof typeof themeIcons] || Laptop

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ThemeIcon className="h-5 w-5" />
              <span className="font-medium">Current Theme:</span>
            </div>
            <Badge variant="outline" className="ml-2">
              {themeLabels[theme as keyof typeof themeLabels] || "Unknown"}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence mode="wait">
              {["light", "dark", "system"].map((t) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button
                    variant={theme === t ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => setTheme(t)}
                  >
                    {t === "light" && <Sun className="mr-2 h-4 w-4" />}
                    {t === "dark" && <Moon className="mr-2 h-4 w-4" />}
                    {t === "system" && <Laptop className="mr-2 h-4 w-4" />}
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

