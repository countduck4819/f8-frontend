import React, {
    useDeferredValue,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import Pagination from "./Pagination";
import { app } from "../js/app";
import { useDispatch, useSelector } from "react-redux";
import Loaders from "./Loaders";

function ProductsList() {
    const [loading, setLoading] = useState(false);
    const state = useSelector((state) => state);
    const [productList, setProducts] = useState([]);
    const [check, setCheck] = useState(true);
    const [convertPage, setConvertPage] = useState(false);
    const dispatch = useDispatch();
    function convertPages(bool) {
        setConvertPage(bool);
    }
    function convertCheck(check) {
        setCheck(check);
    }

    useEffect(() => {
        console.log("lan 1");
        async function takeData(page) {
            app.getPage(page).then((data) => {
                setLoading(true);
                setCheck(true);
                dispatch({
                    type: "convert/page",
                    payload: page,
                });
                dispatch({
                    type: "product/data",
                    payload: data,
                });
            });
        }
        if (!localStorage.getItem("products") && check) {
            takeData(1);
            setCheck(false);
            setProducts(state.data);
            setLoading(false);
        } else if (check && localStorage.getItem("products")) {
            if (convertPage === true) {
                takeData(state.page);
                setCheck(false);
                setProducts(state.data);
                setLoading(false);
                setConvertPage(false);
            } else if (convertPage === false) {
                setCheck(false);
                dispatch({
                    type: "product/data",
                    payload: JSON.parse(localStorage.getItem("products")),
                });
                setProducts(JSON.parse(localStorage.getItem("products")));
                setLoading(false);
            }
        }
        // while(!productList) {
        //     setProducts(state.data)
        // }
    }, [productList, state.page, loading]);
    return (
        <>
            {loading && <Loaders />}
            <div>
                <div className="main">
                    <div className="container">
                        <h1 className="heading">PRODUCTS</h1>
                        <div className="list-products">
                            {productList?.map(
                                ({
                                    _id,
                                    name,
                                    category,
                                    brand,
                                    price,
                                    image,
                                }) => {
                                    return (
                                        <div key={_id} className="product">
                                            <div className="info">
                                                <div className="img">
                                                    <img src={image} alt="" />
                                                </div>
                                                <div className="desc">
                                                    {name}
                                                </div>
                                            </div>
                                            <div className="action">
                                                <div className="price">
                                                    ${price}
                                                </div>
                                                <div className="add-story">
                                                    <i className="fa-solid fa-cart-shopping"></i>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <Pagination
                        convertCheck={convertCheck}
                        convertPage={convertPages}
                    />
                </footer>
            </div>
        </>
    );
}

export default ProductsList;
