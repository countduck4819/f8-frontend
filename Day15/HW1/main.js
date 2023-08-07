var a = 10;
var b = 20;
document.write("<h2>Em sẽ cho a = 10 và b = 20</h2>");
console.log("Ban đầu : ");
console.log(`a = ${a}`);
console.log(`b = ${b}`);
a += b;
b = a - b;
a -= b;

console.log("Thực hiện hoán đổi : ");
console.log(`a = ${a}`);
console.log(`b = ${b}`);
document.write(`<h2>Kết quả :  a = ${a} và b = ${b}</h2>`);
