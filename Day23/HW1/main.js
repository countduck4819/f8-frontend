var tinhtong = function (...args) {
    return args.reduce(function (prev, value) {
        value = +value;
        if (
            typeof value !== "number" ||
            Number.isNaN(value) ||
            prev === undefined
        ) {
            return undefined;
        }
        return prev + value;
    }, 0);
};
var a = new Number(10);

var result = tinhtong(1, 2, 3, 4, 5, 6, 7, 8, a);
if (result === undefined) {
    console.log(
        "Không thể tính toán do đối số truyền vào có kiểu dữ liệu khác kiểu số"
    );
} else {
    console.log(result);
}
