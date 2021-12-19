const express = require("express");
const { getAllOrders } = require("../../client/src/actions/orderActions");
const { placeOrder, getUserOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/placeorder", placeOrder);

router.post("/getuserorders", getUserOrder);

module.exports = router;
