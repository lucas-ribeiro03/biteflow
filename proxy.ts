import { auth } from "./lib/auth";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoggedInWithTenant = !!req.auth?.user.tenantId;

  const isCreateTenantPage = req.nextUrl.pathname.startsWith("/create-tenant");
  const isHomePage = req.nextUrl.pathname === "/";

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (
    (isLoggedInWithTenant && isCreateTenantPage) ||
    (isLoggedInWithTenant && isHomePage)
  ) {
    return Response.redirect(new URL("/tenant/dashboard", req.nextUrl));
  }

  if (
    isLoggedIn &&
    !isLoggedInWithTenant &&
    !(isCreateTenantPage || isHomePage)
  ) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
