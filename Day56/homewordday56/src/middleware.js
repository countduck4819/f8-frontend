// import { match } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import NotFound from "./app/not-found";
import { cookies } from "next/headers";
export { default } from "next-auth/middleware";
// import { getServerSession } from "next-auth";
// let headers = { "accept-language": "en-US,en;q=0.5" };
// let languages = new Negotiator({ headers }).languages();
// let locales = ["en-US", "vi-VN"];
// let defaultLocale = "en-US";

// match(languages, locales, defaultLocale); // -> 'en-US'
export function middleware(request) {
    // Check if there is any supported locale in the pathname
    // const { pathname } = request.nextUrl;
    // console.log(pathname);
    // const session = await getServerSession(authOptions);
    // console.log(session);
    // const pathname = request.nextUrl.pathname;
    // if (pathname.startsWith("/contact")) {
    //     console.log("pathname", pathname);
    //     const url = new URL("/auth", request.url);
    //     return NextResponse.redirect(url);
    // }
}

export const config = { matcher: ["/contact", "/profile"] };
