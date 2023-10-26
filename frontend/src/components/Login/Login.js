import React, {useContext, useState} from "react";
import { AppContext } from "../../Contexts/AppContext";
import { useModal } from "../../Contexts/Modal";
import { redirect } from 'react-router-dom';

import "./Login.css";

const Login = () => {
  // const [userInfo] = useContext(AppContext); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit =  async (e) => {
    e.preventDefault(); 

    const requestObject =
    {
      "username": username,
      "password": password
    }

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestObject),
      });
      if (response.ok) {
        const data =  await response.json()
        localStorage.setItem("jwtToken", data.jwt)
        closeModal()
        toChat()
      } else {
        const data = await response.json()
        setErrors([data.error])
      }

    } catch (error) {
      setErrors([
				"An error has occured. Please try again later.",
			]);
    }
  }

  const toChat = () => {
    window.location.href = "/chat";
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
