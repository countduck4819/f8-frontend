import { useContext } from "react"
import { GlobalContext } from "../reducers/Provider"

export const useSelector = function (callback) {
    const {state} = useContext(GlobalContext)
    if (typeof callback !== "function") {
        console.log("Error")
    }
    return callback(state)
}

export const useDispatch = function () {
    const {dispatch} = useContext(GlobalContext);
    return dispatch
}