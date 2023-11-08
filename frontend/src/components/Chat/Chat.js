import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import axios from "axios";
import ChatWindow from "./ChatWindow/ChatWindow";
import decodeJWT from "../../Services/jwtService";
import SockJS from "sockjs-client";
import { over } from "stompjs";

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

const BASE_URL = "http://localhost:8080";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [typing, setTyping] = useState(null);
  const [showChatHideMessage, setShowChatHideMessage] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]); // State variable to hold users data
  const [currentChat, setCurrentChat] = useState(null);
  const [groupSelect, setGroupSelect] = useState([]);
  const [createGroupNameInput, setCreateGroupNameInput] = useState("");
  const [messageInputText, setMessageInputText] = useState("");
  const [userChats, setUserChats] = useState([]);
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState("No message received yet");
  const [otherUserIsTyping, setOtherUserIsTyping] = useState("");
  const messagesContainerRef = useRef(null);

  // Triggers when current user is typing
  const handleTyping = (typingText) => {
    let typingMessage = {
      content: typingText,
      typer: userInfo.id,
      typerName: userInfo.username,
      chatId: currentChat.chat.id,
    };
    stompClient.send(
      "/ws/typing-messages/" + currentChat.chat.id,
      {},
      JSON.stringify(typingMessage)
    );
    setMessageInputText(typingText);
  };

  // Triggers when other users are typing
  const handleOtherUsersTyping = (typingMessage) => {
    if (typingMessage) {
      typingMessage = JSON.parse(typingMessage.body);
      console.log("This is the typer: ", typingMessage.typer);
      // console.log("This is the userInfo.id: ", userInfo.id.toString());

      // console.log("They are equal or not? :  ", res);
      const token = localStorage.getItem("jwtToken");
      let decodedJwt;
      if (token) {
        decodedJwt = decodeJWT(token);
      }
      if (decodedJwt.userId.toString() !== typingMessage.typer.toString()) {
        setOtherUserIsTyping(`${typingMessage.typerName} is typing...`);

        setTimeout(() => {
          setOtherUserIsTyping("");
        }, 1000);
      }
    }
  };
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [originalMessageContent, setOriginalMessageContent] = useState("");

  const handleEditClick = (messageId, messageContent) => {
    setEditingMessageId(messageId);
    setOriginalMessageContent(messageContent);
  };

  const handleSaveEdit = async (messageId) => {
    try {
      const editedMessageIndex = currentChatMessages.findIndex(
        (message) => message.id === messageId
      );
      if (editedMessageIndex !== -1) {
        const updatedMessages = [...currentChatMessages];
        updatedMessages[editedMessageIndex].content = originalMessageContent;
        updatedMessages[editedMessageIndex].edited = true;
        updatedMessages[editedMessageIndex].editedTime = new Date();

        setCurrentChatMessages(updatedMessages);
      }

      await axios.put(`/api/message/${messageId}`, {
        content: originalMessageContent,
      });
      setOriginalMessageContent(originalMessageContent);
      setEditingMessageId(null);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickGroupChat = (chat) => {
    if (window.innerWidth < 768) {
      setShowChatHideMessage(!showChatHideMessage);
    } else {
      // Set the currently selected chat when a chat is clicked
      setCurrentChat(chat);
    }
  };

  const handleCreateChat = async (value) => {
    const endpoint = BASE_URL + "/api/chat";
    let userIds = [];
    userIds.push(userInfo.id);
    for (let user of groupSelect) {
      userIds.push(user.id);
    }

    if (userIds.length <= 1) {
      console.log("No other users selected. Cannot create a chat.");
      return;
    }

    const body = {
      chat: {
        chatName: createGroupNameInput,
      },
      userIds,
    };

    console.log("Selected users:", groupSelect);
    console.log("Chat name:", createGroupNameInput);
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
      JSON.stringify(response);
      console.log("Chat created successfully:", response.data);
      const editedResponse = { chat: response.data, mostRecentMessage: null };
      setUserChats((prevChats) => [...prevChats, editedResponse]);

      setGroupSelect([]); // Clear the selected users
      setCreateGroupNameInput("");
    } catch (error) {
      console.error("Error creating chat:", error);
    }

    setOpen(false);
  };

  const handleSendMessage = async () => {
    console.log("This is a test");
    console.log(currentChat);

    const endpoint =
      BASE_URL + `/api/chat/${currentChat.chat.id}/user/${userInfo.id}/message`;
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
      const currentChatMessages = currentChat.chat.messages || [];
      const response = await axios.post(endpoint, body, config);
      const updatedMessages = [...currentChatMessages, response.data];

      setCurrentChat((prevChat) => ({
        ...prevChat,
        chat: {
          ...prevChat.chat,
          messages: updatedMessages,
        },
      }));
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
      // Filter out the user with the specified ID
      const filteredUsers = usersData.filter(
        (user) => user.id !== decodedJwt.userId
      );
      if (filteredUsers.length === 0) {
        console.log("No other users can be invited.");
      } else {
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getCurrentChats = async (decodedJwt) => {
    try {
      axios
        .get(`/api/chat/${decodedJwt.userId}`)
        .then((response) => {
          const allCurrentChats = response.data.filter(chat => chat.leftChat === false);
          setUserChats(allCurrentChats);
          connectToChats(response.data);
        })
        .catch((error) => {
          console.error("Error fetching current chats: ", error);
        });
    } catch (error) {
      console.error("Error fetching current chats:", error);
    }
  };

  const handleFetchMessages = async (currentChat) => {
    if (currentChat) {
      try {
        const response = await axios.get(
          `/api/message/chat/${currentChat.chat.id}`
        );
        setCurrentChatMessages(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setCurrentChatMessages([]);
        } else {
          console.error(
            "Error fetching messages for the current chat: ",
            error
          );
        }
      }
    }
  };

  const connectToChats = (chatsToConnectTo) => {
    const connectionURL = "http://localhost:8080/chat";
    const subscriptionAddress = "/topic/messages/";
    const typingSubscriptionAddress = "/topic/typing-messages/";
    let socket = new SockJS(connectionURL);
    socket = over(socket);
    setStompClient(socket);

    socket.connect(
      {},
      () => {
        console.log("SOCKET CONNECTED SUCCESSFULLY");
        for (let c of chatsToConnectTo) {
          socket.subscribe(subscriptionAddress + c.chat.id, (message) => {
            setCurrentChat((prevChat) => ({
              ...prevChat,
              messages: [...prevChat.chat.messages, message],
            }));
          });
          socket.subscribe(
            typingSubscriptionAddress + c.chat.id,
            (typingMessage) => {
              handleOtherUsersTyping(typingMessage);
            }
          );
        }
      },
      onConnectError
    );
  };

  const onConnectError = (err) => {
    console.log(err);
  };

  const handleLeaveChat = async (chatId) => {
    const endpoint = BASE_URL + `/api/userChat/leave/${currentChat.chat.id}/${userInfo.id}`;
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        console.error("JWT token not found in localStorage");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.put(endpoint, config);
      setCurrentChat([]);
      setCurrentChatMessages([]);
    } catch (error) {
      console.error("Error leaving chat:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    let decodedJwt;
    if (token) {
      decodedJwt = decodeJWT(token);
      setUserInfo({
        username: decodedJwt.sub,
        id: decodedJwt.userId,
        profile: decodedJwt.profile,
      });
    }
    fetchUsers(decodedJwt);
    getCurrentChats(decodedJwt);
    handleFetchMessages(currentChat);
  
  }, [currentChat]);

  

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
            currentChat={currentChat}
            currentChatMessages={currentChatMessages}
            userChats={userChats}
            handleFetchMessages={handleFetchMessages}
            handleTyping={handleTyping}
            otherUserIsTyping={otherUserIsTyping}
            handleEditClick={handleEditClick}
            handleCancelEdit={handleCancelEdit}
            handleSaveEdit={handleSaveEdit}
            editingMessageId={editingMessageId}
            originalMessageContent={originalMessageContent}
            setOriginalMessageContent={setOriginalMessageContent}
            messagesContainerRef={messagesContainerRef}
            handleLeaveChat={handleLeaveChat}
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
