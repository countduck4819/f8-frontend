var list = document.querySelector(".list");
var module = 1;
var ex = 1;
var resetIndex = function() {
    module = 1;
    ex = 1;
    Array.from(list.children).forEach(function(item) {
        if (item.classList.contains("active")) {
            item.childNodes[0].data = `Module: ${module}: `
            module++;
        }
        else {
            item.childNodes[0].data = `Bài: ${ex}: `
            ex++;
        }
    })
}
data.forEach(function(object) {
    var textModuleNode = document.createTextNode(`Module: ${module}: `)
    var divModule = document.createElement("div");
    divModule.draggable  = "true";
    divModule.innerText = object.title;
    divModule.className = "active";
    divModule.classList.add("list-item");
    divModule.prepend(textModuleNode)
    module++;

    list.append(divModule);

    object.content.forEach(function(contentEx) {
        var textExNode = document.createTextNode(`Bài: ${ex}: `)
        var divEx = document.createElement("div");
        divEx.classList.add("list-item");
        divEx.innerText = contentEx;
        divEx.draggable = "true";
        divEx.prepend(textExNode)
        ex++;

        list.append(divEx);
    })
})

var listItems = list.querySelectorAll(".list-item");

var handleDragStart;
listItems.forEach(function(item) {
    item.addEventListener("dragstart",function(e){
        handleDragStart = e.clientY;
        console.log(e.clientY)
        item.classList.add("ghost");
    })
    item.addEventListener("dragend",function(e) {
        item.classList.remove("ghost")
        resetIndex();
    })

})

// var handleSort = function(e){
//     console.log(e.offsetY)
//     var dragGhost = list.querySelector(".ghost");
//     var items = list.querySelectorAll(".list-item:not(.ghost)")
//     var listItem = [];
//     items.forEach(function(item){
//         listItem.push(item);
//     })
//     var sibling = listItem.find(function(item) {
//         console.log(e.target)
//         return e.clientY <= item.offsetTop + item.offsetHeight / 2;
//     })
//     console.log(sibling)
//     list.insertBefore(dragGhost,sibling) 
// }


var handleSort = function(e){
    e.preventDefault();
    var dragGhost = list.querySelector(".ghost");
    var items = list.querySelectorAll(".list-item:not(.ghost)")
    console.log(+e.offsetY  , (+e.target.offsetHeight / 5) + 1, e.target)
    if (e.target.children.length === 0) {
        if (+e.offsetY >= (+e.target.offsetHeight / 2) && e.clientY - handleDragStart > 0) {
            list.insertBefore(dragGhost,e.target.nextElementSibling) 
            handleDragStart = e.clientY;
        }
        else if (+e.offsetY <= (+e.target.offsetHeight / 2) && e.clientY - handleDragStart < 0){
            list.insertBefore(dragGhost,e.target) 
            handleDragStart = e.clientY;
        }
    }
}
list.addEventListener("dragover",handleSort)