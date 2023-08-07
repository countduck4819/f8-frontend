var a = prompt("Nhập vào số a : ");
var b = prompt("Nhập vào số b : ");
var c = prompt("Nhập vào số c : ");
a = +a;
b = +b;
c = +c;

var d = +a + +b + +c;

var max;
if (a >= b && a >= c) {
    max = a;
} else if (b >= a && b >= c) {
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
console.log(min)

d = d - min - max;
console.log(`3 số ban đầu : ${a} ${b} ${c}`);

console.log(`3 số sau khi sắp xếp : ${min} ${d} ${max}`)


document.write(`<h2>3 số sau khi sắp xếp : ${min} ${d} ${max} , xem màn hình console để rõ hơn</h2>`)