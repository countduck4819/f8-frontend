import React, { createContext, useContext } from 'react'
import { initialState, reducer } from './rootReducer'
export const GlobalContext = createContext();
function Provider({children}) {
  const [state,dispatch] = React.useReducer(reducer,initialState)
  return (
    <GlobalContext.Provider value={{state,dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Provider