import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { placeOrder } from "../actions/orderActions";
import Loader from "./Loader";
const Checkout = ({ subtotal }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const { loading, error, success } = orderState;
  function tokenHandler(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
  }

  return (
    <div>
      <StripeCheckout
        amount={Number(subtotal) * 100}
        shippingAddress
        currency="SGD"
        token={tokenHandler}
        stripeKey="pk_test_51JrxoHD89oAlgjd7WzuYbZlru6gtn6eyRasFfP7DreYC2INZaDqUZhnTAaOEg5Y3n5pAkrLh5Ykr0Q758Y61ofPx00AA4Xtrkm"
      >
        <button style={{ marginTop: "30px" }} className="btn btn-warning">
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;
