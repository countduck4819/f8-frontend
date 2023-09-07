
Array.prototype.push2 = function(...args) {
    if (!Array.isArray(this)) {
        console.log("Đối tượng ko phải là array nên ko thể push vào");
        return;
    }
    var arr = this;
    args.forEach(function(value) {
        arr[arr.length] = value;
    });
    return this;
}
var a = [1,2,3,4,5,6]
console.log(a.push2(1,[10,12]));








// var a = [1,2,3,4,5,6]

// a.map(function(value){
//     console.log(this)
//     return value
// })