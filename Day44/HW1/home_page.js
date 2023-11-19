import {client} from "./client.js"
const appHome =  {
    result: null,
    addBlog: function (title,content,username,time) {
        console.log(time.takeTime)
        let a = moment.utc(time.takeTime, "YYYY-MM-DDTh:mm:ss").fromNow()
        content = this.regexString(content);
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
    regexString: function (content) {
        // let pattern = /^(?:((0|\+84)\d{9})|(\w+@[a-z]+\.[a-z]{2,})|((?:https|http):\/\/(?:www.youtube.com|youtu.be)(?:|\/watch?v=.+))|((https|http):\/\/[a-zA-Z]+[a-zA-Z0-9_.-]*\.[a-z]{2,}(:\d{2,}|)(\/.*|\/*)))/;
        // let pattern = /((?:0|\+84)\d{9})/
        let stringHTML = content;
        let pattern = /((?:0|\+84)\d{9})/g
        if (content.match(pattern)?.length) {
            content = content.replace(pattern,`<a href="tel:$1" target="_blank">$1</a>`)
        }
        pattern = /\w+@[a-z]+\.[a-z]{2,}/g

        if (content.match(pattern)?.length) {
            console.log("mail")
            content = content.replace(pattern,`<a href="mailto: $1" target="_blank">$1</a>`)
        }
        
        pattern = /((?:https|http):\/\/(?:www.youtube.com|youtu.be)(\/watch?\?v=.+|\/*))/g
        if (content.match(pattern)?.length) {
            console.log("youtube")
            content = content.replace(pattern, `<a href="$1" target="_blank">$1</a><iframe width="560" height="315" src="$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`)
        }

        pattern = /((|https:\/\/|http:\/\/)[^(@|www.youtube.com|(https|http):\/\/www.youtube.com|(https|http):\/\/www.youtube.com|youtu.be)][a-zA-Z]+[a-zA-Z0-9_.-]*\.[a-z]{2,}(?::\d{2,}|)(?:\/.*|\/*))/g
        if (content.match(pattern)?.length) {
            console.log("web")
            content = content.replace(pattern, `<a href="$1" target="_blank">$1</a>`)
        }
        return content;
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

appHome.start()
