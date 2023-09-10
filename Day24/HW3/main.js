// Cách 1: 
var mamaumax = "ffffffff";
var rand = Math.random();
var max = parseInt(mamaumax,16);
var min = 0;
a = Math.floor(rand * (max - min + 1)) + min;
console.log("#" + a.toString(16))

// Cách 2:
var arr = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
var result = "";
var dem = 0;
var a = setInterval(function () {
    dem++;
    var rand = Math.random();

    result = arr.at(Math.floor(rand * (16 - 0 + 1))) + result;
    if (dem === 8) {
        console.log("#" + result);
        clearInterval(a)
    }
},1);  

