var button = document.querySelector(".add-btn");
var input = document.querySelector(".input-todo");
var content = document.querySelector(".content");
var removeButton = document.querySelectorAll(".select .delete-tag");
var tagDone = document.querySelectorAll(".tag-done");
var fixedTagButton = document.querySelectorAll(".fix-tag");
var fixedInput = document.querySelectorAll(".fixed-input");
var fixedButton = document.querySelectorAll(".fixed-button");
var revertAddTask = document.querySelectorAll(".reverse-add-tag")
var nameTag = document.querySelectorAll(".check-done")
console.log(nameTag)
var js = {
    button: this.button,
    input: this.input,
    tagDone: this.tagDone,
    content: this.content,
    removeButton: this.removeButton,
    fixedTagButton: this.fixedTagButton,
    fixedButton: this.fixedButton,
    fixedInput: this.fixedInput,
    revertAddTask: this.revertAddTask,
    nameTag: this.nameTag,
};
var action = function () {
    addListFunction();
    removeListFunction();
    fixedListFunction();
    clickNameTag();
}
function clickNameTag() {
    js.nameTag = document.querySelectorAll(".check-done")
    js.nameTag.forEach(function(value,index) {
        value.addEventListener("click",function(e) {
            if (js.nameTag[index].innerText && js.nameTag[index].style.textDecoration === "") {
                js.nameTag[index].style.textDecoration = "line-through";
                js.nameTag[index].style.color = "#ccc"
            }
            else if (js.nameTag[index].style.textDecoration === "line-through") {
                js.nameTag[index].style.textDecoration = "";
                js.nameTag[index].style.color = "#fff";
            }
        })
    })
}
var addListFunction = function () {
    var a = [];
    js.input = document.querySelector(".input-todo");
    var subContent = document.querySelectorAll(".content > *");
    console.log("=====================")
    subContent.forEach(function (value) {
        a.push(value.outerHTML);
    });
    if (js.input.value) {
        content.innerHTML =
            a.join("") +
            `<div class="tag-done"> <div class="check-done">${js.input.value}</div> <div class="select"> <div class="fix-tag"><i class="fa-solid fa-pen-to-square"></i></div> <div class="delete-tag"><i class="fa-sharp fa-solid fa-trash"></i></div> </div> </div>`;
    
    }
    // Reset toàn bộ biến khi đã tạo thêm Task
    js.removeButton = document.querySelectorAll(".select .delete-tag");
    js.fixedTagButton = document.querySelectorAll(".fix-tag");
    js.fixedInput = document.querySelectorAll(".fixed-input");
    js.fixedButton = document.querySelectorAll(".fixed-button");
    js.tagDone = document.querySelectorAll(".tag-done");
    js.button = document.querySelector(".add-btn");
    js.button.addEventListener("click",action)
}

var removeListFunction = function() {
    js.removeButton.forEach(function(value,index) {
        value.addEventListener("click",function() {
            js.tagDone[index].remove();
        })
    })
}
var fixedListFunction = function() {
    js.removeButton = document.querySelectorAll(".select .delete-tag");
    js.fixedTagButton = document.querySelectorAll(".fix-tag");
    js.fixedTagButton.forEach(function(value,index) {
        value.addEventListener("click",function() {
            js.tagDone[index].outerHTML = `<div class="reverse-add-tag addtag">
            <input type="text" class="fixed-input input-todo" placeholder="What is the task today?">
            <button type="button" class="fixed-button btn add-btn">Add Task</button>
        </div>`
            js.fixedButton = document.querySelectorAll(".fixed-button");
            js.fixedInput = document.querySelectorAll(".fixed-input");
            js.revertAddTask = document.querySelectorAll(".reverse-add-tag");
            js.fixedButton.forEach(function(value,index) {
                value.addEventListener("click",function(e) {
                    if (js.fixedInput[index].value) {
                        js.revertAddTask[index].outerHTML = `<div class="tag-done"> <div class="check-done">${js.fixedInput[index].value}</div> <div class="select"> <div class="fix-tag"><i class="fa-solid fa-pen-to-square"></i></div> <div class="delete-tag"><i class="fa-sharp fa-solid fa-trash"></i></div> </div> </div>`;
                        js.tagDone = document.querySelectorAll(".tag-done");
                        fixedListFunction();
                        removeListFunction();
                        clickNameTag();
                    }
                })
            })
        })
    })
}


js.button.addEventListener("click", action);

action();
// removeButton.forEach(function(value,index) {
//     value.addEventListener("click",function() {
//         tagDone[index].remove();
//     })
// })

// function (e) {
//     var a = [];
//     var subContent = document.querySelectorAll(".content > *");
//     console.log("=====================")
//     subContent.forEach(function (value) {
//         a.push(value.outerHTML);
//     });
//     if (input.value) {
//         content.innerHTML =
//             a.join("") +
//             `<div class="tag-done"> <div class="check-done">${input.value}</div> <div class="select"> <div class="fix-tag"><i class="fa-solid fa-pen-to-square"></i></div> <div class="delete-tag"><i class="fa-sharp fa-solid fa-trash"></i></div> </div> </div>`;
//         // console.log(a.join("") +
//         //     `<div class="tag-done"> <div class="check-done">${input.value}</div> <div class="select"> <div class="fix-tag"><i class="fa-solid fa-pen-to-square"></i></div> <div class="delete-tag"><i class="fa-sharp fa-solid fa-trash"></i></div> </div> </div>`)
//         // console.log(content.innerHTML)
//     }
//     else {
//         console.log("123")
//     }
// }
