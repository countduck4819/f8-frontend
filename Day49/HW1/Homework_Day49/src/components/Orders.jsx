import React, { useContext } from 'react'
import { GlobalContext } from '../reducers/Provider'
import { app } from '../js/app';

function Orders() {
    const {state,dispatch} = useContext(GlobalContext);
    console.log(state.orders)
    const handleSubmit = function () {
        const result = state.orders.map((value) => {
            return {
                productId: value._id,
                quantity: value.currentQuantity,
            }
        })
        app.getOrders(result)
        dispatch({
            type: "products/addlist",
            payload: []
        })
        localStorage.removeItem("data_products")
    }
  return (
    <>
        {state.orders.length > 0 ? <><table width="100%" cellPadding="20px" cellSpacing="0px"> 
                    {/* <thead> */}
                        <tr>
                          <th width="40%">TÊN SẢN PHẨM</th>
                          <th width="20%">CÒN LẠI</th>
                          <th width="20%">TỔNG TIỀN</th>
                          <th width="20%">SỐ LƯỢNG</th>
                        </tr>
                    {/* </thead> */}
                    {/* <tbody> */}
                        {state.orders.map((value) => {
                        {console.log(value)}
                            return <tr key={value._id}>
                                <td>{value.name}</td>
                                <td>{value.quantity}</td>
                                <td>{value.currentQuantity * value.price}</td>
                                <td>{value.currentQuantity}</td>
                          </tr>
                        })}
                    {/* </tbody> */}
                    
                </table><button className="submit-end" onClick={handleSubmit}>Xác nhận</button></> : <h1>Khong co j het</h1>}
    </>
  )
}

export default Orders