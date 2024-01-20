import { legacy_createStore as createStore } from "redux";

const initialState = {
    dataProducts: [],
    page: 1,
    productsStore: [],
    quantity: 0,
}

const rootReducer = function (state = initialState, action) {
    function findProduct(item,tinh) {
        const index = state.productsStore.findIndex((value,index) => {
            if (JSON.stringify(action.payload) === JSON.stringify(value[1])) {
                return true;
            }
        })
        if (index >= 0) {
            if (tinh === "+") {
                state.productsStore[index][0]++;
            }else if (tinh === "-"){
                state.productsStore[result][0]--;
                if (state.productsStore[index][0] === 0) {
                    state.productsStore[index].splice(index,1);
                }
            }
        } else {
            state.productsStore.push([1,item]);
        }
        return state.productsStore;
    }
    switch (action.type) {
        case "add/Products": {
            const kq = findProduct(action.payload,"+");
            localStorage.setItem("productStore",state.productsStore)
            return {...state, productsStore: kq};
        }
        case "add/header": {
            if (localStorage.getItem("quantity")) {
                localStorage.setItem("quantity",state.quantity + JSON.parse(localStorage.getItem("quantity")))
            }
            else {
                localStorage.setItem("quantity",state.quantity + 1)
            }
            return {...state, quantity: state.quantity + action.payload};
        }
        case "sub/Products": {
            localStorage.setItem("productStore",state.productsStore)
            const kq = findProduct(action.payload,"-");
            return {...state, productsStore: kq};
        }
        case "sub/header": {
            if (localStorage.getItem("quantity")) {
                localStorage.setItem("quantity",state.quantity + JSON.parse(localStorage.getItem("quantity")))
            }
            else {
                localStorage.setItem("quantity",state.quantity + 1)
            }
            return {...state, quantity: state.quantity - 1};
        }
        case "convert/page": {
            return {...state, page: action.payload}
        }
        case "product/data": {
            return {...state, dataProducts: action.payload}
        }
        default: {
            return state;
        }
    }
}

export const store = createStore(rootReducer)