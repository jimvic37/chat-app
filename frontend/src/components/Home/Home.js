import React, { useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const ulRef = useRef();

  const handleLogin = () => {
    navigate("/chat");
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleLogin}>go to chat</Button>
      <div>
        <OpenModalButton modalComponent={<Login />} buttonText="Login" />
        <OpenModalButton modalComponent={<Signup />} buttonText="Signup" />
      </div>
    </div>
  );
};

export default Home;
