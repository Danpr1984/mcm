import { createContext, useEffect, useState } from "react";
import { setClientToken } from "../components/spotify";
import { baseURLClient } from "../App";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext({
  user: "",
  setUser: () => {},
  loadingUser: true,
  setLoadingUser: () => {},
  spotifyToken: "",
  setSpotifyToken: () => {},
  csrf: "",
  setCsrf: () => {},
  getCSRF: async () => {},
  whoami: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [spotifyToken, setSpotifyToken] = useState();
  const [csrf, setCsrf] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setSpotifyToken(_token);
      setClientToken(_token);
    } else {
      setSpotifyToken(token);
      setClientToken(token);
    }
    whoami();
  }, [spotifyToken]);

  async function getCSRF() {
    try {
      const response = await fetch(`${BASE_URL}/api/csrf`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const csrfToken = response.headers.get("X-CSRFToken");
      setCsrf(csrfToken);
      return csrfToken;
    } catch (err) {
      console.error(err);
    }
  }

  const whoami = async () => {
    try {
      const { data } = await baseURLClient.get("/api/user");
      setUser(data.user);
      setLoadingUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    setUser,
    setSpotifyToken,
    spotifyToken,
    csrf,
    getCSRF,
    loadingUser,
    setLoadingUser,
    whoami,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
