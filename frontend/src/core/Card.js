import ImageHelper from "./helper/ImageHelper";
import React, { useEffect, useState } from "react";
import { addItemToCart, removeItemFromCart } from "./helper/cartItemHelper";
import { Redirect } from "react-router-dom";

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    reload = undefined,
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const productTitle = product ? product.name : "Could not load title"
    const productDescription = product ? product.description : "Could not load description"
    const productPrice = product ? product.price : "Could not load price"


    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true));
    };

    const redirectUser = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addtoCart) => {
        return (
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block font-weight-bold rounded btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload);
                    }}
                    className="btn btn-block font-weight-bold rounded btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        );
    };

    return (
        <div className="card text-white bg-dark border ">
            <div className="card-header lead font-weight-bold ">{productTitle}</div>
            <div className="card-body">
                {redirectUser(redirect)}
                <ImageHelper product={product} />
                <p className="lead rounded mt-3 font-weight-normal text-wrap">
                    {productDescription}
                </p>
                <p className="btn btn-outline-success rounded  font-weight-bold btn-sm px-4">$ {productPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;