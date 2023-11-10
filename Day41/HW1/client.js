import {config} from "./config.js";
const {SERVER_API} = config;

export const client = {
    token: null,
    setToken: function(token) {
        this.token = token;
    },
    send: async function(url, method="GET", body = null) {
        url = `${SERVER_API}${url}`
        const headers = {
            "Content-Type": "application/json"
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
            const response = await fetch(url,options);
            const data = await response.json();
            return {data,response}
        } catch(e) {
            throw new Error(e);
        }
    },
    get: function (url) {
        // call api với Get method
        return this.send(url);
    },
    post: function (url,body) {
        // call api với POST method
        return this.send(url,"POST",body);
    },
    put: function (url,body) {
        // call api với PUT method
        return this.send(url,"PUT",body);
    },
    patch:function (url,body) {
        // call api với PATCH method
        return this.send(url,"PATCH",body);
    },
    delete: function (url) {
        // call api với delete method
        return this.send(url,"DELETE");
    }
}