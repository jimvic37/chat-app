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
    navigate("/login");
  };

  return (
    <>
      <Drawer
        className="my-drawer"
        PaperProps={{
          sx: {
            background: "gray",
            width: "65%",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          <h1 className="drawer-header">Spring Chat App</h1>
          
            <>
              <ListItemButton onClick={() => navigate("/cart")} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>Chat +</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/account")} divider>
                <ListItemIcon sx={{ textAlign: "center", width: "100%" }}>
                  <ListItemText sx={{ color: "white" }}>Account</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/transactions")} divider>
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
            </>
          

   
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
