const container = document.querySelector(".container");
const btnVoice = container.querySelector(".btn-voice");
let check = 1;
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;

const recognition = new SpeechRecognition();

const speechRecognitionList = new SpeechGrammarList();
const grammar = "#JSGF V1.0;";
speechRecognitionList.addFromString(grammar, 1);

recognition.continuous = false;
recognition.grammars = speechRecognitionList;
recognition.lang = "vi-VN";
recognition.interimResults = false;
let infoVoice = document.createElement("div");
let request = document.createElement("div");
request.classList.add("box")
const brain = {
    ["google drive"]: "https://drive.google.com/drive/my-drive",
    ["google map"]: "https://www.google.com/maps/",
    ["bản đồ"]: "https://www.google.com/maps/",
    google: "https://www.google.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
}

const address = ["chỉ đường tới","chỉ đường","đường tới","tới","đường đến","đi đến"]
const music = ["bài hát","mở bài hát","nghe bài hát","bài","nhạc"]
const video = ["mở video","xem video","video"]
const actionToVoice = function (list,stringVoice,link) {
    var index = list.findIndex((value) => stringVoice.includes(value))
    if (index !== -1 && check === 1) {
        check = 0;
        var wordInList = list.at(index);
        var getString = stringVoice.slice(stringVoice.indexOf(wordInList) + wordInList.length + 1);
        setTimeout(() => {
            window.open(`${link}${getString.replaceAll(" ","+").replaceAll(".","")}`,"_blank")
        },1200)
    }
}

btnVoice.addEventListener("click", () => {
    check = 1;
    request.remove();
    infoVoice.remove()
    recognition.start();
    infoVoice = document.createElement("div");
    infoVoice.innerText = "Hãy nói nội dung bạn muốn !";
    Object.assign(infoVoice.style,{color: "orange",fontSize: "14px;"})
    container.appendChild(infoVoice)
    recognition.onresult = (e) => {
        let stringVoice = e.results[0][0].transcript;
        stringVoice = stringVoice.toLowerCase();
        infoVoice.innerText = "Đã nói xong. Hy vọng kết quả như ý bạn !";

        Object.assign(infoVoice.style,{color: "green",fontSize: "14px;"})
        var openName = Object.keys(brain).find((name) => stringVoice.includes(name));
        if (openName && check === 1) {
            check = 0;
            setTimeout(() => {
                window.open(brain[openName],"_blank")
            },1200)
        } 

        actionToVoice(address,stringVoice,"https://www.google.com/maps/search/")
        actionToVoice(music,stringVoice,"https://zingmp3.vn/tim-kiem/tat-ca?q=")
        actionToVoice(video,stringVoice,"https://www.youtube.com/results?search_query=")
        
        request = document.createElement("div");
        request.classList.add("box")
        container.append(request);
        request.innerText = `Đang thực hiện : ${stringVoice}`;
        setTimeout(() => {
            if (check === 1) {
                request.innerText = "Không thực hiện được yêu cầu"
            }
            else {
                request.innerText = "Đã thực hiện được yêu cầu"
            }
        },1000)
    }
});
