import Navigo from "navigo";

export const mainRoot = new Navigo("/",{ linksSelector: "a.route", hash: false });


export const router = function (root,DefaultLayout = "") {
    if (typeof DefaultLayout === "function") {
        DefaultLayout = DefaultLayout();
    }
    return {root,DefaultLayout}
}