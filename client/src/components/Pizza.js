import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
export default function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("small");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const handleAddtoCart = () => {
    dispatch(addToCart(pizza, quantity, variant));
  };

  return (
    <div
      className="container shadow p-3 mb-5 rounded"
      style={{ height: "450px" }}
    >
      <div className="pizza-detail" onClick={handleShow}>
        {" "}
        <h5>{pizza.name}</h5>
      </div>
      <img
        src={pizza.image}
        className="img-fluid"
        style={{ height: "200px", width: "200px" }}
      />
      <div className="flex-container" style={{ display: "flex" }}>
        <div>
          <p>Variants</p>
          <select value={variant} onChange={(e) => setVariant(e.target.value)}>
            {pizza.variants.map((v) => {
              return <option value={v}>{v}</option>;
            })}{" "}
          </select>
        </div>
        <div>
          <p>Quantity</p>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {/* x is object, map returns x */}
            {[...Array(10).keys()].map((x, idx) => {
              return <option value={idx + 1}>{idx + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div>
          <div className="mt-5" style={{ float: "left" }}>
            Price : $<u>{pizza.prices[0][variant] * quantity}</u>
          </div>
          <div className="mt-5" style={{ float: "right" }}>
            <button className="btn btn-warning" onClick={handleAddtoCart}>
              Add to Cart
            </button>
          </div>
        </div>
        <Modal show={show}>
          <Modal.Header style={{ margin: "0 auto" }}>
            <Modal.Title>{pizza.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img
              src={pizza.image}
              style={{
                height: "300px",
                width: "300px",
                margin: "0 auto",
                display: "block",
              }}
            />
            <p>
              <b>
                <u>Description</u>
              </b>
            </p>
            <p> {pizza.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-warning" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
