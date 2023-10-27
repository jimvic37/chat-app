import React, { useState } from "react";
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
    <div className="form-container">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={handleSignup}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="form-submit-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
