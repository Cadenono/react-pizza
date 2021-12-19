import React, { useState, useEffect } from "react";
import pizzas from "../pizzasdata";
import { getAllPizzas } from "../actions/pizzaActions";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "../components/Pizza";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";
import FilterBar from "../components/Filter";

export default function HomeScreen() {
  const dispatch = useDispatch();

  //run once when homescreen renders
  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  const pizzaState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzaState;

  return (
    <div>
      <div style={{ marginBottom: "25px" }}>
        <FilterBar />
      </div>
      <div className="row">
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">Something went wrong. :(</Alert>
        ) : (
          pizzas.map((pizza) => {
            return (
              <div key={pizza._id} className="col-md-4">
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
