import {client} from "./client.js"

const app =  {
    result: null,
    addBlog: function (title,content,username,time) {
        console.log(time.takeTime)
        let a = moment.utc(time.takeTime, "YYYY-MM-DDTh:mm:ss").fromNow()
        return `<div class="card-body" style="border: 1px solid green;">
        <h3 class="card-title">${username}</h3>
        <div id="distance-time">
            <span>${time.day.replaceAll("-","/")}</span><br/>
            <span>${a}</span>
        </div>
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${content}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>`
    },
    getTime: function(time) {
        const day = time.slice(0, time.indexOf("T"))
        const timeInDate = time.slice(time.indexOf("T") + 1,time.indexOf("."))
        const takeTime = time.slice(0,time.indexOf("."))
        return {day,timeInDate,takeTime}
    },
    getBlog: async function() {
        const {data} = await client.get("/blogs");
        console.log(data)
        const result = data.data.reduce((prev,value,_) => {
            console.log(value.createdAt)
            const time = this.getTime(value.createdAt)
            return prev + this.addBlog(value.title,value.content,value.userId.name,time)
        },"")
        this.result = result;
        return this.result;
    },
    start: async function() {
        const html = await this.getBlog();
        console.log(this.result)
        const container = document.querySelector(".container");
        const divNew = document.createElement("div");
        const css = {
            color: "#fff",
        }
        divNew.innerHTML = html;
        Object.assign(divNew.style,css)
        container.appendChild(divNew)
    }
}

app.start()
