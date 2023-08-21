Cách 1: 
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
var newArr = []; // tạo 1 mảng mới để chứa mảng sau khi làm phẳng
var phang = function(arr,dem) {
    if (dem === arr.length) { // điều kiện dừng : kiểm tra xem dem(index) đã chạy đến hết mảng chưa , nếu r thì thoát
        return;
    }
    else {// nếu chưa chạy hết mảng thì sẽ vào else
        if (Array.isArray(arr.at(dem))){ // kiểm tra tại dem(index) đó có là mảng ko , nếu là mảng thì sẽ chạy câu lệnh này
            phang(arr.at(dem),0); // gọi lại hàm phang để chạy (nma chạy với 1 mảng mới và dem(index) ban đầu bằng 0 ví dụ như :[2,3])
        }
        else {
            newArr.push(arr.at(dem)) // nếu ko là mảng thì sẽ thêm vào cuối của mảng newArr
        }
        dem++; // sau khi điều kiên trên chạy xong thì tăng dem(index) để xét phần tử khác
        phang(arr,dem);//gọi lại hàm phang để chuyển sang phần tử tiếp theo
    }
}

phang(arr,0); // 0 là index ban đầu
console.log(newArr)


//Cách 2:
// var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
// function dq(arr) {

// }
// var newArr = arr.forEach(function(value) {
//     if(Array.isArray(value)) {
//         var newArr = 
//     }
//     new
// })

