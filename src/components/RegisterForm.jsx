import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext.jsx";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const user = {
      email: email,
      username: username,
      password: password,
    };
    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    setUser(data);
    if (data) {
      navigate("login/");
    }
  }

  const goToLogin = () => {
    navigate("login/");
  };

  return (
    <form onSubmit={registerUser}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
      <button type="button" onClick={goToLogin}>
        Login
      </button>
    </form>
  );
};

export default RegisterForm;
