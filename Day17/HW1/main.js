var lorem = "Lorem ipsum dolor sit"
lorem += " ";
function th(a) {
    return function (b) {
        a = a + 500;
        setTimeout(function() {
            document.body.innerHTML = b;
        },a)
    }
}
var c = th(500);
var acc = function (lorem) {
    var index = 0;
    var chuoi = lorem;
    for (var i = 0; i < lorem.length; i++) {
        if (lorem.charAt(i) === " ") {
            let select = lorem.slice(index, i);
            chuoi = lorem.slice(0,index)+"<span>"+select+ "</span> " + lorem.slice(i + 1);
            index = i + 1;
            c(chuoi)
        }    
    }
}
let dem = 0;
while(dem < 10) {
    acc(lorem);
    dem++;
}

// function th(a) {
//     return funciton (b) {
//         a = a + a;
//         setTimeout(function() {

//         },a)
//     }
// }
// document.body.innerHTML = chuoi 

// function b(a) {
//     return function (b) {
//         a = a + a;
//         setTimeout(function(){
//             document.write(b);
//         },a)
//     }
// }
// var c = b(500);
// for(var i = 0; i < 2; i++) {
//     c(i);
// }




