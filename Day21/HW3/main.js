document.write(
    `<h2>Tạo một hàm register nhận vào nhiều tham số để khởi tạo ra một mảng chứa các đối tượng có cấu trúc như sau:</h2>`
);
document.write(`Tên`);
document.write(`Số`);
document.write(`Điện thoại`);
var data = [];
var handleRegister = function (name, so, phone) {
    var obj = {};
    if (name === undefined || so === undefined || phone === undefined) {
        console.log("Kết thúc chương trình(vì chuyền thiếu dữ liệu)!");
        return -1;
    }
    obj["name"] = name;
    obj["so"] = so;
    obj["phone"] = phone;
    obj["role"] = "user";
    data.push(obj);
    return obj;
};
var handleLogin = function (name, so) {
    var dataLogin = data.find(function (value) {
        return value["name"] === name && value["so"] === so;
    });
    return dataLogin;
};
var dem = 0;
while (dem++ === 0) {
    var dataRegister = handleRegister(
        "Nguyen Van A",
        "123456",
        "nguyenvana@email.com"
    );
    if (dataRegister === -1) {
        break;
    }
    console.log("Data sau khi thêm lần 1 : ");
    console.log(data);
    console.log("");
    var dataRegister = handleRegister(
        "Nguyen Van B",
        "1234567",
        "nguyenvanb@email.com"
    );
    if (dataRegister === -1) {
        break;
    }
    console.log("Data sau khi thêm lần 2 : ");
    console.log(data);
    var dataLogin = handleLogin("Nguyen Van B", "1234567");
    if (dataLogin === undefined) {
        console.log("<h3>Thông tin đăng nhập không hợp lệ</h3>");
        // document.write("<h3>Thông tin đăng nhập không hợp lệ</h3>")
    } else {
        console.log("");
        console.log(`Dữ liệu tìm được là :`);
        console.log(dataLogin);
    }
}
