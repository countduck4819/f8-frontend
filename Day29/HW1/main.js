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
<td>2</td>
<td colspan="2">300</td>
</tr>`;
listQuantity.length = subItem.length - 1;
listQuantity.fill(0);
var quantityProduct = 0;
var updatePrice = function() {
    Array.from(tableShop.children).forEach(function(value){
        if (+value.getAttribute("data-index")) {
            var _index = +value.dataset.index;
            var price = subItem[_index].querySelector(".price").innerText;
        }
    })
}
var updateTotal = function() {
    var total = 0;
    Array.from(tableShop.children).forEach(function(value){
        if (+value.getAttribute("data-index")) {
            var _index = +value.dataset.index;
            total += listQuantity[_index - 1];
            var price = subItem[_index].querySelector(".price").innerText;
            value.querySelector("[type='number']").value = listQuantity[_index - 1] /  price
        }
    })
    tableShop.querySelector(".total").lastElementChild.innerText = Number(total).toLocaleString("vi",{
        style: "currency",
        currency: "VND"
    });
}

var removeElement = function(){
    
}

Array.from(subItem).forEach(function (value, index) {
    var actionItem = value.querySelector(".action");
    if (index !== 0) {
        var price = value.querySelector(".price")
        var inputSubItem = actionItem.children[0];
        var buttonSubItem = actionItem.children[1];
        buttonSubItem.addEventListener("click", function (e) {
            console.log(index)
            if (quantityProduct === 0) {
                var table = `<table border="1" width="100%" cellspacing="0px"cellpadding="0px"><tbody></tbody></table><hr/><button>Cập nhật giỏ hàng</button><button>Xóa giỏ hàng</button>`;
                cart.innerHTML = table;
                stringHTML += `<tr><th width="5.3%">STT</th><th>Tên sản phẩm</th><th width="20%">Giá</th><th width="20%">Số lượng</th><th width="20%">Thành tiền</th><th width="5.3%">Xoá</th></tr>`;
                tableShop = cart.getElementsByTagName("table")[0].children[0];
            }
            console.log(listQuantity)
            if (listQuantity[index - 1] === 0) {
                quantityProduct++;
                listQuantity[index - 1] += (price.innerText * inputSubItem.value);
    
                stringHTML += `<tr data-index="${index}">
                <td>${stt}</td>
                <td>${price.previousElementSibling.innerText}</td>
                <td>${price.innerText}</td>
                <td><input type="number" min="1" name="" id="" value="${inputSubItem.value}"></td>
                <td class="total-item">${listQuantity[index - 1]}</td>
                <td><button class="remove" type="button">
                    Xóa
                </button></td>
            </tr>`
                tableShop.innerHTML = stringHTML + stringTotal
                tableShop.querySelector(".total");
                updateTotal();
                stt++;
                updatePrice();
            }
            else {
                Array.from(tableShop.children).forEach(function(value,_index){
                    console.log(123,value.getAttribute("data-index") === index)
                    console.log(typeof value.getAttribute("data-index"),typeof index)
                    if (+value.getAttribute("data-index") === index) {
                        listQuantity[index - 1] += +(price.innerText * inputSubItem.value);
                        value.querySelector(".total-item").innerText = listQuantity[index - 1]
                        console.log(listQuantity)
                    }
                })
                updateTotal();
            }
            Array.from(tableShop.children).forEach(function(value,_index){
                if (value.getAttribute("data-index")) {

                }
            })
        });
    }
});
