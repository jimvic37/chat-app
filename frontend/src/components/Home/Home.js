import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import OpenModalButton from "../OpenModalButton";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { AppContext } from "../../Contexts/AppContext";
import decodeJWT from "../../Services/jwtService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const { userInfo, setUserInfo } = useContext(AppContext);
  const jwt = localStorage.getItem("jwtToken");

  const handleLogin = () => {
    navigate("/chat");
  };

  useEffect(() => {
    if (jwt) {
      setLoggedIn(true);
      const decodedJwt = decodeJWT(jwt);
      console.log(decodedJwt)
      fetchData(decodedJwt.userId);
    }
  }, [jwt]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${id}`, {
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

  return (
    <div className="home-page">
      <h1 className="logo">BlinkTalk</h1>
      {(loggedIn && userInfo) ? (
        <div className="home-user-div">
          <img 
            onClick={handleLogin} 
            src={userInfo.profile} 
            alt="profile" 
            className="home-profile-img"
          />
          <h4 className="home-username">{userInfo.username}</h4>
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
