import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartItemHelper";
// import StripeCheckout from "./StripeCheckout";
import Paymentb from "./Paymentb";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div className="row text-center">
                <div className="row">
                    <h2 className="col-12 text-white text-center">All Products in your cart:</h2>
                    {products.map((product, index) => {
                        return (
                            <Card
                                key={index}
                                product={product}
                                removeFromCart={true}
                                addtoCart={false}
                                setReload={setReload}
                                reload={reload}
                            />
                        );
                    }
                    )}
                </div>
            </div >
        )
    };

    const loadCheckout = () => {
        return (
            <div>
                <h2 className="text-white">Checkout:</h2>
            </div>
        )
    };

    return (
        <Base title="Cart Page" description="Explore other products or checkout now">
            <div className="row text-center">
                <div className="col-6">
                    {products && products.length > 0 ? loadAllProducts() : (
                        <h3 className="text-white">No products in cart</h3>
                    )}
                </div>
                <div className="col-6">
                    {/* <StripeCheckout products={products} setReload={setReload} /> */}
                    <Paymentb products={products} setReload={setReload} />
                </div>
            </div>
        </Base >
    )
}

export default Cart;