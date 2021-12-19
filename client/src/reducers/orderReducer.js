export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return { loading: true, ...state };
    case "PLACE_ORDER_SUCCESS":
      return { loading: false, success: true };
    case "PLACE_ORDER_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "GET_ORDERS_REQUEST":
      return { loading: true, ...state };
    case "GET_ORDERS_SUCCESS":
      return { loading: false, success: true, orders: action.payload };
    case "GET_ORDERS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
