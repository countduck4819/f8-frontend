var arr = [
    ["a", 1, true],
    ["b", 2, false],
];
documen.write(`<h2>Mảng ban đầu là : ${arr}</h2>`)
var Arr = [];
var arr = arr.filter(function (value) {
    Arr = Arr.concat(value);
    return true;
});
console.log(Arr);
var newArr = [];
Arr.forEach(function (value) {
    var dem = 0;
    for (var v of newArr) {
        if (typeof v[0] === typeof value) {
            v.push(value);
            dem = 1;
        }
    }
    if (dem === 0) {
        var subarr = [];
        subarr[subarr.length] = value;
        newArr[newArr.length] = subarr;
    }
});

document.write(`<h2>Mảng lúc sau là là : ${newArr}</h2>`)
