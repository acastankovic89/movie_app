import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AddAdminUser.css";
import bcrypt from "bcryptjs";

const AddAdminUser = () => {
  const [email, setEmail] = useState("");
  const [nonHashPassword, setNonHashPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState("");
  const [bedAutentification, setBedAutentification] = useState(false);
  const [displayAuthMessage, setDisplayAuthMessage] = useState({
    display: "none",
  });
  const password = bcrypt.hashSync(
    nonHashPassword,
    "$2a$10$CwTycUXWue0Thq9StjUM0u"
  );

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/admin-user", {
        email,
        password,
        firstName,
        lastName,
        token,
      });
    } catch (error) {
      setBedAutentification(true);
      setDisplayAuthMessage({ display: "block" });
    }
  };

  const handeleEmailChange = (event) => {
    setEmail(event?.target.value);
  };

  const handelePasswordChange = (event) => {
    setNonHashPassword(event?.target.value);
  };

  const handeleFirstNameChange = (event) => {
    setFirstName(event?.target.value);
  };

  const handeleLastNameChange = (event) => {
    setLastName(event?.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="adminEmail"
        className={
          bedAutentification
            ? "require formInput logIn black"
            : "formInput logIn black "
        }
        value={email}
        placeholder="Email"
        onChange={handeleEmailChange}
      />
      <p className="authMessage" style={displayAuthMessage}>
        Please enter a valid email or phone number.
      </p>
      <input
        type="password"
        name="adminPassword"
        className="formInput logIn black"
        value={nonHashPassword}
        placeholder="Password"
        onChange={handelePasswordChange}
      />
      <p className="authMessage" style={displayAuthMessage}>
        Your password must contain between 4 and 60 characters.
      </p>
      <input
        type="text"
        name="adminFirstName"
        className={
          bedAutentification
            ? "require formInput logIn black"
            : "formInput logIn black "
        }
        value={firstName}
        placeholder="Firstname"
        onChange={handeleFirstNameChange}
      />
      <p className="authMessage" style={displayAuthMessage}>
        Please enter a valid email or phone number.
      </p>
      <input
        type="text"
        name="adminLastName"
        className={
          bedAutentification
            ? "require formInput logIn black"
            : "formInput logIn black "
        }
        value={lastName}
        placeholder="Last name"
        onChange={handeleLastNameChange}
      />
      <p className="authMessage" style={displayAuthMessage}>
        Please enter a valid email or phone number.
      </p>
      <button className="red btn logIn" type="submit">
        Register Admin
      </button>
    </form>
  );
};

export default AddAdminUser;
