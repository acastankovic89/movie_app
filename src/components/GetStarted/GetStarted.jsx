
import "./GetStartded.css";
import React, {useEffect, useState} from 'react'
import logo from "../../assets/img/logo (3).png";
import Cookies from "js-cookie";
import UserPage from "../UserPage/UserPage";

const GetStarted = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [response, setResponse] = useState();
useEffect(()=>{
  function checkSession() {
    const token = Cookies.get("token");
    const responseLocale = Cookies.get("response");

    if (responseLocale) {
      setIsLoggedIn(true);
    } else {
      console.log("Session does not exist");
    }
  }

  checkSession();
},[])
  

  
  if (isLoggedIn) {
    return <UserPage response={response} />;
  } else {

  return (
    <>
      <div className="homePageWrapper">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="signInWrapper">
            <a href="/userSignIn"><button>Sign in</button></a>
          </div>
        </div>
        <div className="getStartedSection">
          <div className="descWraper">
            <h1>Unlimited movies, TV shows, and more</h1>
            <p>Ready to watch?</p>
            <a href="/registration"><button className="red btn logIn">Start Now</button></a>
          </div>
        </div>
      </div>
    </>
  );
  }
};

export default GetStarted;
