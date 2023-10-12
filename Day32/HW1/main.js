var btnFile = document.querySelector(".btn-file");
var ul = btnFile.nextElementSibling;
var inputContent = document.querySelector(".input-content");
var textNodeChar = document.createTextNode("0");
var textNodeWord = document.createTextNode("0");
var char = document.querySelector(".char")
var word = document.querySelector(".word")
var fileName = document.querySelector("#filename-input")
char.append(textNodeChar)
word.append(textNodeWord)
var countChar = function(textContent) {
    return textContent.trim().length;
}
var countWord = function(textContent) {
    return textContent.replaceAll("\n"," ").trim().split(" ").filter(function(word) {
        return word !== "" && word !== " ";
    }).length;
}
var handleCount = function(e) {
    var textContent = inputContent.innerText;
    var quantityChar = countChar(textContent);
    textNodeChar.data = quantityChar;
    var quantityWord = countWord(textContent);
    textNodeWord.data = quantityWord
}
btnFile.addEventListener("click",function(e) {
    e.stopPropagation()
    ul.classList.toggle("hidden");
})

document.addEventListener("click",function(e) {
    ul.classList.add("hidden");
})

ul.children[0].addEventListener("click",function(e){
    console.log(1)
})

inputContent.addEventListener("input",handleCount, false);


var news = document.querySelector(".list .news");
news.addEventListener("click",function(e) {
    inputContent.outerHTML = `<div class="input-content" contenteditable="true" spellcheck="false"></div>`
    inputContent = document.querySelector(".input-content")
    inputContent.addEventListener("input",handleCount,false)
    textNodeChar.data = 0;
    textNodeWord.data = 0;
})

var pdf = document.querySelector(".list .pdf");
pdf.addEventListener("click",function(e) {
    var opt = {
    margin:       1,
    filename:     `${fileName.value}.pdf`,
    image:        { type: 'webp', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

// New Promise-based usage:
    html2pdf().set(opt).from(inputContent).save();
})


var btnBold = document.querySelector(".btn-bold")
btnBold.addEventListener("click",function(e) {
    document.execCommand("bold")
})

var btnItalic = document.querySelector(".btn-italic")
btnItalic.addEventListener("click",function(e) {
    document.execCommand("italic")
})

var btnUnderline = document.querySelector(".btn-underline")
btnUnderline.addEventListener("click",function(e) {
    document.execCommand("underline")
})

var btnColor = document.querySelector(".color")
btnColor.addEventListener("blur",function(e) {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, `${this.value}`);
})

var txt = document.querySelector(".list .txt");
txt.addEventListener("click",function(e) {
    txt.children[0].download = `${fileName.value}.txt`;
    let blob = new Blob([`${inputContent.innerText}`], {type: 'text/plain'});
    txt.children[0].href = URL.createObjectURL(blob);
    txt.children[0].click();
})