import { client } from "./client.js";
const root = document.querySelector(".root");

const app = {
    query: {},
    render: function(data) {
        root.innerHTML = `<div class="container">
        <div class="items">
            ${[...Array(5).keys()].map((_,index) => {
                const rand = Math.floor(Math.random() * data.length);
                return `<div class="item${index+1} item">
                <img width="100%" height="100%" src="https://fullstack.edu.vn" alt="">
                <div class="shadow">
                    <div class="heart"><i class="fa-solid fa-heart" style="color: #ffffff;"></i> ${data[rand].heart}K</div>
                    <div class="message"><i class="fa-solid fa-message" style="color: #ffffff;"></i> ${data[rand].mess}</div>
                </div>
            </div>`
            })}
        </div>
    </div>`
    },
    getData: async function() {
        console.log(1)
        const {response ,data: data} = await client.get("/data")
        console.log(data)
        this.render(data)
    },
    start: function () {
        this.getData();
    }
}

app.start();