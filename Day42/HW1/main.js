import {client} from "./client.js"
import {config} from "./config.js"
const {LIMIT_PAGE} = config
const root = document.querySelector("#root")
const app = {
    q: {
        _limit: LIMIT_PAGE,
        _page: 3,
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
    addBlog: function(title,content) {
        return `<div class="card-body" style="border: 1px solid green;">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${content}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>`
    },
    loginForm: function() {
        return `
        <button class="convert-sign-in btn btn-secondary">Đăng nhập</button>
        <button class="convert-sign-up btn btn-primary">Đăng kí</button>
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
        this.loginStatus = true;
        this.render();
        this.checkAuth()
    },
    register: async function({name,email,password},el) {
        console.log(name,email,password)
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
        console.log(data)
    },
    blogs: async function({content,title},el) {
        console.log(content,title)
        const {data,response} = await client.post("/blogs", {
            content,
            title
        });
        console.log(data)

    },
    getBlogs: async function() {
        const {data,response} = await client.get("/blogs");
        const addDiv = document.createElement("div") ;
        addDiv.classList.add("them")
        console.log(data)
        let html = "";
        (data.data).forEach((value,index) => {
            console.log(value)
            html += this.addBlog(value.title,value.content)
        })
        addDiv.innerHTML = html;
        root.append(addDiv)
    },
    updateBlog: function({content,title}) {
        const them = document.querySelector(".them")
        them.innerHTML =  this.addBlog(title,content) + this.innerHTML;
    },
    addEvent: function() {
        root.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = [...new FormData(e.target)];
            const data = Object.fromEntries(form);
            if (e.target.classList.contains("form-login")) {
                this.login(data,e.target);
            }
            else if (e.target.classList.contains("form-sign-up")) {
                this.register(data,e.target);
            }
            else if (e.target.classList.contains("form-add")) {
                console.log(e.target)
                this.blogs(data,e.target)
                this.updateBlog(data)
                console.log(data)
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
       <div class="mb-3"><label style="margin: 10px 300px;">content</label><br/>
       <input type="text" name="content" style="margin: 10px 300px;" class="input"></div></form>`
    },
    handleLogout: function() {
        localStorage.removeItem("login_token");
        this.loginStatus = false;
        this.render();
    },
    checkAuth: async function() {
        if (localStorage.getItem("login_token")) {
            try {
                root.innerHTML = `<div class="container py-3">
                <h2 class="text-center">Loading ... </h2></div>`
                const {refreshToken, accessToken} = JSON.parse(localStorage.getItem("login_token"));
                console.log(accessToken)
                console.log(2)
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
                this.user = data.data.name;
                console.log(response,data)
                console.log(data)
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