import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [searchPizza, setSearchPizza] = useState("");
  const [PizzaType, setPizzaType] = useState("all");
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-2 ">
          <input
            value={searchPizza}
            onChange={(e) => setSearchPizza(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Search pizzas"
          />
        </div>
        <div className="col-md-2 ">
          <select
            className="form-control"
            value={PizzaType}
            onChange={(e) => setPizzaType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="nonveg">Non Veg</option>
            <option value="veg">Veg</option>
          </select>
        </div>
        <div className="col-md-2 ">
          <button
            className="btn btn-warning"
            onClick={() => dispatch(filterPizzas(searchPizza, PizzaType))}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
