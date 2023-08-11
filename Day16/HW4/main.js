var n = prompt("Nhập vào số cần kiểm tra : ");
n = +n;

function nt(n) {
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return n > 1;
}

if (nt(n)) {
    console.log(`${n} là số nguyên tố`);
    document.write(`${n} là số nguyên tố`);
} else {
    console.log(`${n} không phải là số nguyên tố`);
    document.write(`${n} không phải là số nguyên tố`);
}