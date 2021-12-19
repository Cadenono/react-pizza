import axios from "axios";
export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });

  try {
    const res = await axios.get("/api/pizzas");
    console.log(res);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAIL", payload: error });
  }
};

export const filterPizzas = (searchPizza, pizzaType) => async (dispatch) => {
  dispatch({
    type: "GET_PIZZAS_REQUEST",
  });

  try {
    const { data } = await axios.get("/api/pizzas");
    var filteredPizzas = data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchPizza)
    );

    if (pizzaType != "all") {
      filteredPizzas = filteredPizzas.filter(
        (pizza) => pizza.category.toLowerCase() == pizzaType
      );
    }

    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_ERROR", payload: error });
  }
};
