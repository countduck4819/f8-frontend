var a = prompt("Nhập số thứ nhất : ");
var b = prompt("Nhập số thứ hai : ");
document.write("Kết quả kiểm tra 2 số cùng dấu hay ko")
if (a * b > 0) {
    console.log("Hai số cùng dấu")
} else if (a * b < 0) {
    console.log("Hai số trái dấu");
} else {
    console.log("Một trong 2 số là số 0");
}