import React, { useContext, useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import PasswordChecklist from "react-password-checklist";

import './Signup.css'

const Signup = () => {

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useContext(AppContext);

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
      "profile": profile || "https://static.thenounproject.com/png/4530368-200.png",
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
        <PasswordChecklist
          rules={["minLength","specialChar","number","capital","match"]}
          minLength={5}
          value={password}
          valueAgain={confirmPassword}
          onChange={(isValid) => {}}
        />
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
          <label>Profile Image</label>
          <input
            type="url"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
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
