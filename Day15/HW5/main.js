var a = prompt("Nhập vào số a : ");
var b = prompt("Nhập vào số b : ");
var c = prompt("Nhập vào số c : ");
// var a =1;
// var b = 10;
// var c = 5;
var d = +a + +b + +c;

var max;
if (a >= b && a >= c) {
    max = a;
} else if (b >= c && b >= a) {
    max = b;
} else {
    max = c;
}

var min;
if (a <= b && a <= c) {
    min = a;
} else if (b <= c && b <= a) {
    min = b;
} else {
    min = c;
}

d = d - min - max;
console.log(`3 số ban đầu : ${a} ${b} ${c}`);

console.log(`3 số sau khi sắp xếp : ${min} ${d} ${max}`)