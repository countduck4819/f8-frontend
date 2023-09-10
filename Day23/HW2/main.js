Object.prototype.getCurrency = function(unit) {
    if (Number.isNaN(+(this))) {
        alert("Không thể chuyển đổi tiền do nó ko phải là số");
    }
    var _this = this.toString().split("").reverse().join("");
    let result = "";
    let dem = 0;
    for(var value of _this) {
        if (dem === 3) {
            result = value + "," + result;
            dem = 0;
            continue;
        }
        result = value + result;
        dem++;
    }
    return result + ` ${unit ? unit : ""}`;
}

//Case 1
var price = 12000;
console.log(price.getCurrency('đ')) //Hiển thị: 12,000 đ

//Case 2
var price = "12000000";
console.log(price.getCurrency('đ')) //Hiển thị: 12,000,000 đ




// có thể dùng toLocalString ex : 
// var price = 12000;
// console.log(price.toLocaleString() + " đ")




