import axios from "axios";
export const addToCart =
  (pizza, quantity, variant) => async (dispatch, getState) => {
    var cartItem = {
      name: pizza.name,
      _id: pizza._id,
      image: pizza.image,
      variant: variant,
      quantity: Number(quantity),
      prices: pizza.prices,
      price: pizza.prices[0][variant] * Number(quantity),
    };

    if (cartItem.quantity > 10) {
      alert("You cannot add more than 10 quantities.");
    } else {
      if (cartItem.quantity < 1) {
        dispatch({
          type: "CART_REMOVE_ITEM",
          payload: cartItem._id,
        });
      } else {
        dispatch({ type: "ADD_TO_CART", payload: cartItem });
      }
    }

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

export const deleteFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "CART_REMOVE_ITEM",
    payload: id,
  });
  //remove from both state & localstorage
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
