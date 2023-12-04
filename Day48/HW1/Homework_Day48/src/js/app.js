import { client } from "./client";
import { config } from "./config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { SERVER_API } = config;
export const app = {
    quantity: 0,
    convertCookieToObject: function (cookieBrowser) {
        let listCookie = cookieBrowser.replace(" ", "").split(";");
        listCookie = listCookie.map((value, index) => value.split("="));
        return Object.fromEntries(listCookie);
    },
    getApiKey: async function (email) {
        const { data, response } = await client.get(`/api-key?email=${email}`);
        const apiCookie = new URLSearchParams(data.data).toString();
        document.cookie = `${apiCookie};email=${email}`;
        let dataCookie = document.cookie;
        dataCookie = this.convertCookieToObject(dataCookie);
        client.setApiKey(dataCookie.apiKey);
        if (!response.ok) {
            throw new Error("Khong tim thay email");
        }
        console.log(data, response);
        return { response, data };
    },
    start: function (error = "") {
        if (!document.cookie) {
            const inputEmail = prompt("Please enter your email:");
            this.getApiKey(inputEmail);
            toast.warning("Vui lòng reload lại trang")
            console.log(client.apiKey);
        } else {
            if (error) {
                const inputEmail = prompt("Please enter your email:");
                this.getApiKey(inputEmail);
                toast.error("Vui lòng reset lại")
                console.log(client.apiKey);
            } else {
                let dataCookie = document.cookie;
                dataCookie = this.convertCookieToObject(dataCookie);
                console.log(dataCookie);
                toast.success("Chào mừng bạn quay trở lại")
            }
        }
    },
};
app.start();
