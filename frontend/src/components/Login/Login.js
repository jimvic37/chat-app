import React, {useContext} from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";


const Login = () => {
  const [userInfo] = useContext(AppContext); 


  return (
    <div>
      <h1>Login</h1>
      <div>
        <Link to="/">Home </Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
