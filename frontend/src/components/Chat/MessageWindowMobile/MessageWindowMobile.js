import React, { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../ChatWindow/ChatWindow.css";
import NavBar from "../../NavBar/NavBar";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./MessageWindowMobile.css";
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

const MessageWindowMobile = ({ handleClickGroupChat, handleOpen }) => {
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
    <div>
      {/* MessageWindowMobile
      <Button onClick={() => handleClickGroupChat(true)}>
        Show Chat List
      </Button> */}
      <MDBContainer fluid className="py-5 gradient-custom">
        <NavBar />
        <div className="backspace-icon-wrap">
          <span onClick={() => handleClickGroupChat(true)}>
            <KeyboardBackspaceIcon className="backspace-icon" />
          </span>
        </div>
        <MDBRow>
          <MDBCol
            md="6"
            lg="7"
            xl="8"
            id="message-window-mobile"
            ref={messagesContainerRef}
          >
            <MDBTypography listUnStyled className="text-white">
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <MDBCard className="w-100 mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Lara Croft</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 13 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <MDBCard className="w-100 mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Lara Croft</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 13 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <MDBCard className="w-100 mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Lara Croft</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 13 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="mb-3">
                <MDBTextArea label="Message" id="textAreaExample" rows={4} />
              </li>
              <MDBBtn color="light" size="lg" rounded className="float-end">
                Send
              </MDBBtn>
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default MessageWindowMobile;
