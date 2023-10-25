import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      <div>
        <Link to="/">Home </Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
