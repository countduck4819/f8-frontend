let n = 8;

(function () {
    for (var i = 1; i <= n; i++) {
        for (var j = 1; j <= n; j++) {
            if ((i + j) % 2 === 0) {
                document.write("B");
            } else {
                document.write("W");
            }
        }
        document.write("</br>");
    }
})();
