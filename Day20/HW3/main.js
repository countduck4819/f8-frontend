var arr = [["a", 1, true,true], ["b", 2, false]]
var array = [];
arr.forEach(function(value){
    array = array.concat(value)
})
var newArr = [];
array.forEach(function(item) {
    var dem = 0;
    if (newArr.length !== 0) {
        var index = newArr.findIndex(function(value){
            return typeof value[0] === typeof item;
        })
        if (index !== -1) {
            newArr[index].push(item)
        }
        else {
            var a = [];
            a.push(item);
            newArr.push(a);
        }
    }
    else {
        var a = [];
            a.push(item);
            newArr.push(a);
    }
})


document.write(`<h3>Tách phần tử mảng theo đúng kiểu dữ liệu là : [[${newArr.join("],[")}]]</h3>`)


