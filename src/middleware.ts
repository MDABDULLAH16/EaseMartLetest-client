/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export async function middleware(request: NextRequest) {
  // Retrieve the auth token from cookies
  const token = request.cookies.get("authToken")?.value;

  // If no token exists, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode or validate the token to get user info
    const userInfo = decodeToken(token); // Replace with your actual token decoding logic

    // Get the current path
    const pathname = request.nextUrl.pathname;

    // Define role-based access rules
    if (userInfo.role === "user" && pathname.startsWith("/admin")) {
      // Redirect users away from admin routes
      return NextResponse.rewrite(new URL("/403", request.url)); // Forbidden page
    }

    if (userInfo.role === "admin" && pathname.startsWith("/dashboard")) {
      // Redirect admins away from user-specific routes
      return NextResponse.rewrite(new URL("/403", request.url)); // Forbidden page
    }
    // Prevent admins from accessing the /cart route
    if (userInfo.role === "admin" && pathname.startsWith("/cart")) {
      return NextResponse.rewrite(new URL("/403", request.url)); // Forbidden page
    }
    // Prevent admins from accessing the /cart route
    if (userInfo.role === "admin" && pathname.startsWith("/checkout")) {
      return NextResponse.rewrite(new URL("/403", request.url)); // Forbidden page
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and has the correct role, continue
  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*","/cart","/checkout"], // Protect /dashboard and /admin routes
};

// Example token decoding function
const decodeToken = (token: string) => {
  try {
    // Replace this with your actual token validation logic (e.g., JWT verification)
    const decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()) as {
      userId: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};