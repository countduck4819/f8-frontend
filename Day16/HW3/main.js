var n = prompt(`Nhập vào số nguyên n : `);
n = +n;

var a = function (n) {
    let totol = 0;
    for(var i = 1; i <= n; i++) {
        totol += (i * (i + 1));
    }
    return totol;
}

document.write(`Giá trị biểu thức sau : ${a(n)}`);