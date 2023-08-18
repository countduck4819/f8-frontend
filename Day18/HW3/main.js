var arr = [1,1,100,34,56,72,34,86,56,100];
document.write(`<h2>Mảng cho sẵn :  [${arr}]</h2>`);

var loctrung = function (arr) {
    let newArray = [];
    for (var value of arr) {
        var check = 0;
        for (var index in newArray) {
            if (+newArray[index] === +value) {
                check = 1;
                break;
            }
        }
        if (check === 0) {
            newArray[newArray.length] = value;
        }
    }
    return newArray;
};

var newArray = loctrung(arr);
document.write(`<h2>Mảng sau khi xử lý :  [${newArray}]</h2>`);
