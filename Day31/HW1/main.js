var createList = function() {

}
var list = document.querySelector(".list");
list.addEventListener("drop",function(e){
    item.classList.remove("ghost")
})
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

listItems.forEach(function(item) {
    item.addEventListener("dragstart",function(e){
        item.classList.add("ghost");
        console.log(e)
    })
    item.addEventListener("dragend",function(e) {
        item.classList.remove("ghost")
        resetIndex();
    })
})

var handleSort = function(e){
    var dragGhost = list.querySelector(".ghost");
    var items = list.querySelectorAll(".list-item:not(.ghost)")
    console.log(items)
    var listItem = [];
    items.forEach(function(item){
        listItem.push(item);
    })
    var sibling = listItem.find(function(item) {
        return e.clientY <= item.offsetTop + item.offsetHeight / 2;
    })
    list.insertBefore(dragGhost,sibling) 
}
list.addEventListener("dragover",handleSort)