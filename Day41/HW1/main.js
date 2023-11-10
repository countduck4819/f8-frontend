import {client} from "./client.js";
const root = document.querySelector(".root")
// console.log(client)
window.comTime = 100000;
window.countTime = 10;
window.totalTime = countTime
window.percentTime = 100;
window.divTime;
window.animationFrame;
window.check = 0;
window.endTime;
window.point;
window.requestFunction = (currentTime) => {
    const run = document.querySelector(".run")
    console.log(1)
    window.percentTime = 100 - (((currentTime - window.endTime) / 1000) / window.totalTime) * 100;
    console.log(window.percentTime,window.countTime)
    run.style.width = `${window.percentTime}%`
    window.point = Math.floor(1000 * window.percentTime / 100)
    if (currentTime >= window.comTime && window.check === 1) {
        window.comTime += 1000;
        window.countTime--;
        window.divTime.innerText = window.countTime;
    }
    window.animationFrame = requestAnimationFrame(window.requestFunction)
    if (window.countTime <= 0 || window.check === 0) {
        if (window.countTime <= 0)  {
            app.quantityIndex++;
            // console.log(this.quantityIndex)
            if (app.quantityIndex <= app.quantity) {
                app.render(app.storeData.data,app.quantityIndex)
            }
        }
        window.check = 1;
        window.percentTime = 100;
        window.countTime = window.totalTime
        window.endTime = currentTime
        cancelAnimationFrame(window.animationFrame)
    }
}
const app = {
    dung: 0,
    sai: 0,
    storeData: {},
    total: 0,
    time: window.totalTime,
    inCreatePoint: 0,
    quantity: 3,
    quantityIndex: 0,
    chuoi: 0,
    maxchuoi: 0,
    render: function (data,index) {
        const dataIndex = data[index]

        function convertEntities(data) {
            return data.replaceAll(">","&gt;").replaceAll("<","&lt;")
        }
        root.innerHTML = `<div class="time">${this.time}</div><div class="quiz"><h2>${convertEntities(dataIndex.question)}</h2>
        <button class="btn" data-q="a" data-index="1" type="button">${convertEntities(dataIndex.a)}</button>
        <button class="btn" data-q="b" data-index="2" type="button">${convertEntities(dataIndex.b)}</button>
        <button class="btn" data-q="c" data-index="3" type="button">${convertEntities(dataIndex.c)}</button>
        <button class="btn" data-q="d" data-index="4" type="button">${convertEntities(dataIndex.d)}</button></div>`
        this.addEvent(dataIndex,data);
        console.log(this.time)
        window.divTime = document.querySelector(".time")
        this.requestAnimationFrame(data)

    }
    ,checkPoint: function(choose,answer) {
        const pointTag = document.querySelector(".point")
        const bonus = document.querySelector(".bonus")
        let result = answer.every((value,_) => {
                return choose.includes(value)
            });
        if (result) {
            this.chuoi++;
            this.dung++;
            const span = document.querySelector(".completed span:first-child");
            span.innerText = this.dung;
            const quiz = document.querySelector(".quiz");
            answer.forEach(function(value) {
                Array.from(quiz.children).forEach(function(value1) {
                    if (value1.dataset.q === value) {
                        value1.classList.add("correct");
                    }
                })
            })
            this.total = this.total + window.point + this.inCreatePoint;
            if (this.inCreatePoint < 300) {
                this.inCreatePoint += 100;
                
            } 
            console.log(this.total)
        }
        else {
            const quiz = document.querySelector(".quiz");
            this.inCreatePoint = 0;
            choose.forEach(function(value) {
                Array.from(quiz.children).forEach(function(value1) {
                    if (value1.dataset.q === value) {
                        value1.classList.add("incorrect");
                    }
                })
            })
            if (this.chuoi > this.maxchuoi) {
                this.maxchuoi = this.chuoi;
            }
            this.chuoi = 0;
        }
        
        pointTag.innerText = `Point: ${this.total}`
        bonus.innerText = `+${this.inCreatePoint}`
    },
    requestAnimationFrame: function(data) {
        window.animationFrame = requestAnimationFrame(window.requestFunction);
        console.log(window.countTime)
        
    },

    addEvent: function(dataIndex,data) {
        const quiz = document.querySelector(".quiz");
        const end = document.querySelector(".end");
        let choose = [];
        Array.from(quiz.children).forEach((btn,_) => {
            console.log(btn)
            if (btn.localName === "button") {
                const clickButton = (e) => {
                    choose.push(btn.dataset.q)
                    console.log(choose)
                    if (choose.length === dataIndex.answer.length) {
                        window.check = 0;   
                        this.checkPoint(choose,dataIndex.answer);
                        this.quantityIndex++;
                        if (this.quantityIndex <= this.quantity) {
                            setTimeout(() => {
                                this.render(data,this.quantityIndex)
                                window.endTime = performance.now();
                                window.countTime = 10;
                                window.percentTime = 100;
                                window.check = 1
                                window.comTime = performance.now() + 1000;
                            },2000)
                        }
                        else {
                            if (this.maxchuoi < this.chuoi) {
                                this.maxchuoi = this.chuoi;
                            }
                            end.classList.remove("hidden")
                            const tongket = document.querySelector(".tongket");
                            const score = tongket.querySelector(".score span:first-child");
                            score.innerText = this.total;
                            const chuoi = tongket.querySelector(".chuoi span:first-child");
                            chuoi.innerText = this.maxchuoi;
                            const correct = tongket.querySelector(".correct span:first-child");
                            correct.innerText = this.dung
                            const incorrect = tongket.querySelector(".incorrect span:first-child");
                            incorrect.innerText = this.sai
                        }
                    }
                    btn.removeEventListener("click",clickButton)
                }
                btn.addEventListener("click",clickButton)
            }
        })
    },
    endGame: function() {

    },
    getData: async function () {
        const {response,data} = await client.get("/quiz");
        this.storeData.data = data;
        const quantity = Math.floor(Math.random() * data.length);
        if (quantity <= 10 && quantity > 3) {
             this.quantity = quantity;
        }
        const span = document.querySelector(".completed span.total");
        span.innerText = this.quantity + 1;
        this.render(data,this.quantityIndex);
    },
    start: function() {
        this.getData();
    }
}
function st() {
    let tinhTime = 4
    const started = document.querySelector(".started");
    const header = document.querySelector(".header")
    started.addEventListener("click", function() {
        started.innerText = tinhTime;
        started.style.border = "none"
        var a = setInterval(function() {
            tinhTime--;
            started.innerText = tinhTime;
            if (tinhTime === 0) {
                clearInterval(a)
                started.classList.add("hidden")
            }
        },1000)
        setTimeout(function() {
            window.endTime = performance.now();
            window.countTime = 10;
            window.percentTime = 100;
            window.check = 1
            window.comTime = performance.now() + 1000;
            header.classList.remove("hidden")
            app.start();
        },4000)
    })
}
st();

const playAgain = document.querySelector(".play-again-btn");
playAgain.addEventListener("click",function(e) {
    const started = document.querySelector(".started");
    const header = document.querySelector(".header")
    let tinhTime = 4
    this.parentElement.parentElement.classList.add("hidden")
    Object.assign(app,{dung: 0,
        sai: 0,
        storeData: {},
        total: 0,
        time: window.totalTime,
        inCreatePoint: 0,
        quantity: 3,
        quantityIndex: 0,
        chuoi: 0,
        maxchuoi: 0,})
        started.classList.remove("hidden")
        root.parentElement.innerHTML = "";
        started.innerText = tinhTime;
        started.style.border = "1px solid #fff"
        st();
});
