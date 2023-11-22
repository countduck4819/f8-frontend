import Navigo from "navigo";

export const navi = new Navigo('/',{linksSelector: "a",hash: true});

export const router = function (root, DefaultLayout="") {
    if (typeof  DefaultLayout === "function") {
        DefaultLayout =  DefaultLayout()
        return {root, DefaultLayout};
    }
    return {root, DefaultLayout}
}