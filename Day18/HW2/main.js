var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
document.write(`<h2>Mảng cho sẵn :  [${arr}]</h2>`);
var nt = function (a) {
    for (var i = 2; i <= Math.sqrt(a); i++) {
        if (a % i === 0) return 0;
    }
    return a > 1;
};
let sum = 0;
var dem = 0;
for (var value of arr) {
    if (nt(value)) {
        if (dem === 0) {
            document.write("Cấc số nguyên tố là : <br>");
        }
        document.write(`<div>${value}</div>`);
        dem++;
        sum += value;
    }
}

if (dem === 0) {
    document.write(`<div><b>Không có số nguyên tố</b></div>`);
} else {
    sum /= dem;
    document.write(`<b>Kết quả trung bình của các số nguyên tố trong mảng là : </b> ${sum}`);
}
