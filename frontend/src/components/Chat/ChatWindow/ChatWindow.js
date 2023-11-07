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
  MDBCardHeader
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
  handleLeaveChat
}) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      console.log(true);
      const container = messagesContainerRef.current;
      console.log(messagesContainerRef.current);
      container.scrollTop = container.scrollHeight; // Initialize scroll to the bottom
    } else {
      console.log(false);
    }
    
  }, []);


  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <NavBar />
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
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
                  borderBottom: "1px solid rgba(255, 255, 255, 0.3) !important",
                }}
                onClick={() => handleClickGroupChat(chat)}
              >
                <a href="#!" className="d-flex justify-content-between link-light">
                  <div className="d-flex flex-row">
                    <img
                      src={chat.mostRecentMessage?.user?.profile || "https://static.thenounproject.com/png/4530368-200.png"}
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">{chat.chat.chatName}</p>
                      <p className="small text-white">{chat.mostRecentMessage?.content || 'No recent messages'}</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small mb-1 text-white">
                      {chat.mostRecentMessage ? momentServices(chat.mostRecentMessage.created) : 'No recent messages'}
                    </p>
                    {/*<span className="badge bg-danger float-end">
                      {chat.unreadMessages || 0} 
                    </span>*/}
                  </div>
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
              <li className="text-center text-muted">No messages available for this chat.</li>
            ) : (
              currentChatMessages.map((message) => (
                <li key={message.id} className="d-flex justify-content-between mb-4">
                  {message.user.id === userInfo.id ? ( // Check if the message is from the current user
                    <>
                      <div className="pt-1 ms-auto">
                        <MDBCard className="mask-custom">
                          <MDBCardHeader
                            className="d-flex justify-content-between p-3"
                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                          >
                            <p className="fw-bold mb-0">{message.user.username}</p>
                            <p className="text-light small mb-0">
                              <MDBIcon far icon="clock" /> {momentServices(message.created)}
                            </p>
                          </MDBCardHeader>
                          <MDBCardBody>
                            <p className="mb-0">{message.content}</p>
                          </MDBCardBody>
                        </MDBCard>
                      </div>
                    </>
                  ) : (
                    // Render other users' messages on the left
                    <>
                      <div className="pt-1 me-auto">
                        <MDBCard className="mask-custom">
                          <MDBCardHeader
                            className="d-flex justify-content-between p-3"
                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                          >
                            <p className="fw-bold mb-0">{message.user.username}</p>
                            <p className="text-light small mb-0">
                              <MDBIcon far icon="clock" /> {momentServices(message.created)}
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
            <li className="mb-3">
              <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={4}
                value={messageInputText}
                onChange={(e) => setMessageInputText(e.target.value)}
              />
            </li>
            <div className="chat-btn-div">
              <MDBBtn
                color="dark"
                size="sm"
                rounded
                className="float-end"
                onClick={handleLeaveChat}
              >
                X
              </MDBBtn>
              <MDBBtn
                color="light"
                size="lg"
                rounded
                className="float-end"
                onClick={handleSendMessage}
              >
                Send
              </MDBBtn>
            </div>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChatWindow;
