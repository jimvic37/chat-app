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
      setUserInfo({ profile: decodedJwt.profile, username: decodedJwt.sub, id: decodedJwt.userId });
    }
  }, [jwt]);

  return (
    <div className="home-page">
      <h1 className="logo">BlinkTalk</h1>
      {(loggedIn && userInfo) ? (
        <div className="home-user-div">
          <button className="profile-btn">
            <img 
              onClick={handleLogin} 
              src={userInfo.profile} 
              alt="profile" 
              className="home-profile-img"
            />
          </button>
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
