import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Link to="/">Home </Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
