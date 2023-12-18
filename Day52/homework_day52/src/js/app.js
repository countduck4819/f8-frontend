import { client } from "./client";
import { config } from "./config";
const {SERVER_API, LIMIT} = config;

export const app = {
    getPage: async function(page) {
        let p = page
        if (localStorage.getItem("page")) {
            p= JSON.parse(localStorage.getItem("page"))
        }
        console.log(page)
        const {response,data} = await client.get(`/products/?limit=${LIMIT}&page=${p}`)
        console.log(response,data);
        if (!response.ok) {
            throw new Error("Không lấy được sản phẩm")
        }
        const listProducts = data.data.listProduct;
        localStorage.setItem("products",JSON.stringify(listProducts));
        console.log(listProducts)
        return listProducts
    }
}