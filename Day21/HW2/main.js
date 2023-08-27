document.write(`<h2>Cho trước 1 mảng chứa thông tin từng khách hàng</h2>

<h2>Viết hàm createCustomers với đối số là mảng khách hàng</h2>

<h2>Yêu cầu kết quả trả về là một mảng chứa tất cả thông tin của các đối tượng đó được sắp xết tăng dần theo tuổi và thêm một thuộc tính mới là shortName của mỗi đối tượng.</h2>`);
console.log("Mảng ban đầu là : ")
var customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];
var bd = customers.slice(0);
console.log(bd);
console.log("");

console.log("Mảng sau khi đổi theo cách 1");
//Cách 1 sắp xếp theo từ bé đến lớn
var createCustomers = function(customers) {
    customers.sort(function(a,b){
        return a.age - b.age;
    })
    customers = customers.map(function(value) {
        var string = value.name;
        string = string.trim();
        if (string.includes(" ") === true) {
            var spaceend = string.lastIndexOf(" ");
            var spacestart = string.indexOf(" ");
            string = string.slice(0,spacestart) + string.slice(spaceend);
        }
        value.shortName = string;
        return value;
    })
    return customers;
};

// Cách 2 : sắp xếp theo từ lớn đến bé
var createCustomers2 = function(customers) {
    customers.sort(function(a,b){
        return b.age - a.age;
    })
    customers = customers.reduce(function(prev,value) {
        var string = value.name;
        string = string.trim();
        if (string.includes(" ") === true) {
            var spaceend = string.lastIndexOf(" ");
            var spacestart = string.indexOf(" ");
            string = string.slice(0,spacestart) + string.slice(spaceend);
        }
        value.shortName = string;
        prev.push(value);
        return prev;
    },[])
    return customers;
};

var result = createCustomers(customers);
var bd1 = bd.slice(0);
var result2 = createCustomers2(bd1);
console.log(result);
console.log("");

console.log("Mảng sau khi đổi theo cách 2");
console.log(result2)