import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import ChatWindow from "./ChatWindow/ChatWindow";
import decodeJWT from "../../Services/jwtService";
import NavBar from "../NavBar/NavBar";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import MessageWindowMobile from "./MessageWindowMobile/MessageWindowMobile";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [showChatHideMessage, setShowChatHideMessage] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]); // State variable to hold users data

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickGroupChat = () => {
    if (window.innerWidth < 768) {
      setShowChatHideMessage(!showChatHideMessage);
    } else {
    }
  };

  // fetch users data
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data); // Save the users data to the state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedJwt = decodeJWT(token);
      setUserInfo({ username: decodedJwt.sub, id: decodedJwt.userId });
    }
    fetchUsers();
  }, []);

  const modalStyles = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const modalContentBoxStyles = {
    transition: "background-color 0.3s ease-in",
    borderRadius: "10px",
    width: "70%",
    padding: "2rem",
    backgroundColor: "white",

    "&:hover": {},
    "@media (max-width: 780px)": {
      width: "95%",
      padding: "1rem",
    },
  };
  const modalHeaderStyles = {
    fontSize: "1.7rem",
    marginBottom: "2rem",
  };
  const autoCompleteStackStyles = {
    marginBottom: "2rem",
    width: "50%",
    "@media (max-width: 1000px)": {
      width: "90%",
      margin: "0 auto 2rem auto",
    },
  };
  const createButtonWrapStyles = {
    textAlign: "center",
  };
  const createButtonStyles = {
    textAlign: "center",
    backgroundColor: "black",
    width: "100%",
    padding: "1rem 0 1rem",
    fontSize: "1.4rem",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {},
  };

  const groupNameInputWrapStyles = {
    marginBottom: "3rem",
    width: "100%",
  };
  const groupNameInputStyles = {
    width: "50%",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  };
  const formInputsWrapStyles = {
    padding: "0 0 0 2rem",
    "@media (max-width: 1000px)": {
      padding: 0,
      textAlign: "center",
    },
  };

  return (
    <div className="chat-container">
      <div className="chat-wrap">
        {showChatHideMessage ? (
          <ChatWindow
            handleOpen={handleOpen}
            userInfo={userInfo}
            handleClickGroupChat={handleClickGroupChat}
          />
        ) : (
          <MessageWindowMobile
            handleOpen={handleOpen}
            userInfo={userInfo}
            handleClickGroupChat={handleClickGroupChat}
          />
        )}
        <Modal
          sx={modalStyles}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalContentBoxStyles}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={modalHeaderStyles}
            >
              Create a group chat
            </Typography>
            <Box sx={formInputsWrapStyles}>
              <Stack spacing={3} sx={autoCompleteStackStyles}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={users}
                  getOptionLabel={(user) => user.username}
                  defaultValue={[users[0]]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Choose users:"
                      placeholder=""
                    />
                  )}
                />
              </Stack>
              <Box sx={groupNameInputWrapStyles}>
                <TextField
                  sx={groupNameInputStyles}
                  id="standard-basic"
                  label="Group name"
                  variant="standard"
                />
              </Box>
            </Box>
            <Box sx={createButtonWrapStyles}>
              <Button sx={createButtonStyles}>Create</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Chat;
