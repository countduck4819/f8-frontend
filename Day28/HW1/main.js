var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span")
var initialClientX;
var percent = 0;
var currentPercent = 0;
var moveWidth;
var a = false;
var handleDrag = function (e) {
    moveWidth = e.clientX - initialClientX;
    percent = (moveWidth * 100) / progressBar.clientWidth;
    console.log(percent)
    percent = +percent.toFixed(2) + +currentPercent;
    audio.removeEventListener("timeupdate",listenTimeUpdate)
    if (percent < 0) {
        percent = 0;
    }
    else if (percent > 100) {
        percent = 100;
    }
    progress.style.width = `${percent}%`
    
}
var convertPercentToSeconds = function(percent) {
    return percent * audio.duration / 100;
}
progressBar.addEventListener("mousedown",function(e) {
    e.preventDefault();
    // lấy offsetX của progress-bar
    var offsetX = e.offsetX;
    // tính giá trị phần trăm giữa offsetX và chiều rộng của progress-bar
    percent = (offsetX * 100) / progressBar.clientWidth;
    // làm tròn 2 chữ số phần thập phân
    percent = percent.toFixed(2);
    progress.style.width = `${percent}%`;
    audio.currentTime = convertPercentToSeconds(percent);
    initialClientX = e.clientX;
    currentPercent = percent;
    document.addEventListener("mousemove",handleDrag)
})

progressSpan.addEventListener("mousedown",function(e){
    e.stopPropagation();
    initialClientX = e.clientX;
    document.addEventListener("mousemove",handleDrag)
})

document.addEventListener("mouseup",function(e){
    currentPercent = percent;
    console.log(currentPercent);
    percent = (moveWidth * 100) / progressBar.clientWidth + +currentPercent;
    moveWidth = 0;
    audio.currentTime = convertPercentToSeconds(percent);
    audio.addEventListener("timeupdate",listenTimeUpdate)
    document.removeEventListener("mousemove",handleDrag)
})


// xây dựng trình phát nhạc
var audio = document.querySelector(".audio")
var playBtn = document.querySelector(".player .play-btn");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;

var getTime = function(seconds) {
    var mins = Math.floor(seconds / 60);
    // tính số giây còn lại sau khi đã trừ cho số phút -> làm tròn xuống(vì sẽ bị lẻ số giây)
    seconds = Math.floor(seconds - mins * 60);
    return `${mins < 10? `0` + mins:mins}:${seconds < 10 ? '0' + seconds:seconds}`
}

// lấy thời lượng của audio
audio.addEventListener("loadeddata",function(e){
    console.log(1)
    console.log(getTime(audio.duration))
    console.log(audio.duration)
    durationEl.innerText = getTime(audio.duration);
})

// phát nhạc và dừng nhạc khi bấm nút play
playBtn.addEventListener("click",function(e){
    if (audio.paused) {
        audio.play();
    }
    else {
        audio.pause();
    }
})
playBtn.addEventListener("mouseup",function(e){
    e.stopPropagation();
})

// lắng nghe event play 
audio.addEventListener("play",function(e){
    playBtn.children[0].classList.remove("fa-play");
    playBtn.children[0].classList.add("fa-pause");
})

audio.addEventListener("pause",function(e){
    playBtn.children[0].classList.remove("fa-pause");
    playBtn.children[0].classList.add("fa-play");
})


// lắng nghe sự kiện timeupdate
var listenTimeUpdate = function(e){ 
    var currentTime = audio.currentTime;
    currentTimeEl.innerText = getTime(currentTime);
    // chuyển currentTime thành phần trăm
    percent = (currentTime * 100) / audio.duration
    if (a === false) {
        a = currentTime + 1 > audio.duration && audio.paused === false
    }
    if (currentTime === audio.duration) {
        console.log(currentTime)
        if (a === true) {
            console.log(2)
            audio.pause();
            percent = 0;
        }
        else {
            progress.style.width = `${percent}%`
            percent = 0;
            audio.play()
        }
    }
    progress.style.width = `${percent}%`
}
audio.addEventListener("timeupdate", listenTimeUpdate)

audio.ontimeupdate = function(e){ 
    var currentTime = audio.currentTime;
    currentTimeEl.innerText = getTime(currentTime);
    // chuyển currentTime thành phần trăm
    percent = (currentTime * 100) / audio.duration
    if (a === false) {
        a = currentTime + 1 > audio.duration && audio.paused === false
    }
    if (currentTime === audio.duration) {
        console.log(currentTime)
        if (a === true) {
            console.log(2)
            audio.pause();
            percent = 0;
        }
        else {
            progress.style.width = `${percent}%`
            percent = 0;
            audio.play()
        }
    }
}

progressBar.addEventListener("mousemove",function(e){
    var percent = (e.offsetX * 100) / progressBar.clientWidth;
    percent = +percent.toFixed(4);
    var time = audio.duration / 100 * percent
    time = getTime(time);
    var infoTime = progressBar.children[0];
    infoTime.innerText = time;
    infoTime.style.visibility = "visible";
    infoTime.style.left = `${e.offsetX}px`;
})

progressBar.addEventListener("mouseout",function(e){
    var infoTime = progressBar.children[0];
    infoTime.style.visibility = "hidden";
})

progressSpan.addEventListener("mousemove",function(e){
    e.stopPropagation();
})

currentTimeEl.addEventListener("mouseup",function(e){
    e.preventDefault();
    e.stopPropagation();
})

durationEl.addEventListener("mouseup",function(e){
    e.preventDefault();
    e.stopPropagation();
})

// document.addEventListener("click",function(e){
//     e.preventDefault();
//     if (audio.paused === false) {
//         audio.play()
//     }
// })
// document.addEventListener("mousedown",function(e){
//     e.preventDefault();
//     if (audio.paused === false) {
//         console.log("pause")
//         audio.play()
//     }
// })

