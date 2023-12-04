import { config } from "./config";

const {SERVER_API} = config;

export const client = {
    apiKey: null,
    setApiKey: function(apiKey) {
        this.apiKey = apiKey;
    },
    send: async function (url,method="GET",body) {
        url = `${SERVER_API}${url}`;
        let headers = {
            "Content-Type":"application/json",
        }
        if (!url.includes("api-key")) {
            headers["X-Api-Key"] = `${this.apiKey}`
        }
        let options = {
            method,
            headers,
        }
        if (body) {
            options.body = JSON.stringify(body)
        }
        try {
            const response = await fetch(url,options);
            const data = await response.json();
            return {response,data};
        }
        catch (e) {
            throw new Error(e);
        }
    },
    get: function(url,body) {
        return this.send(url,body)
    },
    post: function(url,body) {
        return this.send(url,"POST",body)
    },
    put: function(url,body) {
        return this.send(url,"PUT",body)
    },
    patch: function(url,body) {
        return this.send(url,"PATCH",body)
    },
    delete: function(url,body) {
        return this.send(url,"DELETE",body)
    }
}