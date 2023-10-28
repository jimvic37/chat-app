import React from "react";
import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Profile = () => {
  return (
    <div>
      <div className="profile-page-wrap">
        <div className="profile-nav-wrap">
          <Typography>
            <Link to="/chat">
              <span className="nav-logo">BlinkTalk</span>
            </Link>
          </Typography>
          <Link to="/chat">
            <ArrowBackIcon id="profile-back-arrow" />
          </Link>
        </div>

        <div class="profile-container">
          <div class="box">
            <img
              src="https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png"
              alt=""
              
            />
            <ul>
              <li>Username</li>
            </ul>
          </div>
          <div class="About">
            <ul>
              <h1>Profile</h1>
            </ul>
            <ul>
              <h3>Email</h3>
              <li>email@email.com</li>
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
