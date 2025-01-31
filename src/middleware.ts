import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the paths that require authentication
const protectedPaths = ["/dashboard", "/about"];

// Middleware function
export async function middleware(request: NextRequest) {
  // Get the current path
  const pathname = request.nextUrl.pathname;

  // Check if the current path is protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // Retrieve the auth token from cookies
    const token = request.cookies.get("authToken")?.value;

    // If no token exists, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Optionally, validate the token (e.g., verify JWT)
    try {
      // Example: Validate the token (replace with your actual validation logic)
      // await validateToken(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the user is authenticated or the path is not protected, continue
  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/about"], // Protect /dashboard and /about routes
};