import React, { useState } from "react";
import { redirect } from "react-router-dom"
import { useModal } from "../../Contexts/Modal";

import './Signup.css'

const Signup = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSignup = async (e) => {
    e.preventDefault(); 
    if (password !== confirmPassword) {
      setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
      return
    }
    const requestObject =
    {
      "username": username,
      "password": password
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestObject),
      });
      if (response.ok) {
        closeModal()
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

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;
