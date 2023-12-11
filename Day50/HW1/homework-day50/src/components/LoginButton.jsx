import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "../reducers/Provider";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();
  const {state,dispatch} = useContext(GlobalContext);
  return <button className="btn" onClick={() => {
    dispatch({
        type: "check/login",
        payload: true})
  return loginWithPopup()}}>Đăng nhập || Đăng kí</button>;
};

export default LoginButton;