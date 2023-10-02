var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span")
var initialClientX;
var percent = 0;
var currentPercent = 0;
var moveWidth;
var percent2 = 0;
var a = false;
var mousemove = 0;
var indexWord = -1;
var pseudoIndex = -1;
var lyricsCreate = {};
lyricsCreate.data = [];
lyric.data.sentences.forEach(function(value,index) {
    if (indexWord < index) {
        var connect = {};
        connect.sentences = []
        connect.sentences.push(value.words);
        console.log(lyric.data.sentences[index + 1])
        if (value.words.at(-1).endTime + 500 >= lyric.data.sentences[index + 1]?.words.at?.(0)?.startTime) {
            connect.sentences.push(lyric.data.sentences[index + 1].words);
            console.log(1)
        }
        lyricsCreate.data.push(connect);
        indexWord = index + 1;
    }
})
console.log(lyricsCreate)
var handleDrag = function (e) {
    mousemove = 1;
    moveWidth = e.clientX - initialClientX;
    percent = (moveWidth * 100) / progressBar.clientWidth;
    percent2 = (moveWidth * 100) / progressBar.clientWidth;
    percent = +percent.toFixed(2) + +currentPercent;
    percent2 = +percent2.toFixed(2) + +currentPercent;
    audio.removeEventListener("timeupdate",listenTimeUpdate)
    if (percent < 0 || percent2 < 0) {
        percent = 0;
        percent2 = 0
    }
    else if (percent > 100 || percent2 > 100) {
        percent = 100;
        percent2 = 100;
    }
    var time = convertPercentToSeconds(percent2);
    currentTimeEl.innerText = getTime(time);
    progress.style.width = `${percent2}%`
    
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
    percent2 = percent;
    console.log(currentPercent)
    document.addEventListener("mousemove",handleDrag)
})

progressSpan.addEventListener("mousedown",function(e){
    e.stopPropagation();
    initialClientX = e.clientX;
    document.addEventListener("mousemove",handleDrag)
})

document.addEventListener("mouseup",function(e){
    console.log(e)
    currentPercent = percent2;
    if (mousemove === 1) {
        audio.currentTime = convertPercentToSeconds(percent2);
        mousemove = 0;
    }
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
        if (a === true) {
            console.log(2)
            audio.pause();
            percent = 0;
        }
        else {
            console.log("fjkajkf")
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
    // currentTimeEl.innerText = getTime(currentTime);  
    // chuyển currentTime thành phần trăm
    percent = (currentTime * 100) / audio.duration
    if (a === false) {
        a = currentTime + 1 > audio.duration && audio.paused === false
    }
    if (currentTime === audio.duration) {
        if (a === true) {
            console.log(2)
            audio.pause();
            percent = 0;
        }
        else {
            progress.style.width = `${percent}%`;
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



var openKaraoke = document.querySelector(".open-karaoke");
openKaraoke.addEventListener("click",function(e){
    var karaoke = document.querySelector(".karaoke");
    karaoke.classList.add("show");
    var close = karaoke.querySelector(".close");
    close.addEventListener("click",function(){
        karaoke.classList.remove("show")
    })
    karaoke.addEventListener("mouseup",function(e){
        e.stopPropagation();
    })
    karaoke.addEventListener("mousedown",function(e){
        e.stopPropagation();
    })
})

audio.addEventListener("timeupdate",function(e) {
    var currentTime = audio.currentTime * 1000;
    console.log(currentTime);
    var result = [];
    var data = lyricsCreate.data;
    var karaokeInner = document.querySelector(".karaoke-inner");
    var stringHTML = "";
    var index = data.findIndex(function(value){
        if (value.sentences.length <= 1 && value.sentences.at(0).at(0).startTime <= currentTime && currentTime <= value.sentences.at(0).at(-1).endTime) {
            return true;
        }
        else {
            if (value.sentences.at(0).at(0).startTime <= currentTime && currentTime <= value?.sentences?.at?.(1)?.at?.(-1)?.endTime) {
                return true;
            }
        }
    })
    if (index !== -1) {
        pseudoIndex = index;
    }
    
    // result.push(sentences[index]);
    // if (sentences[index].words.at(-1).endTime === sentences[++index].words.at(0).startTime) {
    //             result.push(sentences[index]);
    //         }
    //         console.log(result)
    // console.log(index)
    // if (index > indexWord) {
    //         result.push(sentences[index]);
    //         if (sentences[index].words.at(-1).endTime === sentences[++index].words.at(0).startTime) {
    //             result.push(sentences[index]);
    //         }
    //         console.log(result)

    //         var listHTML = [];
    //         result.forEach(function(value) {
    //             var listWord = value.words.reduce?.(function(prev,_value){
    //                 prev.push(_value.data);
    //                 return prev;
    //             },[])
    //             listHTML = listHTML.concat(listWord,"<br/>")
    //         })
    //         var stringHTML = "<span>"+listHTML.join("</span> <span>") + "</span>"
    //         karaokeInner.innerHTML = stringHTML
    //     indexWord = index;
    // }
    if (index === -1)  {
        console.log(pseudoIndex)
        if (data[pseudoIndex]?.sentences.at?.(-1).at?.(-1)?.endTime + 800 >=  data[pseudoIndex + 1]?.sentences.at?.(0).at?.(0)?.startTime) {
            karaokeInner.innerHTML = ""
        }else {
            karaokeInner.innerHTML = "Gió (Single) <br/> JanK"
            karaokeInner.style.textAlign = "center"
            karaokeInner.style.fontSize = "40px";
        }
    }
    else {
        data[index].sentences.forEach(function(value){
            stringHTML += "<div>"
            value.forEach(function(_value){
                stringHTML += "<span> " +_value.data + "</span> "
            })
            stringHTML += "</div> <br/>"
        })

        karaokeInner.innerHTML = stringHTML
        karaokeInner.style.textAlign = "center"
    }
})

openKaraoke.addEventListener("mouseup",function(e){
    e.stopPropagation();
})
openKaraoke.addEventListener("mousedown",function(e){
    e.stopPropagation();
})