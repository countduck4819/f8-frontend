var a = prompt("Nhập số thứ nhất : ");
var b = prompt("Nhập số thứ hai : ");
a = +a;
b = +b;
var f = "";
document.write("Kết quả kiểm tra 2 số cùng dấu hay ko")
if (a * b > 0) {
    console.log("Hai số cùng dấu")
    f += "Hai số cùng dấu";
} else if (a * b < 0) {
    console.log("Hai số trái dấu");
    f+="Hai số trái dấu";
} else {
    console.log("Một trong 2 số là số 0");
    f+="Một trong 2 số là số 0";
}

document.write(` <h2>Kết quả : ${f} , xem màn hình console để rõ hơn </h2>`);