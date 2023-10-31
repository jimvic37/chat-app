import React from "react";
import { useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DrawerComp from "../Drawer/DrawerComp";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

const NavBar = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, cart } = useContext(AppContext);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [value, setValue] = useState();
  // const [auth, setAuth] = React.useState(true);
  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogOut = () => {
    setUserInfo(null);
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  const logOutStyles = {
    marginLeft: "auto",
    marginRight: "1rem",
    background: "none",
    color: "rgba(255, 255, 255, 0.7)",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
    },
  };

  const accountIconStyles = {
    transition: "border-radius 1s ease-in-out, background-color 0.3s ease-in",
    borderRadius: "5%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: "100% !important",
    "&:hover": {
      cursor: "pointer",
      borderRadius: "100%",
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
  };
  const navBarStyles = {
    position: "sticky",
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: "1rem 0",
  };
  
  const goTo = (destination) => {
    navigate(`/${destination}`);
  };

  return (
    <AppBar sx={navBarStyles}>
      <Toolbar>
        {isMatch ? (
          <>
            <Typography>
              <Link to="/chat">
                <span className="nav-logo">BlinkTalk</span>
              </Link>
            </Typography>

            <DrawerComp />
          </>
        ) : (
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}>
              <Typography>
                <Link to="/chat">
                  <span className="nav-logo">BlinkTalk</span>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <p></p>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <Box display={"flex"}>
                <Button
                  className="my-nav-btn"
                  sx={logOutStyles}
                  variant="contained"
                  onClick={() => goTo("chat")}
                >
                  Chat
                </Button>
                <Box sx={accountIconStyles}>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={() => goTo("notifications")}
                  >
                    <Badge
                      badgeContent={
                        userInfo && cart && cart[userInfo.id]
                          ? cart[userInfo.id].products.length
                          : 0
                      }
                      color="error"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Box>

                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => goTo("profile")}>Profile</MenuItem>
                    <MenuItem onClick={() => onLogOut()}>Log out</MenuItem>
                  </Menu>
                </div>
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
