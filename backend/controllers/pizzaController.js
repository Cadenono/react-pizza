const Pizza = require("../models/pizzaModel");

const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
module.exports = { getPizzas };
