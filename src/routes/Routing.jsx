import React, { useState, useEffect, createContext } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import ColorWheel from "../components/ColorWheel.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import { setClientToken } from "../components/spotify.js";
import Login from "../auth/login.js";

export const AccessTokenContext = createContext(null);

const Routing = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
      console.log("Connected to Spotify with token:", token);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <AccessTokenContext.Provider value={token}>
      <Router>
        <Routes>
          {!token && <Route path="/" element={<Login />} />}
          {/* <Route path="/" element={<RegisterForm />} /> */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/login/" element={<ColorWheel />} />
        </Routes>
      </Router>
    </AccessTokenContext.Provider>
  );
};

export default Routing;
