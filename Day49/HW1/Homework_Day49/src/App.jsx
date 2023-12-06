import React, { useContext } from 'react'
// import "../node_modules/sass/sass";
import "./scss/style.scss"
import Products from './components/Products'
import Orders from './components/Orders'
import { GlobalContext } from './reducers/Provider'
function App() {
    const {state,dispatch} = useContext(GlobalContext)
  return (
    <>
    <div className="container">
            <div className="products-list">
                <h1>Welcome to Shop</h1>
                <Products/>
            </div>
            <div className="table-products">
                <Orders/>
            </div>
        </div>
    </>
  )
}

export default App