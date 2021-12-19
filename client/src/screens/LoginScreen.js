import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../actions/userActions";
import { Alert } from "react-bootstrap";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.loginUserReducer);

  const { loading, error, currentUser, success } = userLogin;

  // useEffect(() => {
  //   if (currentUser) {
  //     history.push("/");
  //   }
  // }, [currentUser]);

  async function handleClick(e) {
    e.preventDefault();
    const user = { email, password };
    dispatch(loginUser(user));
    history.push("/");
    window.location.reload();
  }

  return (
    <div>
      {error && <Alert variant="danger">Invalid email or password.</Alert>}
      {success && <Alert variant="success">Successfully logged in.</Alert>}
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div>
            <h1>Login</h1>

            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-warning"
              onClick={handleClick}
              style={{ marginTop: "20px" }}
            >
              {" "}
              Login
            </button>
            <p>
              Don't have an account? Register{" "}
              <Link to="/register" style={{ color: "orange" }}>
                here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
