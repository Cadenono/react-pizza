import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../actions/userActions";
import { Alert } from "react-bootstrap";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.registerUserReducer);
  const { loading, error, success } = userRegister;

  function handleClick() {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      const user = { name, email, password };
      dispatch(registerUser(user));
      history.push("/");
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="danger">
          An account with the email already exists.
        </Alert>
      )}
      {success && <Alert variant="success">Successfully registered.</Alert>}
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div>
            <h1>Register </h1>

            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="btn btn-warning"
              onClick={handleClick}
              style={{ marginTop: "20px" }}
            >
              {" "}
              Register
            </button>
            <p>
              Have an account? Login{" "}
              <Link to="/login" style={{ color: "orange" }}>
                here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
