var array = [1,2,3,4,5,6,7,8,9,10];

Array.prototype.reduce2 = function(cb,result){
    var i = 0;
    if (result === undefined) {
        result = this[0];
        ++i;
    }
    for(; i < this.length; i++) {
        result = cb(result,this[i],i,this)
    }
    return result;
} 

var newarray = array.reduce2(function(prev,value){
    return prev + value;
},10)

console.log(newarray)