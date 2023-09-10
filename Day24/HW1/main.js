var daonguoc = function (a) {
    var result = 0;
    var a = Number(a);
    if (Number.isNaN(a)) {
        return;
    }
    while (a) {
        let r = a % 10;
        a = parseInt(a / 10);
        result = result * 10 + r;
    }
    return result;
};

var a = 12345;
console.log(daonguoc(a));
