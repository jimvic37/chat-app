import React from "react";
import "./Profile.css";
import NavBar from "../NavBar/NavBar";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div class="profile-container">
        <div class="box">
          <img
            src="https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png"
            alt=""
          />
          <ul>
            <li>Username</li>
            <li>Age</li>
            <li>Job</li>
            <li>
              <i style={{ fontSize: "24px" }} className="fa">
                
              </i>
              <i style={{ fontSize: "24px" }} className="fa">
                
              </i>
              <i style={{ fontSize: "24px" }} className="fa">
                
              </i>
            </li>
          </ul>
        </div>
        <div class="About">
          <ul>
            <h1>Profile</h1>
          </ul>
          <ul>
            <h3>Work</h3>
            <li>Actor</li>
          </ul>
          <ul>
            <h3>Gender</h3>
            <li>male</li>
          </ul>
          <ul>
            <h3>Country</h3>
            <li>USA</li>
          </ul>
          <ul>
            <h3>More Info</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              convallis, justo eu fringilla blandit, quam justo tristique nunc,
              eu ultrices felis nisl ac justo. Fusce ac libero eu nunc eleifend
              semper. Quisque tincidunt, arcu eget vehicula consequat, nunc
              sapien ultrices purus, vel euismod neque orci a felis. Sed in
              vestibulum orci. Vivamus hendrerit euismod justo, non lacinia odio
              efficitur quis. Sed vel dolor sapien. Sed vel elit vel sapien
              ultricies dignissim id et nulla. Sed a quam nec metus tristique
              congue. Nunc rhoncus vehicula urna, a pellentesque eros.
              Suspendisse id justo nec lorem efficitur facilisis. Vivamus
              semper, urna nec lacinia elementum, libero eros consectetur
              libero, sed dignissim eros quam a tellus. Quisque consectetur erat
              non augue volutpat, sed cursus justo venenatis. Curabitur
              vestibulum felis a euismod aliquam.
            </p>
          </ul>
          <ul>
            <h3>Contact</h3>
            <li>example@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
