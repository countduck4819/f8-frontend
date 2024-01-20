export const initialState = {
    checkLight: true,
    number: 204,
    slot: 7,
    currentSlot: 7,
    numberRandom: 0,
    result: false,
    visibleResult: false
}

export const reducer = function (state,action) {
    switch (action.type) {
        case "convert/light": {
            return {...state, checkLight: action.payload}
        }
        case "drag/input": {
            return {...state, number: action.payload}
        }
        case "slot/input": {
            return {...state, slot: action.payload}
        }
        case "currentSlot/input": {
            return {...state, currentSlot: action.payload}
        }
        case "number/random": {
            return {...state, numberRandom: action.payload}
        }
        case "result/endgame": {
            return {...state,result: action.payload}
        }
        case "result/visible": {
            return {...state,visibleResult: action.payload}
        }
    }
}