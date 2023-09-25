var carousel = document.querySelector(".carousel");
var carouselInner = document.querySelector(".carousel-inner");
var nextBtn = document.querySelector(".carousel-nav .next");
var prevBtn = document.querySelector(".carousel-nav .prev");
var checkBtns = document.querySelector(".carousel .check-button");
var string = "";
for (var i = 0; i < carouselInner.children.length; i++) {
    if (i === 0) {
        string += "<li><button class='orange'></button></li>";
    } else {
        string += "<li><button></button></li>";
    }
}
checkBtns.innerHTML = string;
var btn = checkBtns.querySelectorAll("button");
// lấy ra danh sách các items
var carouselItems = carouselInner.querySelectorAll(".item");
var itemWidth = carouselInner.clientWidth;
console.log(itemWidth);
var list = [];

var totalWidth = itemWidth * carouselItems.length;
carouselItems.forEach(function (value) {
    value.style.width = `${itemWidth}px`;
});
Array.from(carouselInner.children).forEach(function (value, index) {
    list.push(index * itemWidth * -1);
});
console.log(list);
var position = 0;
var clientX;
var pos;
var figure = {
    pos: this.position,
    clientXStart: 0,
    clientXEnd: 0,
};
function runcheck() {
    var result1 = list.findIndex(function (value) {
        return carouselInner.style.translate === value + "px";
    });
    console.log(result1, carouselInner.style.translate);
    Array.from(checkBtns.children).forEach(function (value) {
        value.children[0].classList.remove("orange");
    });
    checkBtns.children[result1].children[0].classList.add("orange");
}
nextBtn.addEventListener("click", function (e) {
    if (Math.abs(position) < itemWidth * (carouselItems.length - 1)) {
        position -= itemWidth;
        carouselInner.style.translate = `${position}px`;
        figure.pos = position;
        console.log(figure.pos);
        runcheck();
    } else {
        position = 0;
        carouselInner.style.translate = `${position}px`;
        runcheck();
    }
});

prevBtn.addEventListener("click", function (e) {
    if (position < 0) {
        position += itemWidth;
        carouselInner.style.translate = `${position}px`;
        figure.pos = position;
        clearInterval(setInter);

        setInter = setInterval(function () {
            nextBtn.click();
        }, 5000);
        runcheck();
    }
});
var handleMove = function (e) {
    figure.pos = figure.pos + (e.clientX - figure.clientXStart);
    if (
        figure.pos < 0 &&
        Math.abs(figure.pos) < itemWidth * (carouselItems.length - 1)
    ) {
        var result = list.findLastIndex(function (value, index) {
            return figure.pos < value;
        });
        if (e.clientX - figure.clientXStart <= 0) {
            if (Math.abs(figure.pos) >= itemWidth * result + itemWidth / 5) {
                carouselInner.onmouseup = function (e) {
                    figure.pos = list.at(result + 1);
                    console.log(figure.pos);
                    carouselInner.style.translate = `${figure.pos}px`;
                };
            } else {
                carouselInner.onmouseup = function (e) {
                    figure.pos = list.at(result);
                    console.log(12);
                    carouselInner.style.translate = `${figure.pos}px`;
                };
            }
        } else {
            console.log(result);
            if (Math.abs(figure.pos) >= itemWidth * result - itemWidth / 4) {
                carouselInner.onmouseup = function (e) {
                    figure.pos = list.at(result);
                    console.log(figure.pos);
                    carouselInner.style.translate = `${figure.pos}px`;
                };
            } else {
                carouselInner.onmouseup = function (e) {
                    figure.pos = list.at(result + 1);
                    console.log(12);
                    carouselInner.style.translate = `${figure.pos}px`;
                };
            }
        }

        carouselInner.style.translate = `${figure.pos}px`;
    } else {
        if (figure.pos >= 0) {
            figure.pos = 0;
            carouselInner.style.translate = `${figure.pos}px`;
        } else {
            figure.pos = -1 * (totalWidth - itemWidth);
            carouselInner.style.translate = `${figure.pos}px`;
        }
    }
    figure.clientXStart = e.clientX;
};

document.addEventListener("mouseup", function (e) {
    runcheck();
    position = figure.pos;
    document.removeEventListener("mousemove", handleMove);
});
carouselInner.addEventListener("mousedown", function (e) {
    e.preventDefault();
    figure.clientXStart = e.clientX;
    figure.pos = position;
    carouselInner.style.transition = "translate 0.3s linear";
    document.addEventListener("mousemove", handleMove);
});

btn.forEach(function (value, index) {
    value.addEventListener("click", function (e) {
        carouselInner.style.transition = "translate 1.5s linear";
        Array.from(checkBtns.children).forEach(function (value) {
            value.children[0].classList.remove("orange");
        });
        this.classList.add("orange");
        position = -1 * itemWidth * index;
        figure.pos = position;
        carouselInner.style.translate = `${position}px`;
    });
});

var setInter = setInterval(function () {
    nextBtn.click();
}, 5000);
