// import React, { useState, useEffect } from "react";
// import { isAuthenticated } from "../auth/helper";
// import { API } from "../backend";
// import { cartEmpty, loadCart } from "./helper/cartItemHelper";
// import { Link } from "react-router-dom";
// import StripeCheckoutButton from "react-stripe-checkout";
// import { createOrder } from "./helper/orderHelper";



// const StripeCheckout = ({ products, setReload = f => f, reload }) => {

//     const [data, setData] = useState({
//         loading: false,
//         success: false,
//         error: "",
//         address: ""
//     });


//     const token = isAuthenticated() && isAuthenticated().token;
//     const userId = isAuthenticated() && isAuthenticated().user._id;

//     const getFinalAmount = () => {
//         let amount = 0;
//         products.map(p => {
//             amount = amount + p.price;
//         });
//         return amount;
//     };


//     const makePayment = token => {
//         const body = {
//             token,
//             products
//         };
//         const headers = {
//             "Content-Type": "application/json"
//         };
//         return fetch(`${API}stripepayment`, {
//             method: "POST",
//             headers,
//             body: JSON.stringify(body)
//         })
//             .then(response => {
//                 console.log(response);
//                 const { status } = response;
//                 console.log("STATUS", status);
//             })
//             .catch(error => console.log(error));
//     };

//     const showStripeButton = () => {
//         return isAuthenticated() ? (
//             <StripeCheckoutButton
//                 stripeKey="pk_test_51KPfzLSB0FTSP4AKjtLqQByyY7QYQkeNN6i3ObUEdFWG3snyxVzLrQjWRBrxZnp2hB41XzsfYmfclxulHtuc13MX00fL8DHvr9"
//                 token={makePayment}
//                 amount={getFinalAmount() * 100}
//                 name="Pay Now"
//                 shippingAddress
//                 billingAddress
//             ><button className="btn btn-success rounded">Pay with Stripe</button></StripeCheckoutButton>
//         ) : (
//             <Link to="/signin">
//                 <button className="btn btn-warning rounded">Sign in</button>
//             </Link>
//         );
//     };





//     return (
//         <div>
//             {console.log(products)}
//             <h1 className="text-white">Stripe Checkout: $ {getFinalAmount()}</h1>
//             {showStripeButton()}
//         </div>
//     );
// }

// export default StripeCheckout;
