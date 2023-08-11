var sokW = prompt(`Nhập vào số kWh sử dụng : `);
sokW = +sokW;

function tiendien(a) {
    let totol = 0;
    if (a >= 0 && a <= 50) {
        totol = a * 1.678;
    }
    else if (a <= 100) {
        totol = 50 * 1.678 + (a - 50) * 1.734;
    }
    else if (a <= 200) {
        totol = 50 * 1.678 + 50 * 1.734 + (a - 100) * 2.014;
    }
    else if (a <= 300) {
        totol = 50 * 1.678 + 50 * 1.734 + 100 * 2.014 + (a - 200) * 2.536;
    }
    else if (a <= 400) {
        totol = 50 * 1.678 + 50 * 1.734 + 100 * 2.014 + 100 * 2.536 + (a - 300) * 2.834;
    }
    else {
        totol = 50 * 1.678 + 50 * 1.734 + 100 * 2.014 + 100 * 2.536 + 100 * 2.834 + (a - 400) * 2.927;
    }
    return totol;
}

console.log(tiendien(sokW));
document.write(`Tiền điện đã mất là : ${tiendien(sokW)}`);