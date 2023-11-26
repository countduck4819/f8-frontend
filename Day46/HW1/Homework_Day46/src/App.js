import { Home } from "./Pages/Home.js"
import { About } from "./Pages/About.js";
import { ProductDetail } from "./Pages/ProductDetail.js";
import { Products } from "./Pages/Products.js";
import { router } from "./Utils/router.js";
import { DefaultLayout } from "./Layouts/Default.js";
export const App = () => {
    return router([
        {
            path: "/",
            component: Home
        },
        {
            path: "/gioi-thieu",
            component: About
        },
        {
            path: "/san-pham",
            component: Products
        },
        {
            path: "/san-pham/:id",
            component: ProductDetail
        }
    ],
    DefaultLayout)
}