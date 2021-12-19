import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Navbar() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const userLogin = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userLogin;
  const { cartItems } = cartState;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light navwhite shadow p-3 mb-5 rounded"
        style={{ backgroundColor: "#FFDB58" }}
      >
        <a className="navbar-brand" href="/">
          JO PIZZA HOUSE <i className="fas fa-pizza-slice"></i>
        </a>{" "}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <li className="nav-item dropdown active">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {currentUser.name}
                </a>
                <div
                  className="dropdown-menu active"
                  aria-labelledby="navbarDropdown"
                >
                  {currentUser.isAdmin && (
                    <a className="dropdown-item " href="/admin">
                      Admin
                    </a>
                  )}

                  <a className="dropdown-item " href="/orders">
                    Orders
                  </a>

                  <a
                    className="dropdown-item "
                    onClick={logoutHandler}
                    href="/login"
                  >
                    Logout
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item active">
                <a className="nav-link" href="/login">
                  <i className="fas fa-user"></i> Login
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <i className="fas fa-shopping-cart"></i>
                Cart (
                {cartItems.reduce(
                  (acc, item) => Number(acc) + Number(item.quantity),
                  0
                )}
                )
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
