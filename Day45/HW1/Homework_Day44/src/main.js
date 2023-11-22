import { App } from "./App";
import { navi } from "./Utils/router";
import { Error } from "./Error";
const {root, DefaultLayout} = App();

const render = (DefaultLayout,hash,route = "") => {
  // const 
  let stringHtml = DefaultLayout;
  const rootId = document.querySelector("#root");
  console.log(hash)
  if (stringHtml) {
    const pattern = /{body}/;
    rootId.innerHTML = stringHtml.replace(pattern,hash(route))
  }
  else {
    rootId.innerHTML = hash(route)
  }
}


root.forEach(({path,component},_) => {
    navi.on(path,(route) => {
      return render(DefaultLayout,component,route)
    })
})
navi.resolve()

navi.notFound(() => {
  render("",Error);
  // const rootId = document.querySelector("#root");
  // console.log(1)
  // rootId.innerHTML = Error();
  // throw new Error();
}).resolve()


document.addEventListener("click",(e) => {
  e.preventDefault()
  if (e.target.classList.contains("back")) {
    console.log(1)
    navi.navigate("san-pham");
  }
})


// function navigate(path) {
//     navi.navigate(path);
// }