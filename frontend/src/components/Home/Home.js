import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link to="/Login">Login </Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Home;
