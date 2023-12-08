export const initialState = {
    text: "",
    checkLoginSuccess: false,
    listProducts: [],
    orders: []
}
export const reducer = function (state,action) {
    function add(payload) {
        const result = state.orders.findIndex((value) => {
            return value._id === payload._id;
        })
        if (result >= 0) {
            state.orders[result].currentQuantity += 1;
            state.orders[result].quantity -= 1;
        }
        else {
            const product = {
                _id: payload._id,
                name: payload.name,
                price: payload.price,
                quantity: payload.quantity - 1,
                currentQuantity: 1,
            }
            state.orders.push(product)
        }
        localStorage.setItem("data_products",JSON.stringify(state.orders));
        return state.orders;
    }
    switch (action.type) {
        case "login/input": {
            return {...state,text: action.payload};
        }
        case "login/checkLogin": {
            return {...state,checkLoginSuccess: action.payload}
        }
        case "products/list": {
            return {...state,listProducts: action.payload}
        }
        case "products/add": {
            return {...state,orders: add(action.payload)}
        }
        case "products/addlist": {
            return {...state,orders: action.payload}
        }
    }
}