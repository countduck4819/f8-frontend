var n = prompt("Nhập vào số n : ");
n = +n;

function S(n) {
    if (n < 0) return "Không nằm trong phạm vi tính toán";
    else if (n === 0) return 0;
    else if (n === 1) return 1;
    else {
        return S(n - 1) + (1 / n); 
    }
}

console.log(S(n));
document.write(`Kết quả là : ${S(n)}`);