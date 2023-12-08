import { config } from "./config.js";
import { clients } from "./clients.js";
import { toast } from "react-toastify";
export const app = {
    getUser: async function (email) {
        const { apiKey } = JSON.parse(localStorage.getItem("apiKey"));
        clients.setApiKey(apiKey);
        const {data,response} = await clients.get("/users/profile");
        toast.success("chào mừng "  + data.data.emailId.name + " trở lại");
        if (!response.ok) {
            toast.error("Vui lòng đăng nhập lại");
        }
        return data === "Welcome to API Todo";
    },
    getOrders: async function (body) {
        const { data, response } = await clients.post("/orders", body);
        if (!response.ok) {
            throw new Error("Thanh toán không thành công");
        }
    },
    getProducts: async function () {
        const { apiKey } = JSON.parse(localStorage.getItem("apiKey"));
        clients.setApiKey(apiKey);
        const { data, response } = await clients.get(
            `/products?limit=${config.LIMIT_PAGE}`
        );
        localStorage.setItem(
            "list-product",
            JSON.stringify(data.data.listProduct)
        );
        console.log(JSON.parse(localStorage.getItem("list-product")))
        if (!response.ok) {
            throw new Error("Khong lay dc san pham");
        }
        console.log(JSON.parse(localStorage.getItem("list-product")))
        return JSON.parse(localStorage.getItem("list-product"));
    },
    login: async function (email) {
        const { data, response } = await clients.get(`/api-key?email=${email}`);
        if (!response?.ok) {
            throw new Error("Sai Email vui long nhap lai");
        }
        clients.setApiKey(data.data.apiKey);
        localStorage.setItem("apiKey",JSON.stringify({
            apiKey: clients.apiKey,
            userEmail: email
        }))
        this.getUser(email);
        const object = {
            apiKey: data.data.apiKey,
            userEmail: email,
        };
        localStorage.setItem("apiKey", JSON.stringify(object));

        const result = await this.getProducts();
        const res = response.ok;
        if (localStorage.getItem("data_products")) {
            const dataProducts = JSON.parse(
                localStorage.getItem("data_products")
            );
            return { res, result, dataProducts };
        }
        return { res, result };
    },
    start: function (email) {
        return this.login(email);
    },
};
