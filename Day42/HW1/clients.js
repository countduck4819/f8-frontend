import {config} from "./config.js";
import { requestRefresh } from "./util.js";
const {SERVER_API} = config;
export const client = {
    requestRefresh: null,
    serverApi: SERVER_API,
    token: null,
    setUrl: function(url) {
        this.serverApi = url;
    },
    setToken: function(token) {
        this.token = token
    },
    send: async function(path, method = "GET",body = null) {
        const url = `${this.serverApi}${path}`
        // tác vụ call api
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
            // Check token ở đây ---> nếu hết hạn -> gọi api refresh -> lưu lại -> gọi lại hàm send()
            console.log(method)
            if (!response.ok) {
                if (!this.requestRefresh) {
                    this.requestRefresh = requestRefresh(this)
                    const newToken = await this.requestRefresh;
                    console.log("sau1")
                    console.log(newToken)

                    if (newToken) {
                        // xử lí lưu token vào localStorage
                        this.token = newToken.access_token;
                        // XỬ lí --> gọi lại hàm send
                        return this.send(path,method,body)
                    }
                }
                return false;
            }
            const data = await response.json();
            return {response ,data};
        } catch (e) {
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

