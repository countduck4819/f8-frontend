import React from 'react'
import { initialState, reducer } from '../js/rootReducer'
export const GlobalContext = React.createContext()
function Provider({children}) {
  const [state,dispatch] = React.useReducer(reducer,initialState)
  return (
    <GlobalContext.Provider value={{dispatch,state}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Provider