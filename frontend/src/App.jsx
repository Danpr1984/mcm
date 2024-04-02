import { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";
import SpotifyLogin from "./auth/SpotifyLogin";
import AudioContextProvider from "./context/AudioContext";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import axios from "axios";

axios.defaults.withCredentials = true;

export const baseURLClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(token) {
  baseURLClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function App() {
  const { spotifyToken } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {spotifyToken ? (
        <AudioContextProvider>
          <header>
            <Navbar />
          </header>
          <main>
            <Routing />
          </main>
        </AudioContextProvider>
      ) : (
        <SpotifyLogin />
      )}
    </BrowserRouter>
  );
}

export default App;
