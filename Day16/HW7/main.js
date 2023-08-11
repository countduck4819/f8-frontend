document.write("Bảng cửu chương !");
document.write("</br>");
for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= 10; j++) {
        document.write(`${i} x ${j} = ${i * j}`);
        document.write("</br>");
    }
    if (i != 10) {
        document.write("--------------");
        document.write("</br>");
    }
}
