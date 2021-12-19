import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Loader from "../components/Loader";
import Checkout from "../components/Checkout";
import { useHistory } from "react-router-dom";

function CartScreen() {
  const cartState = useSelector((state) => state.cartReducer);
  const { cartItems } = cartState;
  const orderState = useSelector((state) => state.orderReducer);
  const { loading, error, success } = orderState;
  const history = useHistory();
  const dispatch = useDispatch();
  const addToCartHandler = (pizza, qty, variant) => {
    dispatch(addToCart(pizza, qty + 1, variant));
  };

  const removeFromCartHandler = (pizza, qty, variant) => {
    dispatch(addToCart(pizza, qty - 1, variant));
  };

  const amountPayable = cartItems.reduce(
    (acc, item) => Number(acc) + Number(item.price),
    0
  );

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      alert("Log in to view cart items.");
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    if (success) {
      history.push("/orders");
    }
  }, [success]);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>
            {" "}
            Cart <i className="fas fa-shopping-cart"></i>{" "}
          </h2>

          <hr />

          {cartItems.length == 0 && (
            <h5>
              Your cart is empty.{" "}
              <Link to="/" style={{ color: "orange" }}>
                Add items.
              </Link>
            </h5>
          )}

          {cartItems.map((cartItem) => {
            return (
              <div
                className="flex-container container shadow p-3 mb-5 rounded"
                style={{ height: "300px" }}
              >
                <div>
                  <h4>
                    {cartItem.name} ({cartItem.variant})
                  </h4>
                  <img
                    src={cartItem.image}
                    style={{ height: "120px", width: "120px" }}
                  />
                </div>
                <div>
                  {" "}
                  <h6>
                    Breakdown: {cartItem.quantity} * $
                    {cartItem.prices[0][cartItem.variant]} = {cartItem.price}
                  </h6>
                </div>
                <div>
                  {" "}
                  <h6>
                    Quantity:{" "}
                    <i
                      className="fas fa-minus"
                      onClick={() =>
                        removeFromCartHandler(
                          cartItem,
                          cartItem.quantity,
                          cartItem.variant
                        )
                      }
                      style={{ color: "red", margin: "5px" }}
                    >
                      {" "}
                    </i>{" "}
                    <span style={{ color: "orange" }}>
                      {" "}
                      {cartItem.quantity}
                    </span>
                    <i
                      className="fas fa-plus"
                      onClick={() => {
                        addToCartHandler(
                          cartItem,
                          cartItem.quantity,
                          cartItem.variant
                        );
                      }}
                      style={{ color: "green", margin: "5px" }}
                    ></i>
                  </h6>
                </div>
                <div>
                  {" "}
                  <h6>Total Amount: ${cartItem.price}</h6>
                </div>
                <div>
                  <i
                    className="fas fa-trash fa-lg"
                    onClick={() => dispatch(deleteFromCart(cartItem._id))}
                    style={{
                      color: "brown",
                      float: "right",
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="col-md-4 container shadow p-3 mb-5 rounded"
          style={{ height: "500px" }}
        >
          <h2>Subtotal</h2>
          <hr />

          <div style={{ margin: "10px" }}>
            {loading && <Loader />}
            {success && (
              <Alert variant="success">Checked out successfully.</Alert>
            )}
            {error && <Alert variant="danger">Something went wrong. :(</Alert>}
          </div>

          {cartItems.map((cartItem) => {
            return (
              <div>
                <div>
                  {cartItem.name} x {cartItem.quantity} - ${cartItem.price}
                </div>
                <div></div>
              </div>
            );
          })}

          <div>
            {amountPayable > 50 && (
              <b style={{ color: "orange" }}>
                - Discount: $
                {(
                  cartItems.reduce(
                    (acc, item) => Number(acc) + Number(item.price),
                    0
                  ) * 0.1
                ).toFixed(2)}{" "}
                <i className="fas fa-tags"></i>
              </b>
            )}
          </div>

          <div
            style={{
              backgroundColor: "#FFCC99",
              color: "purple",
              marginTop: "30px",
            }}
          >
            {amountPayable > 50 ? (
              <b>Total: $ {(amountPayable * 0.9).toFixed(2)}</b>
            ) : (
              <b>Total: $ {amountPayable}</b>
            )}
          </div>

          <div>
            <Checkout
              disabled={amountPayable == 0}
              subtotal={(amountPayable > 50
                ? amountPayable * 0.9
                : amountPayable
              ).toFixed(2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
