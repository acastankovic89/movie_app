import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogIn.css";
import axios from "axios";
import UserPage from "../UserPage/UserPage";
import Cookies from "js-cookie";

const UserLogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nonHasPassword, setNonHasPassword] = useState("");
  const [responseUser, setResponseUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkSession() {
    const responseLocale = Cookies.get("response");
    setResponseUser(responseLocale);

    if (
      responseLocale &&
      Object.keys(responseLocale).length > 0 &&
      responseLocale !== undefined
    ) {
      setIsLoggedIn(true);
      navigate("/user");
      console.log("Session exists:", responseLocale);
    } else {
      console.log("Session does not exist");
    }
  }

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user-log-in", {
        email: email,
        password: nonHasPassword,
      });
      console.log("user", response);
      if (response.data.status === 200) {
        // Set the token cookie
        console.log("test");
        Cookies.set("token", response.data.response.token);

        // Set the response data cookie
        Cookies.set("response", JSON.stringify(response.data.response[0]));
        Cookies.set("userMovies", JSON.stringify(response.data.response[1]));
        checkSession();
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlenonHasPassword = (event) => {
    setNonHasPassword(event.target.value);
  };
  console.log("isLoggedIn", isLoggedIn);
  if (isLoggedIn === false) {
    return (
      <div className="userLogIn">
        <div className="userLogInWrapper">
          <form onSubmit={handleForm}>
            <input
              type="email"
              name="userLogIn"
              className="formInput logIn black"
              onChange={handleEmail}
            />

            <input
              type="password"
              name="userLogIn"
              className="formInput logIn black"
              onChange={handlenonHasPassword}
            />
            <button className="red btn logIn">Sign in</button>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default UserLogIn;
