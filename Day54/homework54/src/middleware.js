// import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import NotFound from "./app/not-found";

// let headers = { "accept-language": "en-US,en;q=0.5" };
// let languages = new Negotiator({ headers }).languages();
// let locales = ["en-US", "vi-VN"];
// let defaultLocale = "en-US";

// match(languages, locales, defaultLocale); // -> 'en-US'
export function middleware(request) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    console.log(pathname);

    // if (!pathname.startsWith("/en") && !pathname.startsWith("/vi")) {
    if (pathname === "/" || pathname === "") {
        console.log(1);
        const loginUrl = request.nextUrl.origin + "/en";
        console.log(loginUrl);
        return NextResponse.redirect(loginUrl);
    }
    //     // const loginUrl = request.nextUrl.origin + "/";
    //     // console.log(loginUrl);
    //     // return NextResponse.redirect(loginUrl);
    // }
}
