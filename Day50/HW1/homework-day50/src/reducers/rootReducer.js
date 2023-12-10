export const initialState = {
    checkLogin: false,
}

export const reducer = function (state,action) {
    switch (action.type) {
        case "check/login": {
            return {...state,checkLogin: action.payload}
        }
    }
}