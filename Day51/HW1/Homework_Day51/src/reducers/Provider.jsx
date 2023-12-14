import React, { createContext, useReducer } from 'react'
import { initialState, reducer } from '../js/hookReducer'
export const GlobalContext = createContext();
function Provider({children}) {
    const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <GlobalContext.Provider value={{state,dispatch}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default Provider