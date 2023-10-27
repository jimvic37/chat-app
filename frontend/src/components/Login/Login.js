import React, { useContext, useState } from "react";
import { useModal } from "../../Contexts/Modal";

import "./Login.css";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestObject = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestObject),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.jwt);
        closeModal();
        toChat();
      } else {
        const data = await response.json();
        setErrors([data.error]);
      }
    } catch (error) {
      setErrors(["An error has occured. Please try again later."]);
    }
  };

  const toChat = () => {
    window.location.href = "/chat";
  };

  return (
    <div className="form-container">
      <h1>Log In</h1>
      <form className="form" onSubmit={handleSubmit}>
        <ul className="form-error">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="form-submit-btn" type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
