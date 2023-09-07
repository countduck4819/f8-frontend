Array.prototype.filter2 = function(callback) {
    if (typeof callback !== "function") {
        return;
    }
    var result = [];
    for(var i in this) {
        if (this.hasOwnProperty(i)) {
            if (callback(this[i],i,this)) {
                result[result.length] = this[i];
            }
        }
    }
    return result;
}
var a = [1,2,3,4,5,6]
var result = a.filter2(function(value,index) {
    return value >= 2;
})
console.log(result)


