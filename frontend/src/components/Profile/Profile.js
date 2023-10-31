import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";
import { AppContext } from "../../Contexts/AppContext";
import NavBar from "../NavBar/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import decodeJWT from "../../Services/jwtService";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  console.log(userInfo)
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedJwt = decodeJWT(token);
      setUserInfo({ profile: decodedJwt.profile, username: decodedJwt.sub, id: decodedJwt.userId });
    }
  }, []);

  return (
    <div>
      <div className="profile-page-wrap">
        <div className="profile-nav-wrap">
          <Typography>
            <Link to="/chat">
              <span className="nav-logo">BlinkTalk</span>
            </Link>
          </Typography>
        </div>

        <div class="profile-container">
          <div class="box">
            <img
              src={userInfo?.profile}
              alt=""
            />
            <ul>
              <li>{userInfo?.username}</li>
            </ul>
          </div>
          <div class="About">
            <ul>
              <h1>Profile</h1>
            </ul>
            <ul>
              <h3>Username</h3>
              <li>{userInfo?.username}</li>
            </ul>
            <ul>
              <h3>Timezone</h3>
              <li>Eastern Standard Time (EST)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
