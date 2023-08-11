var sokm = prompt(`Nhập tiền taxi`);
sokm = +sokm;
// hoặc sokm = parseFloat(sokm);
var a = function (sokm) {
    let sum = 0;
    if (sokm <= 1) {
        sum = sokm * 15000;
    }
    else if (sokm <= 5) {
        sum = 15000 + (sokm - 1) * 13500;
    }
    else {
        sum = 15000 + 13500 * 4 + (sokm - 5) * 11000;
        if (sokm > 120) {
            sum *= 0.9;
        }
    }
    return sum;
}

console.log(`Tổng số tiền taxi là : ${a(sokm)}`);

document.write(`Tổng số tiền taxi là : ${a(sokm)} , mở console để hiện thị rõ hơn`);