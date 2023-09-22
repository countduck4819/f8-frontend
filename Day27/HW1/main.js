var carousel = document.querySelector(".carousel");
var carouselInner = document.querySelector(".carousel-inner");
var nextBtn = document.querySelector(".carousel-nav .next");
var prevBtn = document.querySelector(".carousel-nav .prev");

// lấy ra danh sách các items 
var carouselItems = carouselInner.querySelectorAll(".item")
var itemWidth = carouselInner.clientWidth
console.log(itemWidth)

var totalWidth = itemWidth * carouselItems.length;
carouselItems.forEach(function(value) {
    value.style.width = `${itemWidth}px`;
})

var position = 0;
nextBtn.addEventListener("click",function(e) {
    if (Math.abs(position) < itemWidth * (carouselItems.length - 1)) {
        position -= itemWidth;
    carouselInner.style.translate = `${position}px`
    }
})


prevBtn.addEventListener("click",function(e) {
    if (position < 0) {
        position += itemWidth;
        carouselInner.style.translate = `${position}px`
    }
})

carouselInner.addEventListener("mousedown",function(e) {
    document.addEventListener("mousemove",function(e) {
        
    })
})

