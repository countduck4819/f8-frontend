var screenImg = document.querySelector(".img");
var img = document.querySelector(".img:not(.zoom-img) img");
var zoom = screenImg.querySelector(".zoom");
var zoomImage = document.querySelector(".zoom-img.img");

function Zoom(e) {
    e.preventDefault();
    e.stopPropagation()
    zoom.classList.add("ghost");
    zoomImage.classList.remove("hidden");
    var x = e.clientX;
    var y = e.clientY;
    var tranWidth;
    var tranHeight;
    var cx = zoomImage.offsetWidth / zoom.offsetWidth;
    var cy = zoomImage.offsetHeight / zoom.offsetHeight;
    // console.log(cx,cy)
    var clientWidth = zoom.clientWidth;
    var clientHeight = zoom.clientHeight;
    clientWidth /= 2;
    clientHeight /= 2;
    tranWidth = x - clientWidth - 3;
    tranHeight = y - clientHeight - 3
    if (x <= clientWidth || x >= img.clientWidth - clientWidth || y <= clientHeight || y >= img.clientHeight - clientHeight) {
        if (x >= img.clientWidth - clientWidth) {
            tranWidth = img.clientWidth - clientWidth * 2 + 1
        }
        else if (x <= clientWidth) {
            tranWidth = 0
        }
        if (y >= img.clientHeight - clientHeight) {
            tranHeight = img.clientHeight - clientHeight * 2 + 1
        }
        else if (y <= clientHeight){
            tranHeight = 0;
        }
    }
    zoom.style.translate = `${tranWidth}px ${tranHeight}px`
    var backgroundCss = {
        backgroundSize: `${img.width * cx}px ${img.height * cy}px`,
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${img.getAttribute("src")})`,
        backgroundPosition: `-${tranWidth * cx}px -${tranHeight * cy}px`
    }
    // console.log(backgroundCss)
    Object.assign(zoomImage.style,backgroundCss)
}

screenImg.addEventListener("mousemove", Zoom);

window.addEventListener("mouseover", function (e) {
    zoom.classList.remove("ghost");
    zoomImage.classList.add("hidden");
    img.removeEventListener("mousemove", Zoom);
});
