import { createContext, useEffect, useState } from "react";
import { setClientToken } from "../components/spotify";
import { baseURLClient, setAuthToken } from "../App";
import useLocationStorage from "../../hooks/useLocalStorage";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: "",
  setUser: () => {},
  loadingUser: true,
  setLoadingUser: () => {},
  spotifyToken: "",
  setSpotifyToken: () => {},
  whoami: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useLocationStorage("access_token");
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [spotifyToken, setSpotifyToken] = useState();

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

  const whoami = async () => {
    try {
      const user = {
        username: "admin",
        password: "lol",
      };
      const { data } = await baseURLClient.post("/auth/login", user);

      if (data.token) {
        setAccessToken(data.access);
        setAuthToken(data.access);
        setIsAuthenticated(true);
      }
      setLoadingUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    accessToken,
    user,
    setUser,
    setSpotifyToken,
    spotifyToken,
    loadingUser,
    setLoadingUser,
    whoami,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
