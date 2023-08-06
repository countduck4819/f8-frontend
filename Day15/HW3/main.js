var a = parseFloat(prompt("Nhập vào số a: "));
var b = parseFloat(prompt("Nhập vào số b: "));
var c = parseFloat(prompt("Nhập vào số c: "));

document.write("<h2>Em làm 2 cách em xem hộ em với nhé !</h2>")
document.write("<h2>Số lớn nhất trong 3 số là: </h2>")
// C1: 

var d = (a >= b ? a : b) >= c ? (a >= b ? a : b) : c;
console.log(`Cách 1 : ${d}`);
// C2:
if (a >= b && a >= c) {
    console.log(`Cách 2 : ${a}`);
}
else if (b >= a && b >= c) {
    console.log(`Cách 2 : ${b}`);
}
else {
    console.log(`Cách 2 : ${c}`);
}