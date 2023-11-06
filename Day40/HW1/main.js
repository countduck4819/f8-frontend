import {client} from "./client.js";
const root = document.querySelector(".root")
// console.log(client)
const app = {
    total: 0,
    inCreatePoint: 100,
    quantity: 3,
    quantityIndex: 0,
    render: function (data,index) {
        const dataIndex = data[index]

        function convertEntities(data) {
            return data.replaceAll(">","&gt;").replaceAll("<","&lt;")
        }
        root.innerHTML = `<div class="quiz"><h2>${convertEntities(dataIndex.question)}</h2>
        <button type="button">${convertEntities(dataIndex.a)}</button>
        <button type="button">${convertEntities(dataIndex.b)}</button>
        <button type="button">${convertEntities(dataIndex.c)}</button>
        <button type="button">${convertEntities(dataIndex.d)}</button></div>`
        this.addEvent(dataIndex,data);
    }
    ,
    checkPoint: function(choose,answer) {
        let result = answer.every((value,_) => {
                return choose.includes(value)
            });
        if (result) {
            this.total += this.inCreatePoint;
            if (this.inCreatePoint < 300) {
                this.inCreatePoint += 100;
            } 
            console.log(this.total)
        }
        else {
            this.inCreatePoint = 100;
        }
        
    },
    addEvent: function(dataIndex,data) {
        const quiz = document.querySelector(".quiz");
        let choose = [];
        Array.from(quiz.children).forEach((btn,_) => {
            console.log(btn)
            if (btn.localName === "button") {
                const clickButton = (e) => {
                    choose.push(btn.innerText)
                    if (choose.length === dataIndex.answer.length) {
                        this.checkPoint(choose,dataIndex.answer);
                        this.quantityIndex++;
                        if (this.quantityIndex <= this.quantity) {
                            this.render(data,this.quantityIndex)
                        }
                    }
                    btn.removeEventListener("click",clickButton)
                }
                btn.addEventListener("click",clickButton)
            }
        })
    },
    getData: async function () {
        const {response,data} = await client.get("/quiz")
        const quantity = Math.floor(Math.random * data.length);
        if ()
        this.render(data,this.quantityIndex);
    },
    start: function() {
        this.getData();
    }
}

app.start();