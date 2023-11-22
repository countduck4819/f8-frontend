import {client} from "./client.js"
import {config} from "./config.js"
const {LIMIT_PAGE} = config
const root = document.querySelector("#root")
export const app = {
    username: null,
    q: {
        _limit: LIMIT_PAGE,
        _page: 1,
    },

    formSignUp: false,
    loginStatus: false,
    user: null,
    isLogin: function () {
        return this.loginStatus;
    },
    render: function() {
        root.innerHTML = this.isLogin() ? this.dashboard() : (this.formSignUp ? this.registerForm() : this.loginForm());
        if (this.isLogin()) {
            this.getBlogs()
        }
    },
    addBlog: function (title,content,username,time) {
        let a = moment.utc(time.takeTime, "YYYY-MM-DDTh:mm:ss").fromNow()
        content = this.regexString(content)
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
    loginForm: function() {
        return `
        <button class="convert-sign-in btn btn-secondary">Đăng nhập</button>
        <button class="convert-sign-up btn btn-primary">Đăng kí</button>
        <div class="home-page">
        <a href="./home-page.html" class="">Trang chủ</a></div>
        <div class="container justify-content-center">
        <h2 class="text-center">Đăng nhập</h2>
        <form class="form-login" action="">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button class="btn btn-primary">Đăng nhập</button>
            </form>
    </div>`
    },
    registerForm: function() {
        return `<button class="convert-sign-in btn btn-primary">Đăng nhập</button>
        <button class="convert-sign-up btn btn-secondary">Đăng kí</button>
        <div class="home-page">
        <a href="./home-page.html" class="">Trang chủ</a></div>
        <div class="container justify-content-center">
        <h2 class="text-center">Đăng kí</h2>
        <form class="form-sign-up" action="">
            <div class="mb-3">
              <label for="username" class="form-label">User name</label>
              <input type="text" name="name" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button class="btn btn-primary">Đăng nhập</button>
            </form>
    </div>`
    },
    login: async function ({email,password},el) {
        const {response, data} = await client.post("/auth/login", {
            email,
            password
        })
        if (!response.ok) {
            throw new Error("Không thể đăng nhập")
        }
        const {accessToken, refreshToken} = data.data;
        localStorage.setItem("login_token", JSON.stringify({
            accessToken,
            refreshToken
        }))
        this.username = data.data.name;
        this.loginStatus = true;
        this.checkAuth()
    },
    register: async function({name,email,password},el) {
        const {data,response} = await client.post("/auth/register",{
            email,
            password,
            name
        });
        if (!response.ok) {
            this.register({name,email,password},el);
            this.login({email,password}, el)
            return;
        }
        this.login({email,password}, el)
    },
    blogs: async function({content,title},time="") {
        if (time === "") {
            console.log(1232)
            const {data,response} = await client.post("/blogs", {
                content,
                title
            });
        }else {
            const newData = new Date();
            time = new Date(time);
            
            console.log(newData,time)
            let a = moment.utc(newData)
            let b = moment.utc(time)
            console.log(a, b)
            console.log("hello",time,b.diff(a))
            if (b.diff(a) < 0) {
                console.log("hello",time)
                const {data,response} = await client.post("/blogs", {
                    content,
                    title
                });
            }
        }
    },
    convertTime: function(time) {
        const currentTime = time.slice(0,time.indexOf(".")).replaceAll("T"," ").replaceAll("-"," ").replaceAll(":"," ").split(" ")
        return currentTime;
    }
    ,
    convertUrl: function(q) {
        return new URLSearchParams(q).toString()
    },
    getTime: function(time) {
        const day = time.slice(0, time.indexOf("T"))
        const timeInDate = time.slice(time.indexOf("T") + 1,time.indexOf("."))
        const takeTime = time.slice(0,time.indexOf("."))
        return {day,timeInDate,takeTime}
    },
    getBlogs: async function() {
        const {data,response} = await client.get(`/blogs`);

        const addDiv = document.createElement("div") ;
        addDiv.classList.add("them")
        let html = "";
        (data.data).forEach((value,index) => {
            const time = this.getTime(value.createdAt)
            html += this.addBlog(value.title,value.content,value.userId.name,time)
        })
        addDiv.innerHTML = html;
        root.append(addDiv)
    },
    updateBlog: async function({content,title},username) {
        const {data,response} = await client.get(`/blogs`);
        const them = document.querySelector(".them")
        let html = "";
        (data.data).forEach((value,index) => {
            const time = this.getTime(value.createdAt)
            html += this.addBlog(value.title,value.content,value.userId.name,time)
        })
        them.innerHTML = html;
        
    },
    setTimeBlog: function () {

    },
    addEvent: function() {
        root.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = [...new FormData(e.target)];
            const data = Object.fromEntries(form);
            console.log(data)
            if (e.target.classList.contains("form-login")) {
                this.login(data,e.target);
            }
            else if (e.target.classList.contains("form-sign-up")) {
                this.register(data,e.target);
            }
            else if (e.target.classList.contains("form-add")) {
                this.blogs(data,data.time)
                this.updateBlog(data,this.username)
            }
        })
        root.addEventListener("click",(e) => {
            if (e.target.classList.contains("logout")) {
                this.handleLogout();
            }
        })
        root.addEventListener("click", (e) => {
            if (e.target.classList.contains("convert-sign-in")) {
                if (this.formSignUp !== false) {
                    this.formSignUp = false;
                    this.render();
                }
            }else if (e.target.classList.contains("convert-sign-up")) {
                if (this.formSignUp !== true) {
                    this.formSignUp = true
                    this.render();
                }
            }
        })
    },
    dashboard: function () {
        return `<div class="container py-3">
        <h1>Chào mừng bạn quay trở lại</h1>
        <ul class="list-unstyled d-flex gap-2 profile">
        <li>Chào bạn: <span>${this.user}</span></li>
        <li><a href="#" class="logout">Đăng xuất</a></li>
        </ul>
    </div>
       <form class="form-add action border border-primary">
       <button class="add btn btn-primary mt-1" style="margin: 120px 300px 10px;">Thêm</button>
       <br/>
       <div class="mb-3"><label style="margin: 10px 300px;">title</label><br/>
       <input type="text" name="title" style="margin: 10px 300px;" class="input"></div>
       <div class="mb-3"><label for="content-1" style="margin: 10px 300px;">content</label><br/>
       <textarea name="content" cols="100" rows="10" id="content-1" style="margin: 10px 300px;"></textarea></div>
       <div class="mb-3"><label style="margin: 10px 300px;">Select time</label><br/>
       <input type="datetime-local" name="time" style="margin: 10px 300px;" class="input"></div>
       </form>`
    },
    handleLogout: async function() {
        try {
            client.setToken(JSON.parse(localStorage.getItem("login_token")).accessToken);
            await client.post("/auth/logout");
            localStorage.removeItem("login_token");
            this.loginStatus = false;
            this.render();
        } catch(e) {
            throw new Error(e);
        }
    },
    regexString: function (content) {
        // let pattern = /^(?:((0|\+84)\d{9})|(\w+@[a-z]+\.[a-z]{2,})|((?:https|http):\/\/(?:www.youtube.com|youtu.be)(?:|\/watch?v=.+))|((https|http):\/\/[a-zA-Z]+[a-zA-Z0-9_.-]*\.[a-z]{2,}(:\d{2,}|)(\/.*|\/*)))/;
        // let pattern = /((?:0|\+84)\d{9})/
        let stringHTML = content;
        let pattern = /((?:0|\+84)\d{9})/g
        if (content.match(pattern)?.length) {
            content = content.replace(pattern,`<a href="tel:$1" target="_blank">$1</a>`)
        }
        pattern = /(\w+@[a-z]+\.[a-z]{2,})/g

        if (content.match(pattern)?.length) {
            console.log("mail")
            content = content.replace(pattern,`<a href="mailto: $1" target="_blank">$1</a>`)
        }
        
        pattern = /((https|http):\/\/(www.youtube.com|youtu.be)(?:\/watch?\?v=([a-zA-z0-9_-]+)(|&.*)|\/*))/g
        if (content.match(pattern)?.length) {
            // if ()
            content = content.replace(pattern, `<a href="$1" target="_blank">$1</a><iframe id="player" type="text/html" width="560" height="315" src="$2://$3/embed/$4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`)
        }

        pattern = /((|https:\/\/|http:\/\/)[^(@\w|www.youtube.com|(https|http):\/\/www.youtube.com|(https|http):\/\/www.youtube.com|youtu.be)][a-zA-Z]+[a-zA-Z0-9_.-]*\.[a-z]{2,}(?::\d{2,}|)(?:\/.*|\/*))/g
        if (content.match(pattern)?.length) {
            console.log("web")
            content = content.replace(pattern, `<a href="$1" target="_blank">$1</a>`)
        }
        return content;
    },
    checkAuth: async function() {
        if (localStorage.getItem("login_token")) {
            try {
                root.innerHTML = `<div class="container py-3">
                <h2 class="text-center">Loading ... </h2></div>`
                const {refreshToken, accessToken} = JSON.parse(localStorage.getItem("login_token"));
                if(!accessToken) {
                    throw new Error("access token not exits");
                }
                client.setToken(accessToken)
                this.loginStatus = true;
                const result = await client.get("/users/profile");
                if (!result) {
                    this.handleLogout();
                    return;
                }
                const {response,data} = result
                console.log(data)
                this.user = data.data.name;
                if (!response.ok) {
                    throw new Error("access token not access")
                }
                this.loginStatus = true;
                this.render();
            } catch (e) {
                throw new Error(e);
            }
        }
    },
    start: function() {
        this.render();
        this.addEvent();
        this.checkAuth();
    }
}

app.start()