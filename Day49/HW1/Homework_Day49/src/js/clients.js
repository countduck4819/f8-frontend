import { config } from "./config";
import { requestApiKey } from "./utils";
const { SERVER_API } = config;

export const clients = {
    requestApiKey: null,
    apiKey: null,
    setApiKey: function (apiKey) {
        this.apiKey = apiKey;
    },
    send: async function (path, method="GET",body) {
        const url = `${SERVER_API}${path}`;

        const headers = {
            "Content-Type": "application/json"
        }

        if (this.apiKey) {
            if (!path.includes("products") && !path.includes("/api-key?email")) {
                headers["X-Api-Key"] = `${this.apiKey}`;
            }
        }
        const options = {
            headers,
            method
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                if (!this.requestApiKey) {
                    this.requestApiKey = requestApiKey(this);
                    const newApiKey = await this.requestApiKey;
                    if (newApiKey) {
                        this.apiKey = newApiKey.apiKey;
                        this.send(path,method,body);
                    }
                }
                return false
            }
            const data = await response.json();
            return {response,data}
        }
        catch(e){
            // throw new Error(e);
        }
    },
    get: function (url) {
        return this.send(url);
    },
    get2: function (url,body) {
        return this.send(url,body);
    },
    post: function (url,body) {
        return this.send(url,"POST",body)
    },
    put: function (url,body) {
        return this.send(url,"PUT",body)
    },
    patch: function (url,body) {
        return this.send(url,"PATCH",body)
    },
    delete: function (url) {
        return this.send(url,"DELETE")
    }
}