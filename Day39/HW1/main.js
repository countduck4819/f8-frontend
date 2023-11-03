import { client } from "./client.js";
const root = document.querySelector(".root")
const container = document.querySelector(".root .container");

const app = {
    query: {},
    addHTML: function(data) {
        const items = document.createElement("div");
        items.classList.add("items")
            items.innerHTML = `
            ${[...Array(5).keys()].map((_,index) => {
                const rand = Math.floor(Math.random() * data.length);
                return `<div class="item${index+1} item">
                <img width="100%" height="100%" loading="lazy" src="${data[rand].image}" alt="">
                <div class="shadow">
                    <div class="heart"><i class="fa-solid fa-heart" style="color: #ffffff;"></i> ${data[rand].heart}K</div>
                    <div class="message"><i class="fa-solid fa-message" style="color: #ffffff;"></i> ${data[rand].mess}</div>
                </div>
            </div>`
            }).join("")}
    `
    container.append(items)
    },
    render: function(data) {
        const items = document.createElement("div");
        items.classList.add("items")
        container.innerHTML = [...Array(3).keys()].map((value,_) => {
            return `<div class="items">
            ${[...Array(5).keys()].map((_,index) => {
                const rand = Math.floor(Math.random() * data.length);
                return `<div class="item${index+1} item">
                <img width="100%" height="100%" src="${data[rand].image}" alt="">
                <div class="shadow">
                    <div class="heart"><i class="fa-solid fa-heart" style="color: #ffffff;"></i> ${data[rand].heart}K</div>
                    <div class="message"><i class="fa-solid fa-message" style="color: #ffffff;"></i> ${data[rand].mess}</div>
                </div>
            </div>`
            }).join("")}
        </div>`
        }).join("")

    },
    addEvent: function(data) {
        window.addEventListener("scroll",(e) => {
            const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
            console.log(scrollTop,scrollHeight,clientHeight)
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                const loading = document.querySelector(".loading");
                loading.classList.remove("hidden");
                this.promise(data).then((data) => {
                    this.addHTML(data);
                })
            }
        })
    }
    ,
    promise: function(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data)
            },1500)
        })
    },
    getData: async function() {
        console.log(1)
        const {response ,data} = await client.get("/data")
        this.addEvent(data)
        this.render(data)
    },
    start: function () {
        window.addEventListener("load", (e) => {
            root.classList.add("overfl");
            const loaded = document.querySelector(".loaded");
            this.getData();
            setTimeout(() => {
                root.classList.remove("overfl");
                loaded.classList.add("display-none")
            },3000)
        })
        document.addEventListener("DOMContentLoaded",function() {
            const loaded = document.querySelector(".loaded");
            loaded.classList.remove("display-none")
        })
    }
}

app.start();