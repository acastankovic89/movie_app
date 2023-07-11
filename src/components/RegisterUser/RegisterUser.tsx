import React, { useEffect, useState } from "react";
import "./RegisterUser.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailRequire, setEmailRequire] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nonCriptedPassword, setNonCriptedPassword] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [passwordRepeatCheck, setPasswordRepeatCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRequire, setPasswordRequire] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameRequire, setFirstNameRequire] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameRequire, setLastNameRequire] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberRequire, setPhoneNumberRequire] = useState("");
  const [buttonDisable, setButonDisable] = useState(true);
  const [token, setToken] = useState("");

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const createToken = (length) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    setToken(createToken(50));
  }, []);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handeleEmailChange = (event) => {
    setEmailRequire("");
    if (!isValidEmail(event.target.value)) {
      setEmail(event.target.value);
      setEmailError("Enter valid email addres");
    } else {
      setEmail(event.target.value);
      setEmailError("");
    }
  };

  const handelePasswordChange = (event) => {
    setPasswordRequire("");
    let new_pass = event.target.value;
    setNonCriptedPassword(new_pass);
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (!new_pass.match(lowerCase)) {
      setErrorPasswordMessage("Password should contains lowercase letters!");
    } else if (!new_pass.match(upperCase)) {
      setErrorPasswordMessage("Password should contain uppercase letters!");
    } else if (!new_pass.match(numbers)) {
      setErrorPasswordMessage("Password should contains numbers also!");
    } else if (new_pass.length < 10) {
      setErrorPasswordMessage("Password length should be more than 10.");
    } else {
      setErrorPasswordMessage("Password is strong!");
      setPasswordStrength(true);
    }
  };

  const handeleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  useEffect(() => {
    if (nonCriptedPassword !== repeatPassword) {
      setRepeatPasswordError("Password doesn't match!");
    } else {
      setRepeatPasswordError("");
      setPasswordRepeatCheck(true);
    }
  }, [nonCriptedPassword, repeatPassword]);

  const handeleFirstNameChange = (event) => {
    setFirstNameRequire("");
    setFirstName(event.target.value);
  };

  const handeleLastNameChange = (event) => {
    setLastNameRequire("");
    setLastName(event.target.value);
  };

  const handeleLastPhoneChange = (event) => {
    setPhoneNumberRequire("");
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(nonCriptedPassword, saltRounds);

    if (email === "") {
      setEmailRequire("*This field is required");
      return false;
    }
    if (hashPassword === "") {
      setPasswordRequire("*This field is required");
      return false;
    }
    if (firstName === "") {
      setFirstNameRequire("*This field is required");
      return false;
    }
    if (repeatPasswordError !== "") {
      return false;
    }

    if (lastName === "") {
      setLastNameRequire("*This field is required");
      return false;
    }

    if (phoneNumber === "") {
      setPhoneNumberRequire("*This field is required");
      return false;
    }

    try {
      const response = await axios.post("http://localhost:8000/user", {
        email: email,
        lastName: lastName,
        password: hashPassword,
        firstName: firstName,
        token: token,
        phoneNumber: phoneNumber,
      });
      const emailResponse = await axios.post(`http://localhost:8000/emails`, {
        to: email,
        subject: "Movie APP subscription",
        text: "Thanks for your subscription. Obozavam vas",
      });
      console.log("emailResponse", emailResponse);
      alert(`${response.data.message}`);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="registerUser">
      <div className="registerUserWrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="adminEmail"
            className={
              emailError || emailRequire
                ? "require formInput logIn black"
                : "formInput logIn black "
            }
            value={email}
            placeholder="*Email"
            onChange={handeleEmailChange}
          />
          <p className="authMessage">
            {emailRequire + "-"}
            {emailError}
          </p>
          <input
            type="password"
            name="adminPassword"
            className="formInput logIn black"
            value={nonCriptedPassword}
            placeholder="*Password"
            onChange={handelePasswordChange}
          />
          <p className="authMessage">
            {errorPasswordMessage}
            {passwordRequire}
          </p>
          <input
            type="password"
            name="repeatAdminPassword"
            className="formInput logIn black"
            value={repeatPassword}
            placeholder="RepeatPassword"
            onChange={handeleRepeatPasswordChange}
          />
          <p className="authMessage">{repeatPasswordError}</p>
          <input
            type="text"
            name="userFirstName"
            className={
              firstNameRequire !== ""
                ? "require formInput logIn black"
                : "formInput logIn black "
            }
            value={firstName}
            placeholder="Firstname"
            onChange={handeleFirstNameChange}
          />
          <p className="authMessage">{firstNameRequire}</p>
          <input
            type="text"
            name="userLastName"
            className={
              lastNameRequire !== ""
                ? "require formInput logIn black"
                : "formInput logIn black "
            }
            value={lastName}
            placeholder="Last name"
            onChange={handeleLastNameChange}
          />
          <p className="authMessage">{lastNameRequire}</p>
          <input
            type="number"
            name="userPhoneNumber"
            className={
              phoneNumberRequire !== ""
                ? "require formInput logIn black"
                : "formInput logIn black "
            }
            value={phoneNumber}
            placeholder="Phone number"
            onChange={handeleLastPhoneChange}
          />
          <p className="authMessage">{phoneNumberRequire}</p>
          <button id="submitButton" className={"red btn logIn "} type="submit">
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterUser;
