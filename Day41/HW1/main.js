import {client} from "./client.js";
const root = document.querySelector(".root")

const app = {
    user: {},
    render: function() {
        root.innerHTML = this.isLogin() ? this.dashboard() : this.loginRegiterForm();
    },
    loginStatus: false,
    isLogin: function () {
        return this.loginStatus;
    },
    dashboard: function() {
        return `<div class="container py-3">
        <h1>Chào mừng bạn quay trở lại</h1>
        <ul class="list-unstyled d-flex gap-2 profile">
        <li>Chào bạn: <span>Loading...</span></li>
        <li><a href="#" class="logout">Đăng xuất</a></li>
        </ul>
    </div>`
    },
    loginRegiterForm: function() {
        return `<input hidden checked type="radio" name="click-log" id="click-login">
        <input hidden type="radio" name="click-log" id="click-logout">
        <div class="container">
            <span class="box"></span>
            <div class="login">
                <div class="info-login">
                    <h1 class="heading">Welcome Back .!</h1>
                    <span>Skip the lag ?</span>
                </div>
                <div class="form-login">
                    <div class="login-heading">
                        <h2>Login</h2>
                        <span>Glad you’re back.!</span>
                    </div>
                    <form action="" class="fm-login">
                        <div class="input-login">
                            <input
                                type="email"
                                class="email"
                                name="email"
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                class="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div class="remember">
                            <input type="checkbox" hidden id="remember" name="remember" />
                            <label  for="remember"><div  class="checkbox"></div></label>
                            <label class="lab" for="remember">Remember me</label>
                        </div>
                        <div class="action-btn">
                            <button class="btn btn-login">Login</button>
                            <span>Forgot password ?</span>
                        </div>
                    </form>
                    <div class="or"><span>or</span></div>
                    <div class="login-different">
                        <a href="#!">
                            <img src="./img/devicon_google.png" alt="" />
                        </a>
                        <a href="#!">
                            <img src="./img/logos_facebook.png" alt="" />
                        </a>
                        <a href="#!">
                            <img src="./img/bi_github.png" alt="" />
                        </a>
                    </div>
                    <div class="convert-sign-up">
                        <span>Don’t have an account ?</span>
                        <button class="btn-convert-sign-up"><label for="click-logout">Signup</label></button>
                        
                    </div>
                    <div class="foot">
                        <span>Terms & Conditions</span>
                        <span>Support</span>
                        <span>Customer Care</span>
                    </div>
                </div>
            </div>


            <div class="logout">
                <div class="info-logout">
                    <h1 class="heading">Roll the Carpet.!</h1>
                    <span>Skip the lag ?</span>
                </div>
                <div class="form-logout">
                    <div class="logout-heading">
                        <h2>Signup</h2>
                        <span>Just some details to get you in.!</span>
                    </div>
                    <form action="" class="fm-logout">
                        <div class="input-logout">
                            <input
                                    type="email"
                                    class="email"
                                    name="email"
                                    placeholder="Email"
                                    />
                            <input
                                type="text"
                                class="name"
                                name="name"
                                placeholder="Username"
                                />
                            <input
                                type="password"
                                class="password"
                                name="password"
                                placeholder="Password"
                                />

                        <div class="action-btn">
                            <button class="btn btn-logout">Signup</button>
                        </div>
                    </form>
                    <div class="or"><span>or</span></div>
                    <div class="logout-different">
                        <a href="#!">
                            <img src="./img/devicon_google.png" alt="" />
                        </a>
                        <a href="#!">
                            <img src="./img/logos_facebook.png" alt="" />
                        </a>
                        <a href="#!">
                            <img src="./img/bi_github.png" alt="" />
                        </a>
                    </div>
                    <div class="convert-sign-up">
                        <span>Already Registered ?</span>
                    </label for="click-login"><button class="btn-convert-sign-up"><label for="click-login">Login</label></button>
                    </div>
                    <div class="foot">
                        <span>Terms & Conditions</span>
                        <span>Support</span>
                        <span>Customer Care</span>
                    </div>
                </div>
            </div>
        </div>`
    },
    addEvent: function () {
        root.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = [...new FormData(e.target)]
            const data = Object.fromEntries(form);
            console.log(data)
            if (e.target.classList.contains("fm-login")) {
                this.login(data,e.target)
            } 
            if (e.target.classList.contains("fm-logout")) {
                this.register(data,e.target);
            }
        })
    },
    login: async function ({email,password} ,el) {
        const toast = document.createElement("div");
        this.loading(el)
        const {response,data: tokens} = await client.post("/auth/login",{
            email,
            password
        });
        this.loading(el,false);
        if (!response.ok) {
            toast.classList.add("div-toast")
            toast.innerHTML = `<div class="toast show align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body">
              Email hoặc mật khẩu không chính xác
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>`
          setTimeout(function() {
            toast.remove();
            toast.innerHTML = "";
          },3000)
          toast.querySelector(".btn-close").addEventListener("click", function() {
            toast.remove();
            toast.innerHTML = "";
          })
        } else {
            toast.classList.add("div-toast")
            toast.innerHTML = `<div class="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
            <div class="toast-body">
            Đăng nhập thành công
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            </div>`
            setTimeout(function() {
                toast.remove();
                toast.innerHTML = "";
              },3000)
            toast.querySelector(".btn-close").addEventListener("click", function() {
                toast.remove();
                toast.innerHTML = "";
            })
        }
        document.body.appendChild(toast)
        console.log(tokens.data)
        localStorage.setItem("accessToken", JSON.stringify(tokens.data));
        this.loginStatus = true;
        this.checkAuth();
    },
    register: async function({email,password,name},el) {

    },
    checkAuth: async function () {
        if (localStorage.getItem("accessToken")) {
            try {
                const {accessToken,refreshToken} = JSON.parse(localStorage.getItem("accessToken"));
                if (!accessToken) {
                    throw new Error("access token not exits");
                }
                client.setToken(accessToken);
                this.loginStatus = true;
                console.log(1)
                const {response,data } = await client.get("/users/profile");
                console.log(1)
                if (!response.ok) {
                    this.loginStatus = false;
                    return;
                }
                this.user = data
                this.loginStatus = true;
                this.render()
            } catch(e) {
                throw new Error(e)
            }  
        }
    },
    loading: function (el,status = true) {
        const btn = el.querySelector(".btn");
        btn.innerHTML = status ? `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...` : '';
        btn.disabled = status;
    },
    start: function() {
        this.render();
        this.addEvent();
        this.checkAuth();
    }
}

app.start()
