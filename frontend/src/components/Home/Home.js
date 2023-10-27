import React from "react";
import "./Home.css";
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
      <h1 className="logo">BlinkTalk</h1>
      <Button onClick={handleLogin}>go to chat</Button>
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
