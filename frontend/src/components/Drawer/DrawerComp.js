import React, { useState, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "./Drawer.css";
import { useNavigate } from "react-router-dom";

const DrawerComp = () => {
  const { setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOnLogOut = () => {
    setOpen(false);
    setUserInfo(null);
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  

  return (
    <>
      <Drawer
        className="my-drawer"
        PaperProps={{
          sx: {
            background: "rgb(0 , 0, 0, 0.4)",
            width: "65%",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          <h1 className="drawer-header">BlinkTalk</h1>

          <div className="drawer-items-wrap">
            <ListItemButton onClick={() => navigate("/chat")} divider>
              <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                <ListItemText sx={{ color: "white" }}>Chat</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/profile")} divider>
              <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                <ListItemText sx={{ color: "white" }}>Profile</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/notifications")} divider>
              <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                <ListItemText sx={{ color: "white" }}>
                  Notifications
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => handleOnLogOut()} divider>
              <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                <ListItemText sx={{ color: "white" }}>Logout</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </div>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpen(!open)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
