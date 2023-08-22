
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
document.write(`<pre>${arr}</pre>`)
var newArr = []
var phang = function(arr,dem) {
    if (dem === arr.length) {
        return;
    }
    else {
        if (Array.isArray(arr.at(dem))){
            phang(arr.at(dem),0);
        }
        else {
            newArr.push(arr.at(dem))
        }
        dem++;
        phang(arr,dem);
    }
}

phang(arr,0);
document.write(`<h2>Mảng lúc sau là là : [${newArr}]</h2>`)



