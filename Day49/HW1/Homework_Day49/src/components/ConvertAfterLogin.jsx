import React from 'react'
import { GlobalContext } from '../reducers/Provider'
import Login from './Login'
import App from '../App'
import { app } from '../js/app'

function ConvertAfterLogin() {
  const {state,dispatch} = React.useContext(GlobalContext)
  const data = JSON.parse(localStorage.getItem("apiKey"))
  if (data?.userEmail && state.checkLoginSuccess === false) {
    app.start(data.userEmail).then((result) => {
      if (result.res) {
        dispatch({
          type: "login/checkLogin",
          payload: true,
      });
      dispatch({
        type: "products/list",
        payload: result.result,
    })
    if (result.dataProducts) {
      dispatch({
          type: "products/addlist",
          payload: result.dataProducts,
      })
  }
      }
    })
  }
  return (
    <>
        {state.checkLoginSuccess ? <App/>: <Login/>}
    </>
  )
}

export default ConvertAfterLogin