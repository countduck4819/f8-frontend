var arr = [1,80, 100, 20, 50,200, 60, 80];
document.write(`<h2>Mảng cho sẵn :  [${arr}]</h2>`);
{
    // let arr = [1,80, 100, 20, 50,200, 60, 80];

    let max1 = arr[0];
    let min1 = arr[0];
    let posmin = 0;
    let posmax = 0;
    let index = 0;
    while (true) {
        if (index >= arr.length) break;
        if (max1 <= arr[index]) {
            posmax = index;
            max1 = arr[index];
            index++;
            continue;
        }
        if (min1 >= arr[index]) {
            posmin = index;
            min1 = arr[index];
        }
        index++;
    }
    document.write("Cách 1 - dùng while : ");
    document.write(`<div>min = ${min1} | position min = ${posmin}</div>`);
    document.write(`max = ${max1} | position max = ${posmax}</br>`);
}
document.write("</br>");
{
    let posmin = 0;
    let posmax = 0;
    // let arr = [1, 100, 20, 50, 60, 80];
    let max2 = arr[0];
    let min2 = arr[0];
    for (var index in arr) {
        if (arr[index] >= max2) {
            posmax = index;
            max2 = arr[index];
        }
        if (arr[index] <= min2) {
            posmin = index;
            min2 = arr[index];
        }
    }
    document.write("Cách 2 - dùng for ");
    document.write(`<div>min = ${min2} | position min = ${posmin} </div>`);
    document.write(`max = ${max2} | position max = ${posmax}</br>`);
}
