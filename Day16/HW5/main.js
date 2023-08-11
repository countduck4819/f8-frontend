var n = prompt('Nhập vào số n để vẽ tam giác : ');
n = +n;
function vetamgiac(n) {
    let count = 0;
    for (var i = 1; i <= n; i++) {
        for (var j = 1; j <= i; j++) {
            ++count; // hoặc count++;
            document.write(`${count}`);
            document.writeln("");
        }
        document.writeln("<br/>");
    }
}
vetamgiac(n);