import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Update the protectedRoutes array to include all customer routes
const protectedRoutes = [
  {
    pattern: /^\/dashboard(\/.*)?$/,
    roles: ["Admin", "Super-Admin"],
  },
  {
    pattern: /^\/super-admin(\/.*)?$/,
    roles: ["Super-Admin"],
  },
  {
    pattern: /^\/artist(\/.*)?$/,
    roles: ["Artist"],
  },
  {
    pattern: /^\/account(\/.*)?$/,
    roles: ["Customer", "Artist", "Admin", "Super-Admin"], // All logged-in users can access their account
  },
]

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if we're on a protected route
  const matchedRoute = protectedRoutes.find((route) => route.pattern.test(path))

  if (matchedRoute) {
    // Get the user from the cookie
    const userCookie = request.cookies.get("asnprvctr-user-store")

    if (!userCookie) {
      // No user cookie found, redirect to login
      const url = new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url)
      return NextResponse.redirect(url)
    }

    try {
      // Parse the user data from the cookie
      const userData = JSON.parse(userCookie.value)
      const currentUser = userData?.state?.currentUser

      // If no current user or user doesn't have the required role, redirect
      if (!currentUser || !matchedRoute.roles.includes(currentUser.role)) {
        // Determine where to redirect based on user role
        let redirectPath = "/"

        if (currentUser) {
          switch (currentUser.role) {
            case "Customer":
              redirectPath = "/account/dashboard"
              break
            case "Artist":
              redirectPath = "/artist"
              break
            case "Admin":
              redirectPath = "/dashboard"
              break
            case "Super-Admin":
              redirectPath = "/super-admin"
              break
          }
        }

        const url = new URL(redirectPath, request.url)
        return NextResponse.redirect(url)
      }
    } catch (error) {
      // Error parsing the cookie, redirect to login
      const url = new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/super-admin/:path*", "/artist/:path*", "/account/:path*"],
}

