import React, { useContext } from 'react'
import LoginButton from './components/LoginButton'
import Profile from './components/Profile'
import { GlobalContext } from './reducers/Provider'
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const {state,dispatch} = useContext(GlobalContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      {state.checkLogin && isAuthenticated ? <Profile/> : <div className="container">
      <div>Cảm ơn bạn đã sử dụng dịch vụ của F8</div>
      <div className="desc">Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại đây</div>
      <LoginButton/>
    </div>}
    </>
  )
}

export default App