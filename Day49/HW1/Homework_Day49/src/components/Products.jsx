import React from "react";
import { app } from "../js/app";
import { GlobalContext } from "../reducers/Provider";

function Products() {
    console.log("dic hoi")
    const {state,dispatch} = React.useContext(GlobalContext)
    console.log(localStorage.getItem("list-product"))
    if (!localStorage.getItem("list-product")) {
        console.log(12)
        app.getProducts();
    }
    console.log(state)
    function handleClick(value) {
        dispatch({
            type: "products/add",
            payload: value
        })
    }
    return (
        <>
            <div className="products">
        {state.listProducts.map((value) => {
                return (
                    <div key={value._id} className="product">
                        <div className="content">
                            <img className="img" src={value.image} alt="" />
                            <h2>{value.name}</h2>
                            <div className="action">
                                <span className="price">${value.price}</span>
                                <button className="btn" onClick={(e) => {e.preventDefault();handleClick(value)}}>Add to cart!</button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        
        </>
    );
}

export default Products;
