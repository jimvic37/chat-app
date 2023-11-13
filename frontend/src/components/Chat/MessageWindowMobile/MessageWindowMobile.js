import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../ChatWindow/ChatWindow.css";
import NavBar from "../../NavBar/NavBar";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./MessageWindowMobile.css";
import momentServices from "../../../Services/momentServices";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const MessageWindowMobile = ({ 
  handleClickGroupChat, 
  handleOpen,
  handleSendMessage,
  messageInputText,
  setMessageInputText,
  userInfo,
  userChats,
  currentChatMessages,
  currentChat,
  handleTyping,
  otherUserIsTyping,
  editingMessageId,
  handleSaveEdit,
  handleCancelEdit,
  handleEditClick,
  originalMessageContent,
  setOriginalMessageContent,
  handleLeaveChat,
  messagesContainerRef,
  openConfirmLeaveBox,
  closeConfirmLeaveBox,
  handleKeyDown,
  leaveBoxes,
  setLeaveBoxes
}) => {

  console.log(currentChat.chat.chatName);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      console.log(messagesContainerRef.current);
      container.scrollTop = container.scrollHeight; // Initialize scroll to the bottom
    } 
  }, [currentChat, currentChatMessages, userChats]);
  return (
    <div>
      {/* MessageWindowMobile
      <Button onClick={() => handleClickGroupChat(true)}>
        Show Chat List
      </Button> */}
      <MDBContainer fluid className="py-5 gradient-custom">
        <NavBar />
        <span className="backspace-icon-wrap d-flex mt-2">
          {/* <span > */}
          <KeyboardBackspaceIcon onClick={() => handleClickGroupChat(true)} />
          {/* <h4 className="mobile-group-name">{currentChat.chat.chatName}</h4> */}
        </span>
        <MDBRow>
          <MDBCol
            md="6"
            lg="7"
            xl="8"
            id="message-window-mobile"
            ref={messagesContainerRef}
          >

            <MDBTypography listUnStyled className="message-container text-white">
            {currentChatMessages.length === 0 ? (
              <li className="text-center text-muted">
                No messages available for this chat.
              </li>
            ) : (
              currentChatMessages.map((message) => (
                <li
                  key={message.id}
                  className="d-flex justify-content-between mb-4"
                >
                  {message.user.id === userInfo.id ? (
                    <>
                      <div className="pt-1 ms-auto">
                        {message.id === editingMessageId ? (
                          <>
                            <MDBTextArea
                              value={originalMessageContent}
                              onChange={(e) =>
                                setOriginalMessageContent(e.target.value)
                              }
                            />
                            <MDBBtn
                              color="light"
                              size="sm"
                              onClick={() => handleSaveEdit(message.id)}
                            >
                              Save
                            </MDBBtn>
                            <MDBBtn
                              color="light"
                              size="sm"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </MDBBtn>
                          </>
                        ) : (
                          // Render current user's own messages on the right
                          <div className="d-flex justify-self-end">
                            <MDBCard className="mask-custom me-2 ms-5">
                              {/* <MDBCardHeader
                                className="d-flex justify-content-between p-3"
                                style={{
                                  borderBottom:
                                    "1px solid rgba(255,255,255,.3)",
                                }}
                              >
                                <p className="fw-bold mb-0">
                                  {message.user.username}
                                </p>
                                <p className="text-light small mb-0">
                                  <MDBIcon far icon="clock" />{" "}
                                  {momentServices(message.created)}
                                  <span
                                    onClick={() =>
                                      handleEditClick(
                                        message.id,
                                        message.content
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <MDBIcon far icon="edit" />{" "}
                                  </span>
                                </p>
                              </MDBCardHeader> */}
                              <MDBCardBody>
                                <p className="mb-0">{message.content}</p>
                                {message.edited && (
                                  <span className="edited-marker">
                                    (Edited){momentServices(message.editedTime)}
                                  </span>
                                )}
                              </MDBCardBody>
                            </MDBCard>
                            <img
                              src={message.user.profile}
                              alt="avatar"
                              className="profile-img-msg rounded-circle d-flex align-self-end mb-3 me-2 shadow-1-strong"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Render other users' messages on the left
                    <>
                      <div className="d-flex pt-1 ms-2">
                        <img
                          src={message.user.profile}
                          alt="avatar"
                          className="profile-img-msg rounded-circle d-flex align-self-end mb-3 me-2 shadow-1-strong"
                        />
                        <MDBCard className="mask-custom me-5">
                          {/* <MDBCardHeader
                            className="d-flex justify-content-between p-3"
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,.3)",
                            }}
                          >
                            <p className="fw-bold mb-0">
                              {message.user.username}
                            </p>
                            <p className="text-light small mb-0">
                              <MDBIcon far icon="clock" />{" "}
                              {momentServices(message.created)}
                            </p>
                          </MDBCardHeader> */}
                          <MDBCardBody>
                            <p className="mb-0">{message.content}</p>
                          </MDBCardBody>
                        </MDBCard>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
            <p className="typing-message">
              {otherUserIsTyping ? otherUserIsTyping : ""}
            </p>
            <li className="mb-2 message-input-wrap-mobile">
              <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={1}
                value={messageInputText}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyDown={handleKeyDown}
                className="message-input"
              />
              {/* <MDBBtn
                color="light"
                size="sm"
                rounded
                className="float-end-mobile message-send-button"
                onClick={handleSendMessage}
              >
                Send
              </MDBBtn> */}
            </li>
          </MDBTypography>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default MessageWindowMobile;
