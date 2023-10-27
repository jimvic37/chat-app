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

  const handleLogin = () => {
    navigate("/chat");
  };

  return (
    <div className="home-page">
      <h1 className="logo">CHAT-APP</h1>
      {/* <Button onClick={handleLogin}>go to chat</Button> */}
      <div className="button-div">
        <OpenModalButton 
          modalComponent={<Login />} 
          buttonText="Login"
          className="button"
          />
        <OpenModalButton 
          modalComponent={<Signup />} 
          buttonText="Signup" 
          className="button"
        />
      </div>
    </div>
  );
};

export default Home;
