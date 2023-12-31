import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";
import momentServices from "../../../Services/momentServices";
import NavBar from "../../NavBar/NavBar";
import AddIcon from "@mui/icons-material/Add";

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

const ChatWindow = ({
  handleOpen,
  handleClickGroupChat,
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
  

  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      console.log(
        "This is the messagesContainerRef.current: ",
        messagesContainerRef.current
      );
      container.scroll({
        top: container.scrollHeight,
        behavior: "smooth",
      });
      container.scrollTop = container.scrollHeight; // Initialize scroll to the bottom
    }

  }, [currentChat, currentChatMessages, userChats]);

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <NavBar />
      <MDBRow>
        <MDBCol
          md="6"
          lg="5"
          xl="4"
          className="mb-4 mb-md-0"
          id="chat-list-window"
        >
          <h5 className="font-weight-bold mb-3 text-center text-white member-header">
            {userInfo?.username}'s group chats
            <span onClick={handleOpen}>
              <AddIcon className="add-icon" />
            </span>
          </h5>
          <MDBCard className="mask-custom">
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {userChats.map((chat) => (
                  <li
                    key={chat.chat.id}
                    className="p-2 border-bottom"
                    style={{
                      borderBottom:
                        "1px solid rgba(255, 255, 255, 0.3) !important",
                    }}
                    onClick={() => handleClickGroupChat(chat)}
                  >
                    <a
                      href="#!"
                      className="d-flex justify-content-between link-light"
                    >
                      <div className="d-flex flex-row">
                        <img
                          src={
                            chat.mostRecentMessage?.user?.profile ||
                            "https://static.thenounproject.com/png/4530368-200.png"
                          }
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                          height="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0">{chat.chat.chatName}</p>
                          <p className="small text-white">
                            {chat.mostRecentMessage?.content ||
                              "No recent messages"}
                          </p>
                        </div>
                      </div>
                      {leaveBoxes[chat.chat.id] ? (
                        <div className="leave-box">
                          <p className="leave-box-text">Confirm leave chat</p>
                          <div className="leave-box-btn">
                            <MDBBtn
                              color="dark"
                              size="sm"
                              rounded
                              className="float-end"
                              onClick={() => handleLeaveChat(chat.chat.id)}
                            >
                              Yes
                            </MDBBtn>
                            <MDBBtn
                              color="dark"
                              size="sm"
                              rounded
                              className="float-end"
                              onClick={() => closeConfirmLeaveBox(chat.chat.id)}
                            >
                              No
                            </MDBBtn>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-1">
                          <p className="small mb-1 text-white">
                            {chat.mostRecentMessage
                              ? momentServices(chat.mostRecentMessage.created)
                              : "No recent messages"}
                          </p>
                          <MDBBtn
                            color="dark"
                            size="sm"
                            rounded
                            className="float-end"
                            onClick={() => openConfirmLeaveBox(chat.chat.id)}
                          >
                            Leave
                          </MDBBtn>
                        </div>
                      )}
                    </a>
                  </li>
                ))}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol
          md="6"
          lg="7"
          xl="8"
          id="message-window"
          ref={messagesContainerRef}
        >
          <MDBTypography listUnStyled className="text-white">
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
                          <>
                            <MDBCard className="mask-custom">
                              <MDBCardHeader
                                className="d-flex justify-content-between p-3"
                                style={{
                                  borderBottom:
                                    "1px solid rgba(255,255,255,.3)",
                                }}
                              >
                                <div className="d-flex">
                                  <img
                                        src={message.user.profile}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-2 shadow-1-strong"
                                        width="30"
                                        height="30"
                                      />
                                  <p className="fw-bold mb-0 me-2">
                                    {message.user.username}
                                  </p>
                                </div>
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
                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                  >
                                    <MDBIcon far icon="edit" />{" "}
                                  </span>
                                </p>
                              </MDBCardHeader>
                              <MDBCardBody>
                                <p className="mb-0">{message.content}</p>
                                {message.edited && (
                                  <span className="edited-marker">
                                    (Edited){momentServices(message.editedTime)}
                                  </span>
                                )}
                              </MDBCardBody>
                            </MDBCard>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    // Render other users' messages on the left
                    <>
                      <div className="pt-1 me-auto">
                        <MDBCard className="mask-custom">
                          <MDBCardHeader
                            className="d-flex justify-content-between p-3"
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,.3)",
                            }}
                          >
                            <div className="d-flex">
                              <img
                                    src={message.user.profile}
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-start me-2 shadow-1-strong"
                                    width="30"
                                    height="30"
                                  />
                              <p className="fw-bold mb-0 me-2">
                                {message.user.username}
                              </p>
                            </div>
                            <p className="text-light small mb-0">
                              <MDBIcon far icon="clock" />{" "}
                              {momentServices(message.created)}
                            </p>
                          </MDBCardHeader>
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
            <li className="mb-3 message-input-wrap">
              <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={4}
                value={messageInputText}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyDown={handleKeyDown}
                className="message-input"
              />
              <MDBBtn
                color="light"
                size="lg"
                rounded
                className="float-end message-send-button"
                onClick={handleSendMessage}
              >
                Send
              </MDBBtn>
            </li>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChatWindow;
