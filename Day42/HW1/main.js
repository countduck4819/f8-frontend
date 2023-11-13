

/*
Request 1 -> Khi access hết hạn -> Gửi request lấy access mới (Refresh) -> Lưu vào localStorage -> gọi lại Request 1
*/

import {client} from "./clients.js";
import {config} from "./config.js"

client.setUrl(config.SERVER_AUTH_API)


// login("john@mail.com","changeme")

const root = document.querySelector("#root");

const app = {
    have: true,
    user: {},
    loginStatus: false,
    render: function() {
        root.innerHTML = this.isLogin() ? this.dashboard() : this.loginForm();
    },
    isLogin: function () {
        return this.loginStatus;
    },
    dashboard: function () {
        return `<div class="container py-3">
            <h1>Chào mừng bạn quay trở lại</h1>
            <ul class="list-unstyled d-flex gap-2 profile">
            <li>Chào bạn: <span>Loading...</span></li>
            <li><a href="#" class="logout">Đăng xuất</a></li>
            </ul>
        </div>`
    },
    loginForm: function () {
        return `<div class="container py-3">
                   <div class="row justify-content-center">
                     <div class="col-7">
                       <h2 class="text-center">Đăng nhập</h2>
                       <form class="signin-form" action="">
                         <div class="mb-3">
                           <label for="">Email</label>
                           <input
                             type="email"
                             name="email"
                             class="form-control"
                             placeholder="Email..."
                           />
                         </div>
                         <div class="mb-3">
                           <label for="">Password</label>
                           <input
                             type="password"
                             name="password"
                             class="form-control"
                             placeholder="Password..."
                           />
                         </div>
                         <div class="d-grid">
                           <button class="btn btn-primary">Đăng nhập</button>
                           </div>
                           <div class="msg text-danger text-center"></div>
                           </form>
                           </div>
                           </div>
                           <button class="btn-sign-up btn-primary">Đăng kí</button>
                 </div>`;
    },
    addEvent: function () {
      root.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = [...new FormData(e.target)];
        const data = Object.fromEntries(form);
        console.log(data)
        if (e.target.classList.contains("signup-form")) {
          // this.register(data,e.target)
        } else if (e.target.classList.contains("signin-form")){
          // this.login(data,e.target)
        }
      });
      root.addEventListener("click", (e) => {
        if (e.target.classList.contains("logout")) {
          e.preventDefault();
          this.handleLogout();
        }
      });
      if (this.have) {
        const btn = document.querySelector(".btn-sign-up");
      btn.addEventListener("click" , (e) => {
          this.signUp();
          const btnLogin = document.querySelector(".btn-login");
      console.log(btnLogin)
      btnLogin.addEventListener("click" , (e) => {
          this.start();
      })
      })
      }
      
    },
    signUp: function() {
      root.innerHTML = `<div class="container py-3">
      <div class="row justify-content-center">
        <div class="col-7">
          <h2 class="text-center">Đăng kí</h2>
          <form class="signup-form" action="">
          <div class="mb-3">
              <label for="">Username</label>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="Name..."
              />
            </div>
            <div class="mb-3">
              <label for="">Email</label>
              <input
                type="email"
                name="email"
                class="form-control"
                placeholder="Email..."
              />
            </div>
            <div class="mb-3">
              <label for="">Password</label>
              <input
                type="password"
                name="password"
                class="form-control"
                placeholder="Password..."
              />
            </div>
            <div class="d-grid">
              <button class="btn btn-primary">Đăng kí</button>
              </div>
              <div class="msg text-danger text-center"></div>
              </form>
              </div>
              </div>
              <button class="btn-login btn-primary">Đăng nhập</button>
    </div>`;
    },
    getData: async function() {
      const token = localStorage.getItem("login_token")
      const {data} = await client.get("/users",{
        token
      })
      return data;
    },
    register: async function ({email,password,name},el) {
      console.log(1)
      const avatar = "https://picsum.photos/800";
      console.log(email,password,name)
      const {response, data: tokens} = await client.post("/users/",{
        email,
        password,
        name,
        avatar
      })
      console.log(response.ok)
      if (response.ok) {
        const {response,data: tokens} = await client.post("/auth/login",{
          email,
          password,
        });
        localStorage.setItem("login_token",JSON.stringify(tokens));
        this.loginStatus = true;
        this.have = false;
        this.start()
        console.log("heeloo 2 sau")
      }
      // console.log(data,response)
    },
    handleLogout: async function ()  {
      localStorage.removeItem("login_token")
      this.loginStatus = false;
      console.log(await this.getData());
      this.have = true;
      this.start()
    },
    login: async function ({email, password}, el) {
        this.loading(el)
        const {data: tokens, response} = await client.post("/auth/login", {
            email,
            password
        });
        console.log(tokens)
        this.loading(el,false)
        if (!response.ok) {
            this.showMessage(el, "Email hoặc mật khẩu không chính xác")
            return;
        }
        // Lưu token vào storage: cookie,localStorage,sessionStorage
        localStorage.setItem("login_token", JSON.stringify(tokens));
        this.loginStatus = true;
        this.checkAuth();
        },
    loading: function(el, status = true) {
        const btn = el.querySelector(".btn");
        btn.innerHTML = status ? `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading` : `Đăng nhập`
        btn.disabled = status;
    },
    showMessage: function(el, msg) {
        el.querySelector(".text-danger").innerText = ""
        el.querySelector(".text-danger").innerText = msg
    },
    checkAuth: async function () {
        if (localStorage.getItem("login_token")) {
            try {
                root.innerHTML = `<div class="container py-3">
                <h2 class="text-center">Cho ti</h2></div>`
                const {access_token: accessToken} = JSON.parse(localStorage.getItem("login_token"))
                if (!accessToken) {
                    throw new Error("access token not exits");
                }
                this.loginStatus = true;
                client.setToken(accessToken);
                const result = await client.get(`/auth/profile`)
                if (!result) {
                  this.handleLogout;
                  return;
                }
                const {data: user,response} = result
                this.user = user
                this.loginStatus = true;
                this.render()
                this.showProfile()
            } catch (e) {
                this.loginStatus = false
            }
        }
    },
    showProfile: function() {
        const profile = root.querySelector(".profile span")
        profile.innerText = this.user.name
    },
    start: function() {
        this.render();
        this.addEvent();
        this.checkAuth();
    }
}

