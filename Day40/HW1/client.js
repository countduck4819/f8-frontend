import * as con from "./config.js";
const {SERVER_API} = con.config;
console.log(SERVER_API)
export const client = {
    send: async function (url, method="GET", body = null) {
       url = `${SERVER_API}${url}`;
       const headers = {
            "Content-Type": "application/json"
       }

       const options = {
        method,
        headers
       };

       if (body) {
        options.body = JSON.stringify(body);
       }
       try {
        const response = await fetch(url,options);
        const data = await response.json();
        return {response, data};
       }
       catch(e) {
        throw new Error(e);
       }
    },
    get: function (url) {
        return this.send(url);
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
    delete: function(url) {
        return this.send(url,"DELETE")
    } 
}