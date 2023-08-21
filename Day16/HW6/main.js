let n = 8;

(function (n) {
    str = "";
    for(var i = 1; i <= n; i++) {
        str += "<tr>";
        for(var j = 1; j <= n; j++) {
            var totol = i + j;
            str += "<td class='"+(totol % 2 === 0 ? "white":"black")+"'></td>"
        }
        str += "</tr>"
    }
    document.write(str);
})(8);
