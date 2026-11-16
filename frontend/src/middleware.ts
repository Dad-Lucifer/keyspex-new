import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Edge Middleware for Route Protection
 * Prevents direct unauthorized access to /dashboard, /dashboard/admin, and /dashboard/employee
 * Automatically redirects legacy employee subroutes to unified tab query params
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("ks_token")?.value;
    const role = request.cookies.get("ks_role")?.value;

    // 1. Not logged in -> redirect to /login immediately
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Admin dashboard requested, but user is not admin -> redirect to /login
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized_role");
      return NextResponse.redirect(loginUrl);
    }

    // 3. Employee portal requested, but user is not employee or admin -> redirect to /login
    if (pathname.startsWith("/dashboard/employee") && role !== "employee" && role !== "admin") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized_role");
      return NextResponse.redirect(loginUrl);
    }

    // 4. Redirect legacy employee subroutes (/dashboard/employee/projects, /dashboard/employee/slips, etc.) to single-page tab
    const employeeSubroutes = ["projects", "tasks", "salary", "payments", "slips", "contracts"];
    const subrouteMatch = pathname.match(/^\/dashboard\/employee\/([^\/]+)$/);
    if (subrouteMatch && employeeSubroutes.includes(subrouteMatch[1])) {
      const url = new URL("/dashboard/employee", request.url);
      url.searchParams.set("tab", subrouteMatch[1]);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
