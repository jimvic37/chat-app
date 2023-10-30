import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import OpenModalButton from "../OpenModalButton";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Button } from "@mui/material";
import { AppContext } from "../../Contexts/AppContext";
import decodeJWT from "../../Services/jwtService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const { userInfo, setUserInfo } = useContext(AppContext);
  const jwt = localStorage.getItem("jwtToken");
  console.log(userId)
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/chat");
  };

  useEffect(() => {
    if (jwt) {
      setLoggedIn(true);
      const decodedJwt = decodeJWT(jwt);
      console.log(decodedJwt)
      setUserId(decodedJwt.userId);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    if (userId) {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo({ profile: data.profile, username: data.username, id: data.id });
        }
  
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="home-page">
      <h1 className="logo">BlinkTalk</h1>
      {/* <Button onClick={handleLogin}>go to chat</Button>' */}
      {(loggedIn && userInfo) ? (
        <div className="button-div">
          <img onClick={handleLogin} src={userInfo.profile} alt="profile" />
          <p>{userInfo.username}</p>
        </div>
      ) : (
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
      )
      }
    </div>
  );
};

export default Home;
