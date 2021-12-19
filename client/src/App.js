import OrderScreen from "./screens/OrderScreen";
import "./App.css";
import Navbar from "./components/Navbar";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomeScreen}>
            <HomeScreen />
          </Route>
          <Route path="/register" exact component={RegisterScreen}>
            <RegisterScreen />
          </Route>
          <Route path="/login" exact component={LoginScreen}>
            <LoginScreen />
          </Route>

          <Route path="/cart" exact component={CartScreen}>
            <CartScreen />
          </Route>

          <Route path="/orders" exact component={OrderScreen}>
            <OrderScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
