var arrA = [1,4,3,2];
var arrB = [5,2,6,7,1]
document.write(`Mảng thứ nhất là : ${arrA}`)
document.write(`Mảng thứ hai là : ${arrB}`)
var newArr = arrA.filter(function(value,index) {
    if (arrB.includes(value)) {
        return true;
    }
});
document.write(`Kết quả giao giữa 2 mảng là : [${newArr}]`)

