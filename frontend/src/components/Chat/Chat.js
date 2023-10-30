import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import ChatWindow from "./ChatWindow/ChatWindow";
import decodeJWT from "../../Services/jwtService";
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

const BASE_URL = "http://localhost:8080/api";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [showChatHideMessage, setShowChatHideMessage] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]); // State variable to hold users data
  const [currentChat, setCurrentChat] = useState({ id: 1 });
  const [groupSelect, setGroupSelect] = useState([]);
  const [createGroupNameInput, setCreateGroupNameInput] = useState("");
  const [messageInputText, setMessageInputText] = useState("");

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

  const handleCreateChat = async (value) => {
    const endpoint = BASE_URL + "/chat";
    let userIds = [];
    userIds.push(userInfo.id);
    for (let user of groupSelect) {
      userIds.push(user.id);
    }
    const body = {
      chat: {
        chatName: createGroupNameInput,
      },
      userIds,
    };

    console.log("here's group select: ", groupSelect);
    console.log("here's createGroupNameInput: ", createGroupNameInput);

    try {
      const jwtToken = localStorage.getItem("jwtToken");

      if (!jwtToken) {
        // Handle the case where the JWT token is missing in localStorage
        console.error("JWT token not found in localStorage");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token as a bearer token
        },
      };

      const response = await axios.post(endpoint, body, config);

      console.log("Chat created successfully:", response.data);
    } catch (error) {
      console.error("Error creating chat:", error);
    }

    setOpen(false);
  };

  const handleSendMessage = async () => {
    console.log("This is a test");

    const endpoint =
      BASE_URL + `/api/chat/${currentChat.id}/user/${userInfo.id}/message`;
    const body = { content: messageInputText };

    // Get the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      // Handle the case where the JWT token is missing in localStorage
      console.error("JWT token not found in localStorage");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token as a bearer token
        },
      };

      console.log("This is body: ", body);
      const bodyString = JSON.stringify(body);
      console.log(jwtToken);

      console.log(bodyString);
      console.log(body);
      const response = await axios.post(endpoint, body, config);

      // Handle the response as needed
      console.log("Message sent successfully:", response.data);

      // Clear the message input field
      setMessageInputText("");
    } catch (error) {
      // Handle any errors that occur during the POST request
      console.error("Error sending message:", error);
    }
  };
  // fetch users data
  const fetchUsers = async (decodedJwt) => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      const usersData = response.data; // Get the users data from the response
      console.log("Jwt userId: ", decodedJwt.userId);
      // Filter out the user with the specified ID
      const filteredUsers = usersData.filter(
        (user) => user.id !== decodedJwt.userId
      );

      // Save the filtered users data to the state
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    let decodedJwt;
    if (token) {
      decodedJwt = decodeJWT(token);
      setUserInfo({ username: decodedJwt.sub, id: decodedJwt.userId });
    }
    fetchUsers(decodedJwt);
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
            handleSendMessage={handleSendMessage}
            userInfo={userInfo}
            handleClickGroupChat={handleClickGroupChat}
            messageInputText={messageInputText}
            setMessageInputText={setMessageInputText}
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
                  onChange={(event, value) => setGroupSelect(value)}
                  // onInputChange={(e) => console.log(e)}
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
                  value={createGroupNameInput}
                  onChange={(e) => setCreateGroupNameInput(e.target.value)}
                />
              </Box>
            </Box>
            <Box sx={createButtonWrapStyles}>
              <Button sx={createButtonStyles} onClick={handleCreateChat}>
                Create
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Chat;
