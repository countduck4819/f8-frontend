var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
var dq = function(arr,newArr) {
    arr.forEach(function(value){
        if (Array.isArray(value)) {
            dq(value,newArr)
        }
        else {
            newArr.push(value);
        }
    })
}
var newArr = [];
dq(arr,newArr);
document.write(`<h3>Mảng mởi sau khi chuyển về mảng 1 chiều là : [${newArr.join()}]</h3>`)