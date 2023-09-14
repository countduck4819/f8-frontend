var result = "";
var a = 38912393;
// var a = +prompt("Nhập :")
var arr = {
    0: "không",
    1: "một",
    2: "hai",
    3: "ba",
    4: "bốn",
    5: "năm",
    6: "sáu",
    7: "bảy",
    8: "tám",
    9: "chín",
    10: "mười",
};
var dvi = ["tỉ", "triệu", "nghìn", "trăm"];

var read3 = function (a) {
    var result = "";
    a = a.split("");
    console.log(a.length)
    if (a.length >= 3) {
        result += arr[a.at(-3)] + " " + dvi[3] + " ";
    }
    if (a.length >= 2) {
        if (+a.slice(-2).join("") <= 19) {
            if (a.at(-2) === "0") {
                if (a.at(-1) === "0") {
                    result += " ";
                } else {
                    result += "linh" + " ";
                }
            } else {
                result += "mười" + " ";
            }
        } else {
            result += arr[a.at(-2)] + " " + "mươi ";
        }
    }
    if (a.length >= 1) {
        if (a.at(-1) === "5") {
            if (a.at(-2) === "0") {
                result += "năm";
            } else {
                result += "lăm";
            }
        } else if (a.at(-1) === "0") {
            if (a.length === 1) {
                result += "không";
            }
            else {
                result += "";
            }
        } else {
            result += arr[a.at(-1)];
        }
    }
    return result;
};
function read(a) {
    a = a.split(",");
    var result = [];
    if (a?.length >= 4) {
        result.push(read3(a.at(-4)) + " " + "tỉ");
    }
    if (a?.length >= 3) {
        result.push(read3(a.at(-3)) + " " + "triệu");
    }
    if (a.length >= 2) {
        result.push(read3(a.at(-2)) + " " + "nghìn");
    }
    if (a.length >= 1) {
        result.push(read3(a.at(-1)));
    }
    return result;
}
a = a.toLocaleString("vn");
console.log(read(a).join(" "));
// document.write(read(a).join(" "))


