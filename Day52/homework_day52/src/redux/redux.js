import { legacy_createStore as createStore } from "redux";

const initialState = {
    dataProducts: [],
    page: 1,
    productsStore: 0,
}

const rootReducer = function (state = initialState, action) {
    switch (action.type) {
        case "add/Products": {
            return {...state, productsStore: state.productsStore + action.payload};
        }
        case "sub/Products": {
            return {...state, productsStore: state.productsStore - action.payload};
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