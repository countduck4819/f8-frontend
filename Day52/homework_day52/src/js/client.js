import { config } from "./config";
const { SERVER_API } = config;
export const client = {
    send: async function (path, method = "GET", body = null) {
        const url = `${SERVER_API}${path}`;
        
        const headers = {
            "Content-Type": "application/json"
        }

        const options = {
            headers,
            method
        }
        if (body) {
            options["body"] = JSON.stringify(body);
        }
        try {
            const response = await fetch(url,options);
            const data = await response.json();
            return {response,data};
        } catch (e){
            console.log(e)
        }
    },
    get: function (url) {
        return this.send(url)
    },
    put: function (url,body) {
        return this.send(url,"PUT",body)
    },
    post: function (url,body) {
        return this.send(url,"POST",body)
    },
    patch: function (url,body) {
        return this.send(url,"PATCH",body)
    },
    put: function (url) {
        return this.send(url,"DELETE")
    }
}