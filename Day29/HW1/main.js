var listItem = document.querySelector(".list-items");
var tableBody = listItem.children[1].children[0];
var subItem = tableBody.children;
var shop = document.querySelector(".shop");
var cart = shop.querySelector(".cart");
var tableShop;
var listQuantity = [];
var stringHTML = "";
var stt = 1;
var stringTotal = `<tr class="total">
<td colspan="3">Tổng</td>
<td><input type="text"/></td>
<td colspan="2">300</td>
</tr>`;
listQuantity.length = subItem.length - 1;
listQuantity.fill(0);
var quantityProduct = 0;
var updatePrice = function () {
    Array.from(tableShop.children).forEach(function (value) {
        if (+value.getAttribute("data-index")) {
            var _index = +value.dataset.index;
            value.querySelector(".total-item").innerText = listQuantity[_index - 1];
        }
    });
};
var updateTotal = function () {
    var total = 0;
    var count = 0;
    Array.from(tableShop.children).forEach(function (value) {
        if (+value.getAttribute("data-index")) {
            var _index = +value.dataset.index;
            total += listQuantity[_index - 1];
            var price = subItem[_index].querySelector(".price").innerText;
            count += +listQuantity[_index - 1] / price;
            value.querySelector("[type='number']").value = listQuantity[_index - 1] / price;
        }
    });
    tableShop.querySelector(".total").lastElementChild.previousElementSibling.children[0].value = count;
    tableShop.querySelector(".total").lastElementChild.innerText = Number(
        total
    ).toLocaleString("vi", {
        style: "currency",
        currency: "VND",
    });
};

var removeElement = function (rev, value) {
    rev.addEventListener("click", function (e) {
        var _index = value.getAttribute("data-index")
        listQuantity[_index - 1] = 0;
        quantityProduct--;
        updatePrice();
        value.remove();
        if (quantityProduct === 0) {
            cart.innerHTML = `<p>Giỏ hàng không có sản phầm nào</p>`
            stringHTML = "";
            stt = 1;
        }
        else {
            stt = 1;
            stringHTML = `<tr><th width="5.3%">STT</th><th>Tên sản phẩm</th><th width="20%">Giá</th><th width="20%">Số lượng</th><th width="20%">Thành tiền</th><th width="5.3%">Xoá</th></tr>`;
            Array.from(tableShop.children).forEach(function(value,id){
                var price = subItem[id].querySelector(".price")
                console.log(listQuantity)
                var actionItem = subItem[_index].querySelector(".action").children[0];
                if (value.getAttribute("data-index") && listQuantity[value.getAttribute("data-index") - 1] !== 0) {
                    console.log(value)
                    stringHTML += `<tr data-index="${value.dataset.index}">
                    <td>${stt}</td>
                    <td>${price.previousElementSibling.innerText}</td>
                    <td>${price.innerText}</td>
                    <td><input type="number" min="1" name="" id="" value="${
                        actionItem.value
                    }"></td>
                    <td class="total-item">${listQuantity[value.getAttribute("data-index") - 1]}</td>
                    <td><button class="remove" type="button">
                        Xóa
                    </button></td>
                </tr>`;
                tableShop.innerHTML = stringHTML + stringTotal;
                stt++;
                } 
            })
            updateTotal();
            Array.from(tableShop.children).forEach(function(value){
                if (value.getAttribute("data-index")) {
                    var _index = +value.getAttribute("data-index")
                    removeElement(value.querySelector(`.remove`),value);
                }
            })
        }
    });
};

Array.from(subItem).forEach(function (value, index) {
    var actionItem = value.querySelector(".action");
    if (index !== 0) {
        var price = value.querySelector(".price");
        var inputSubItem = actionItem.children[0];
        var buttonSubItem = actionItem.children[1];
        buttonSubItem.addEventListener("click", function (e) {
            if (quantityProduct === 0) {
                var table = `<table border="1" width="100%" cellspacing="0px"cellpadding="0px"><tbody></tbody></table><hr/><button>Cập nhật giỏ hàng</button><button>Xóa giỏ hàng</button>`;
                cart.innerHTML = table;
                stringHTML += `<tr><th width="5.3%">STT</th><th>Tên sản phẩm</th><th width="20%">Giá</th><th width="20%">Số lượng</th><th width="20%">Thành tiền</th><th width="5.3%">Xoá</th></tr>`;
                tableShop = cart.getElementsByTagName("table")[0].children[0];
            }
            if (listQuantity[index - 1] === 0) {
                quantityProduct++;
                listQuantity[index - 1] += price.innerText * inputSubItem.value;

                stringHTML += `<tr data-index="${index}">
                <td>${stt}</td>
                <td>${price.previousElementSibling.innerText}</td>
                <td>${price.innerText}</td>
                <td><input type="number" min="1" name="" id="" value="${
                    inputSubItem.value
                }"></td>
                <td class="total-item">${listQuantity[index - 1]}</td>
                <td><button class="remove" type="button">
                    Xóa
                </button></td>
            </tr>`;
                tableShop.innerHTML = stringHTML + stringTotal;
                updateTotal();
                stt++;
                updatePrice();
                Array.from(tableShop.children).forEach(function(value){
                    if (value.getAttribute("data-index")) {
                        var _index = +value.getAttribute("data-index")
                        removeElement(value.querySelector(`.remove`),value);
                    }
                })
    
            } else {
                Array.from(tableShop.children).forEach(function (
                    value,
                    _index
                ) {
                    if (+value.getAttribute("data-index") === index) {
                        listQuantity[index - 1] += +(
                            price.innerText * inputSubItem.value
                        );
                        value.querySelector(".total-item").innerText =
                            listQuantity[index - 1];
                    }
                });
                updateTotal();
            }
        });
    }
});
var hr = document.querySelector("hr");
var xoa = document.querySelector("");