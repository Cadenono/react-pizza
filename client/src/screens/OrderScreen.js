import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Loader from "react-spinners/SyncLoader";
import { getAllOrders } from "../actions/orderActions";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getAllOrdersReducer);
  console.log(orderState);
  const { orders, error, loading } = orderState;
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  return (
    <div className="row">
      <h2>My Orders</h2>
      {loading && <Loader />}

      {error && <Alert variant="danger"> Something went wrong. :(</Alert>}
      <br />
      <div>
        {orders &&
          orders.map((order) => {
            return (
              <div>
                <div
                  className="card"
                  style={{
                    margin: "10px",
                  }}
                >
                  <div className="card-body">
                    {/* <h5 class="card-title">
                    Order Created Date: {order.createdAt.split("T")[0]}
                  </h5> */}
                    <h5 class="card-subtitle mb-2 text-muted">
                      <u>
                        {" "}
                        Order Created Date: {order.createdAt.split("T")[0]}
                      </u>{" "}
                      [{" "}
                      {order.isDelivered == true
                        ? "Delivered"
                        : "Not Delivered"}{" "}
                      ]
                    </h5>
                    <p></p>
                    <p style={{ color: "#ADD8E6" }}>Order ID: {order._id}</p>
                    <p class="card-text">
                      {order.orderItems.map((item) => {
                        return (
                          <div>
                            <p>
                              <i className="fas fa-pizza-slice"></i> {item.name}{" "}
                              [{item.variant}] * {item.quantity} = ${item.price}
                            </p>
                          </div>
                        );
                      })}
                    </p>
                    <p>
                      Final Billed Amount:
                      <u style={{ color: "orange" }}>
                        <b style={{ color: "orange" }}>${order.orderAmount}</b>
                      </u>
                    </p>
                    <h6 class="card-subtitle mb-2 text-muted">
                      <u> Shipping Address: </u>
                    </h6>{" "}
                    <p style={{ color: "#C1E1C1" }}>
                      {" "}
                      <i class="fas fa-shipping-fast"></i>{" "}
                      {order.shippingAddress.street},{" "}
                      {order.shippingAddress.zipcode},{" "}
                      {order.shippingAddress.country}{" "}
                      {order.shippingAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            );
            // return (
            //   <div>
            //     <div className="col-md-8">
            //       <p>
            //         <u>Order Created Date: {order.createdAt.split("T")[0]}</u>
            //       </p>
            //       {order.orderItems.map((item) => {
            //         return (
            //           <div>
            //             <p>
            //               <i className="fas fa-pizza-slice"></i> {item.name} [
            //               {item.variant}] * {item.quantity} = ${item.price}
            //             </p>
            //           </div>
            //         );
            //       })}
            //       <p>
            //         Final Amount Billed (after any discounts): $
            //         {order.orderAmount / 100}
            //       </p>

            //     </div>
            //   </div>
            // );
          })}
      </div>
    </div>
  );
};

export default OrderScreen;
