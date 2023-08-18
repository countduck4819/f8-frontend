var arr = [5, 1, 9, 8, 10];
document.write(`<h2>Mảng cho sẵn :  [${arr}]</h2>`);
var element = 4;
document.write(`<h2>Số bất kì : ${element}</h2>`);

arr[arr.length] = element;
document.write(`<h2>Mảng sau khi chèn là :  [${arr}]</h2>`);

var sapxep = function(arr) {
    for(var i = 0; i < arr.length - 1; i++) {
        for(var j = i + 1; j < arr.length; j++) {
            if (arr[i] >= arr[j]) {
                let tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
        }
    }
    return arr;
}

var newArray = sapxep(arr);
document.write(`<h2>Mảng cho sẵn :  [${newArray}]</h2>`);



