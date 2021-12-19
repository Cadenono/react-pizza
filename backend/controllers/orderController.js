const stripe = require("stripe")(
  "sk_test_51JrxoHD89oAlgjd7V4gTowsHmdAcjV6ZySJ9GeotLzCvdTPYVw2HNAI8RL7uaCq583QNo9EYhYgIzO7up0wFxsVn00f9MsT655"
);
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");
const placeOrder = async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    console.log(customer);
    const payment = await stripe.charges.create(
      {
        amount: Number(subtotal) * 100,
        currency: "SGD",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    console.log(payment);
    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: Number(subtotal),
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          zipcode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      newOrder.save();
      res.send("Payment Done");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getUserOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ userId: userId });
    const ordersSorted = orders.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : -1
    );

    console.log(ordersSorted);
    res.send(ordersSorted);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = { placeOrder, getUserOrder };
