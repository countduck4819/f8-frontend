import {config} from "./config.js";
import { requestRefresh } from "./utils.js";
const {SERVER_API} = config;

export const client = {
    requestRefresh: null,
    token: null,
    setToken: function(token) {
        this.token = token;
    },
    send: async function(path,method="GET", body) {
        const url = `${SERVER_API}${path}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5501",
        }
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }
        const options = {
            method,
            headers
        }
        if (body) {
            options.body = JSON.stringify(body)
        }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                if (!this.requestRefresh) {
                    this.requestRefresh = requestRefresh(this);
                    const newToken = await this.requestRefresh;
                    if (newToken) {
                        this.token = newToken.accessToken;
                        this.send(path,method,body)
                    }
                }
                return false;
            }
            const data = await response.json();
            return {data,response}
        } catch (e) {
            throw new Error(e)
        }
    },
    get: function (url) {
        return this.send(url)
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
    delete: function (url,body) {
        return this.send(url,"DELETE")
    }
}