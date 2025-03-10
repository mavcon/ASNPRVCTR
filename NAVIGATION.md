# Navigation System Guide

## Overview

The navigation system in ASNPRVCTR is designed to provide role-specific navigation while maintaining a consistent user experience. This document outlines the navigation architecture and provides guidelines to prevent common issues.

## Navigation Architecture

### Root Layout (`app/layout.tsx`)

The root layout contains the main header with `MainNav` component. This header is persistent across all pages and should never be duplicated or removed.

```tsx
// app/layout.tsx (simplified)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95">
              <div className="container flex h-16 items-center">
                <MainNav />
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

