import { client } from "./client";
import {config} from "./config";
const {SERVER_API} = config;
export const app = {
    convertCookieToObject: function (cookieBrowser) {
        let listCookie = cookieBrowser.replace(" ","").split(";");
        listCookie = listCookie.map((value,index) => value.split("="));
        return Object.fromEntries(listCookie)
    },
    getApiKey: async function (email) {
        const {data,response} = await client.get(`/api-key?email=${email}`);
        const apiCookie = new URLSearchParams(data.data).toString();
        document.cookie = `${apiCookie};email=${email}`;
        let dataCookie = document.cookie;
        dataCookie = this.convertCookieToObject(dataCookie)
        client.setApiKey(dataCookie.apiKey)
        if (!response.ok) {
            throw new Error("Khong tim thay email")
        }
        console.log(data,response);
        return {response,data} 
    },
    start: function() {
        if (!document.cookie) {
            const inputEmail = prompt("Please enter your email:");
            this.getApiKey(inputEmail);
            console.log(client.apiKey)
        }
        else {
            let dataCookie = document.cookie;
            dataCookie = this.convertCookieToObject(dataCookie)
            console.log(dataCookie)
        }
    }   
}
app.start()