app.start()































// import { client } from "./clients.js";
// import { config } from "./config.js";

// client.setUrl(config.SERVER_AUTH_API);

// const root = document.querySelector("#root");
// const app = {
//   user: {},
//   loginStatus: false,
//   render: function () {
//     //Kiểm tra trạng thái để hiển thị UI tương ứng
//     root.innerHTML = this.isLogin() ? this.dashboard() : this.loginForm();
//   },
//   isLogin: function () {
//     return this.loginStatus;
//   },
//   dashboard: function () {
//     return `<div class="container py-3">
//       <h1>Chào mừng bạn quay trở lại</h1>
//       <ul class="list-unstyled d-flex gap-2 profile">
//         <li>Chào bạn: <span>Loading...</span></li>
//         <li><a href="#" class="logout">Đăng xuất</a></li>
//       </ul>
//     </div>`;
//   },
//   loginForm: function () {
//     return `<div class="container py-3">
//     <div class="row justify-content-center">
//       <div class="col-7">
//         <h2 class="text-center">Đăng nhập</h2>
//         <form class="signin-form" action="">
//           <div class="mb-3">
//             <label for="">Email</label>
//             <input
//               type="email"
//               name="email"
//               class="form-control"
//               placeholder="Email..."
//             />
//           </div>
//           <div class="mb-3">
//             <label for="">Password</label>
//             <input
//               type="password"
//               name="password"
//               class="form-control"
//               placeholder="Password..."
//             />
//           </div>
//           <div class="d-grid">
//             <button class="btn btn-primary">Đăng nhập</button>
//             </div>
//             <div class="msg text-danger text-center"></div>
//             </form>
//             </div>
//             </div>
//             <button class="btn-sign-up btn-primary">Đăng kí</button>
//   </div>`;
//   },
//   signUp: function() {
//     root.innerHTML = `<div class="container py-3">
//     <div class="row justify-content-center">
//       <div class="col-7">
//         <h2 class="text-center">Đăng kí</h2>
//         <form  class="signup-form" action="">
//         <div class="mb-3">
//             <label for="">Username</label>
//             <input
//               type="text"
//               name="name"
//               class="form-control"
//               placeholder="Name..."
//             />
//           </div>
//           <div class="mb-3">
//             <label for="">Email</label>
//             <input
//               type="email"
//               name="email"
//               class="form-control"
//               placeholder="Email..."
//             />
//           </div>
//           <div class="mb-3">
//             <label for="">Password</label>
//             <input
//               type="password"
//               name="password"
//               class="form-control"
//               placeholder="Password..."
//             />
//           </div>
//           <div class="d-grid">
//             <button class="btn btn-primary">Đăng kí</button>
//             </div>
//             <div class="msg text-danger text-center"></div>
//             </form>
//             </div>
//             </div>
//             <button class="btn-login btn-primary">Đăng nhập</button>
//   </div>`;
//   }
//   login: async function ({ email, password }, el) {
//     this.loading(el);
//     const { data: tokens, response } = await client.post("/auth/login", {
//       email,
//       password,
//     });
//     this.loading(el, false);
//     if (!response.ok) {
//       this.showMessage(el, "Email hoặc mật khẩu không chính xác");
//       return;
//     }
//     //Lưu token vào storage: cookie, localStorage, sessionStorage
//     localStorage.setItem("login_token", JSON.stringify(tokens));
//     this.loginStatus = true;
//     this.checkAuth();
//   },
//   showMessage: function (el, msg) {
//     el.querySelector(".msg").innerText = "";
//     el.querySelector(".msg").innerText = msg;
//   },
//   loading: function (el, status = true) {
//     const btn = el.querySelector(".btn");
//     btn.innerHTML = status
//       ? ` <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading`
//       : `Đăng nhập`;
//     btn.disabled = status;
//   },
//   checkAuth: async function () {
//     //Kiểm tra có token trong localStorage không?
//     //Nếu không -> Trả về trạng thái false cho loginStatus
//     //Nếu có -> Kiểm tra token có hợp lệ hay không?
//     //  - Nếu hợp lệ: -> Trả về thông tin user và trạng thái cho loginStatus
//     //  - Nếu không hợp lệ -> Trả về trạng thái false cho loginStatus
//     if (localStorage.getItem("login_token")) {
//       try {
//         const { access_token: accessToken } = JSON.parse(
//           localStorage.getItem("login_token"),
//         );
//         if (!accessToken) {
//           throw new Error("Access Token Not Exists");
//         }
//         root.innerHTML = `<div class="container py-3">
//         <h2 class="text-center">Chờ tý...</h2>
//         </div>`;
//         client.setToken(accessToken);
//         const { data: user, response } = await client.get("/auth/profile");
//         if (!response.ok) {
//           // this.loginStatus = false;
//           // this.handleLogout();
//           return;
//         }
//         // console.log(user);
//         this.loginStatus = true;
//         this.user = user;
//         this.render();
//         this.showProfile();
//       } catch (e) {
//         this.loginStatus = false;
//       }
//     }
//   },
//   showProfile: function () {
//     const profile = root.querySelector(".profile span");
//     profile.innerText = this.user.name;
//   },
//   start: function () {
//     this.render();
//     this.addEvent();
//     this.checkAuth();
//   },
// };

// app.start();