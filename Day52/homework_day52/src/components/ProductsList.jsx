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
import { Link } from "react-router-dom";

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
    function handleClick(
        _id,
        name,
        category,
        brand,
        image,
        price,
        description
    ) {
        dispatch({
            type: "take/header",
            payload: 1,
        });

        dispatch({
            type: "add/Products",
            payload: {
                _id,
                name,
                category,
                brand,
                image,
                price,
                description,
            },
        });
    }

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

    const handleCallData = async () => {
        console.log("lan 1");

        if (!localStorage.getItem("products") && check) {
            await takeData(1);
            // console.log(state.data)
            setCheck(false);
            setProducts(state.dataProducts);
            setLoading(false);
        } else if (check && localStorage.getItem("products")) {
            if (convertPage === true) {
                await takeData(state.page);
                setCheck(false);
                // console.log(12345,state.page,state.data)
                setProducts(state.dataProducts);
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
    };

    useEffect(() => {
        handleCallData();
    }, [productList, state.page, loading]);
    console.log(state);
    return (
        <>
            {loading && <Loaders />}
            <div>
                <div className="main">
                    <div className="container">
                        <h1 className="heading">PRODUCTS</h1>
                        <div className="list-products">
                            {productList.map(
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
                                            <Link
                                                id={_id}
                                                to={`card/detail/${(
                                                    name.replace(" ", "-") +
                                                    "~" +
                                                    brand.replace(" ", "-")
                                                ).replace(" ", "-")}/${_id}`}
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <div className="info">
                                                    <div className="img">
                                                        <img
                                                            src={image}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="desc">
                                                        {name}
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="action">
                                                <div className="price">
                                                    ${price}
                                                </div>
                                                <Link>
                                                    <div
                                                        className="add-story"
                                                        onClick={() => {
                                                            handleClick(
                                                                _id,
                                                                name,
                                                                category,
                                                                brand,
                                                                image,
                                                                price
                                                            );
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-cart-shopping"></i>
                                                    </div>
                                                </Link>
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
