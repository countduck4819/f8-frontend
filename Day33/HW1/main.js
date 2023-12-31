var container = document.querySelector(".container");
var button = document.querySelector(".container button");
var countDown = document.createElement("div");
var textNode = document.createTextNode("30");
var currentDataTextNode = textNode.data;
var updateCount = 0;
var timeCount;
var startTime = 0;
var endTime;
var check = 0;
var visibilityState = "visible";
var animationFrame;
countDown.classList.add("countdown");
container.insertBefore(countDown, button);
countDown.append(textNode);
var vis = new Event("visible");
var hid = new Event("hidden");
var desCount = function () {
    endTime = performance.now();
        timeCount = endTime - startTime;
    timeCount = +Math.floor(timeCount / 1000);
    if (timeCount !== updateCount) {
        textNode.data = currentDataTextNode - timeCount;
    }
    animationFrame = requestAnimationFrame(desCount);
    if (+textNode.data === 0 || timeCount >= +currentDataTextNode) {
        button.dispatchEvent(vis);
        textNode.data = 0;
        cancelAnimationFrame(animationFrame);
    }
    updateCount = timeCount;
};
desCount();
button.addEventListener("visible", function () {
    this.addEventListener("click", function (e) {
        var urlEncode = unescape(
            "https%3A//www.youtube.com/watch%3Fv%3DZ-aoaJvegHE%26ab_channel%3DK%25E1%25BA%25BB%25C4%2590%25C3%25A1ngTh%25C6%25B0%25C6%25A1ng"
        );
        window.location.href = urlEncode;
    });

    this.classList.remove("hidden");
    this.classList.add("visible");
});

button.addEventListener("hidden", function (e) {
    this.classList.remove("visible");
    this.classList.add("hidden");
});

if (+textNode.innerText === 0) {
    button.dispatchEvent(vis);
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        currentDataTextNode = +textNode.data;
    }
    else {
        startTime = performance.now() - 500;
    }
});
