import React, { useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Home = () => {
  const ulRef = useRef();

  return (
    <div>
      <h1>Home</h1>
      <div>
        <OpenModalButton 
          modalComponent={<Login />}
          buttonText="Login"
        />
        <OpenModalButton 
          modalComponent={<Signup />}
          buttonText="Signup"
        />
      </div>
    </div>
  );
};

export default Home;
