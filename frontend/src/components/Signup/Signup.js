import React, { useContext, useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import PasswordChecklist from "react-password-checklist";
import Login from "../Login/Login";

import './Signup.css'

const Signup = () => {

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { closeModal, setModalContent } = useContext(AppContext);

  const handleSignup = async (e) => {
    e.preventDefault(); 
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
        setModalContent(<Login />)
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

  const handleEnableSubmit = (isValid) => {
    setIsSubmitDisabled(!isValid)
  }

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={handleSignup}>
        <ul className="error-ul">
          {
            errors.map((error, idx) => (
              <li key={idx}>
                <svg className="checklist-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" style={{ marginRight: '5px', marginLeft: '0px' }}>
                  <path fill="#FF0033" d="M507.331 411.33c-0.002-0.002-0.004-0.004-0.006-0.005l-155.322-155.325 155.322-155.325c0.002-0.002 0.004-0.003 0.006-0.005 1.672-1.673 2.881-3.627 3.656-5.708 2.123-5.688 0.912-12.341-3.662-16.915l-73.373-73.373c-4.574-4.573-11.225-5.783-16.914-3.66-2.080 0.775-4.035 1.984-5.709 3.655 0 0.002-0.002 0.003-0.004 0.005l-155.324 155.326-155.324-155.325c-0.002-0.002-0.003-0.003-0.005-0.005-1.673-1.671-3.627-2.88-5.707-3.655-5.69-2.124-12.341-0.913-16.915 3.66l-73.374 73.374c-4.574 4.574-5.784 11.226-3.661 16.914 0.776 2.080 1.985 4.036 3.656 5.708 0.002 0.001 0.003 0.003 0.005 0.005l155.325 155.324-155.325 155.326c-0.001 0.002-0.003 0.003-0.004 0.005-1.671 1.673-2.88 3.627-3.657 5.707-2.124 5.688-0.913 12.341 3.661 16.915l73.374 73.373c4.575 4.574 11.226 5.784 16.915 3.661 2.080-0.776 4.035-1.985 5.708-3.656 0.001-0.002 0.003-0.003 0.005-0.005l155.324-155.325 155.324 155.325c0.002 0.001 0.004 0.003 0.006 0.004 1.674 1.672 3.627 2.881 5.707 3.657 5.689 2.123 12.342 0.913 16.914-3.661l73.373-73.374c4.574-4.574 5.785-11.227 3.662-16.915-0.776-2.080-1.985-4.034-3.657-5.707z"></path>
                </svg>
                {error}
              </li>
            ))
          }
        </ul>
        <PasswordChecklist
          rules={["minLength","specialChar","number","capital","match"]}
          minLength={5}
          value={password}
          valueAgain={confirmPassword}
          onChange={(isValid) => {handleEnableSubmit(isValid)}}
        />
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
        <button disabled={isSubmitDisabled} className="form-submit-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
