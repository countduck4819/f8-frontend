import { App } from "./src/App";
import { mainRoot } from "./src/Utils/router";
import { Error } from "./src/Pages/Error";
window.navigate = function (path) {
    mainRoot.navigate(path);
};
const preventXSS = function (params) {
    params.route.path = params.route.path.replaceAll("%3C","&lt;").replaceAll("%3E","&gt;");
    return params;
}
const convertLink = function () {
    const a = document.querySelectorAll("a");
    [...a].forEach((value) => {
        if (value.dataset.route === "") {
            value.classList.add("route");
        }
    });
};
const root = document.querySelector("#root");
const { root: pathRoot, DefaultLayout } = App();
const render = function (component, DefaultLayout = "", params) {
    const stringHtml = DefaultLayout;
    const pattern = /{body}/;
    if (params) {
        console.log(params.route.path)
        root.innerHTML = stringHtml.replace(pattern, component(preventXSS(params)));
    } else {
        root.innerHTML = stringHtml.replace(pattern, component());
    }
    convertLink();
};
pathRoot.forEach(({ path, component }, _) => {
    mainRoot.on(path, (params) => {
        render(component, DefaultLayout, params);
    });
});
mainRoot.notFound((params) => {
    preventXSS(params)
    console.log(params.route.path)
    root.innerHTML = Error();

});

mainRoot.resolve();
